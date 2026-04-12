const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || "appfs1MJL9BzZrpOx";
const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

function headers() {
  return {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
  };
}

export interface AirtableRecord<T = Record<string, unknown>> {
  id: string;
  fields: T;
  createdTime: string;
}

interface AirtableListResponse<T> {
  records: AirtableRecord<T>[];
  offset?: string;
}

export async function listRecords<T = Record<string, unknown>>(
  table: string,
  options?: {
    filterByFormula?: string;
    sort?: { field: string; direction?: "asc" | "desc" }[];
    maxRecords?: number;
    view?: string;
  }
): Promise<AirtableRecord<T>[]> {
  const params = new URLSearchParams();
  if (options?.filterByFormula) params.set("filterByFormula", options.filterByFormula);
  if (options?.maxRecords) params.set("maxRecords", String(options.maxRecords));
  if (options?.view) params.set("view", options.view);
  if (options?.sort) {
    options.sort.forEach((s, i) => {
      params.set(`sort[${i}][field]`, s.field);
      params.set(`sort[${i}][direction]`, s.direction || "desc");
    });
  }

  const url = `${BASE_URL}/${encodeURIComponent(table)}?${params.toString()}`;
  const res = await fetch(url, { headers: headers(), cache: "no-store" });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable listRecords error: ${res.status} ${err}`);
  }
  const data: AirtableListResponse<T> = await res.json();
  return data.records;
}

export async function createRecord<T = Record<string, unknown>>(
  table: string,
  fields: Partial<T>
): Promise<AirtableRecord<T>> {
  const url = `${BASE_URL}/${encodeURIComponent(table)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable createRecord error: ${res.status} ${err}`);
  }
  return res.json();
}

export async function updateRecord<T = Record<string, unknown>>(
  table: string,
  recordId: string,
  fields: Partial<T>
): Promise<AirtableRecord<T>> {
  const url = `${BASE_URL}/${encodeURIComponent(table)}/${recordId}`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ fields }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable updateRecord error: ${res.status} ${err}`);
  }
  return res.json();
}

// ── CashRides Drivers helpers ──────────────────────────────────

const DRIVERS_TABLE = process.env.AIRTABLE_CASHRIDES_TABLE || "CashRides_Drivers";

export interface DriverFields {
  Name?: string;
  Email?: string;
  Phone?: string;
  Vehicle?: string;
  "Areas Served"?: string;
  "Available Hours"?: string;
  Status?: string;
  Source?: string;
  Notes?: string;
  Bio?: string;
  Photo?: { url: string }[];
  License_Photo?: string;
  Registration_Photo?: string;
  Insurance_Photo?: string;
  Driving_Record_Photo?: string;
  Personal_Statement?: string;
  Service_Zones?: string[];
  Years_Experience?: string;
  Published?: boolean;
  Featured?: boolean;
  Spotlight?: boolean;
  Admin_Notes?: string;
}

export async function listPublishedDrivers() {
  return listRecords<DriverFields>(DRIVERS_TABLE, {
    filterByFormula: `{Published} = TRUE()`,
    sort: [
      { field: "Spotlight", direction: "desc" },
      { field: "Name", direction: "asc" },
    ],
  });
}

export async function listSpotlightDrivers() {
  return listRecords<DriverFields>(DRIVERS_TABLE, {
    filterByFormula: `AND({Published} = TRUE(), {Spotlight} = TRUE())`,
    maxRecords: 3,
  });
}

export async function createDriverProfile(fields: DriverFields) {
  return createRecord<DriverFields>(DRIVERS_TABLE, fields);
}

export async function updateDriverRecord(recordId: string, fields: Partial<DriverFields>) {
  return updateRecord<DriverFields>(DRIVERS_TABLE, recordId, fields);
}

/**
 * Find all driver records whose Email field equals the given address (case-insensitive).
 * Returns an array because we know duplicates exist in the base (e.g., Moussa has 3 rows).
 */
export async function findDriversByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized) return [];
  // LOWER() + exact match — avoids false positives from SEARCH() substring behavior.
  const formula = `LOWER({Email}) = '${normalized.replace(/'/g, "\\'")}'`;
  return listRecords<DriverFields>(DRIVERS_TABLE, { filterByFormula: formula });
}

/**
 * Find a driver whose Admin_Notes contains the given Stripe customer ID.
 * Used to locate the record on cancellation events without calling back to Stripe.
 */
export async function findDriverByStripeCustomerId(customerId: string) {
  if (!customerId) return null;
  const formula = `FIND('${customerId.replace(/'/g, "\\'")}', {Admin_Notes}) > 0`;
  const records = await listRecords<DriverFields>(DRIVERS_TABLE, {
    filterByFormula: formula,
    maxRecords: 1,
  });
  return records[0] ?? null;
}

/**
 * Score a driver record by how much data it has — used to pick the "best" row
 * when deduping multiple rows for the same email. Higher = more complete.
 */
export function scoreDriverCompleteness(r: AirtableRecord<DriverFields>): number {
  const f = r.fields;
  let score = 0;
  if (f.Name) score += 1;
  if (f.Phone) score += 1;
  if (f.Vehicle) score += 1;
  if (f["Areas Served"]) score += 1;
  if (f.Personal_Statement || f.Bio) score += 2;
  if (f.Photo && f.Photo.length > 0) score += 2;
  if (f.License_Photo) score += 3;
  if (f.Registration_Photo) score += 3;
  if (f.Insurance_Photo) score += 3;
  if (f.Driving_Record_Photo) score += 1;
  if (f.Years_Experience) score += 1;
  if (f.Published) score += 5;
  return score;
}

/**
 * From a list of duplicate records, pick the most complete one.
 * Tie-breaks by most recent createdTime.
 */
export function pickBestDriverRecord(
  records: AirtableRecord<DriverFields>[]
): AirtableRecord<DriverFields> | null {
  if (records.length === 0) return null;
  return [...records].sort((a, b) => {
    const diff = scoreDriverCompleteness(b) - scoreDriverCompleteness(a);
    if (diff !== 0) return diff;
    return new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime();
  })[0];
}
