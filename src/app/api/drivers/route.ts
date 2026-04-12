import { NextRequest, NextResponse } from "next/server";
import {
  listPublishedDrivers,
  createDriverProfile,
  type DriverFields,
} from "@/lib/airtable";

export const revalidate = 60;

const NOTIFY_WEBHOOK =
  process.env.CASHRIDES_DRIVER_WEBHOOK ||
  "https://seanpro.app.n8n.cloud/webhook/cashrides-driver";

export async function GET() {
  try {
    const records = await listPublishedDrivers();
    const publicRecords = records.map((r) => ({
      id: r.id,
      name: r.fields.Name ?? "",
      bio: r.fields.Personal_Statement ?? "",
      photo: r.fields.Photo?.[0]?.url ?? null,
      vehicleType: r.fields.Vehicle ?? "",
      serviceZones: r.fields.Service_Zones ?? [],
      yearsExperience: r.fields.Years_Experience ?? "",
      spotlight: r.fields.Spotlight ?? false,
    }));
    return NextResponse.json({ drivers: publicRecords });
  } catch (err) {
    console.error("[GET /api/drivers]", err);
    return NextResponse.json({ drivers: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      vehicleType,
      serviceZones,
      personalStatement,
      licenseUrl,
      registrationUrl,
      insuranceUrl,
      drivingRecordUrl,
      photoUrl,
    } = body as {
      name?: string;
      email?: string;
      phone?: string;
      vehicleType?: string;
      serviceZones?: string[];
      personalStatement?: string;
      licenseUrl?: string;
      registrationUrl?: string;
      insuranceUrl?: string;
      drivingRecordUrl?: string;
      photoUrl?: string;
    };

    if (!name || !email || !phone || !personalStatement) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, phone, personalStatement" },
        { status: 400 }
      );
    }

    const fields: DriverFields = {
      Name: name,
      Email: email,
      Phone: phone,
      Vehicle: vehicleType,
      Service_Zones: serviceZones ?? [],
      Personal_Statement: personalStatement,
      License_Photo: licenseUrl,
      Registration_Photo: registrationUrl,
      Insurance_Photo: insuranceUrl,
      Driving_Record_Photo: drivingRecordUrl,
      Status: "Waitlist",
      Published: false,
      Admin_Notes: "Verification docs submitted via website. Source: Driver Verification Portal.",
    };

    if (photoUrl && /^https?:\/\//.test(photoUrl)) {
      fields.Photo = [{ url: photoUrl }];
    }

    const record = await createDriverProfile(fields);

    // Notify Sean via Telegram through n8n — AWAIT the fetch (Vercel kills fire-and-forget)
    try {
      const notifyRes = await fetch(NOTIFY_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "driver-verification",
          airtable_id: record.id,
          name,
          email,
          phone,
          vehicle_type: vehicleType ?? "",
          service_zones: (serviceZones ?? []).join(", "),
          personal_statement: personalStatement,
          license_url: licenseUrl ?? "",
          registration_url: registrationUrl ?? "",
          insurance_url: insuranceUrl ?? "",
          driving_record_url: drivingRecordUrl ?? "",
          photo_url: photoUrl ?? "",
          status: "submitted",
          review_url: `https://airtable.com/appfs1MJL9BzZrpOx/${record.id}`,
        }),
      });
      if (!notifyRes.ok) {
        console.error("[notify] webhook non-OK:", notifyRes.status, await notifyRes.text());
      }
    } catch (e) {
      console.error("[notify] webhook failed:", e);
    }

    return NextResponse.json({ id: record.id, ok: true });
  } catch (err) {
    console.error("[POST /api/drivers]", err);
    return NextResponse.json(
      { error: "Failed to submit driver verification" },
      { status: 500 }
    );
  }
}
