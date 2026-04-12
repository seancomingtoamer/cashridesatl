// Supabase client for CashRides ATL — server-side uploads.
// Uses the secret key (bypasses RLS) so do NOT import this from client code.
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY!;

// Private bucket for sensitive driver docs (license, registration, insurance, driving record)
const DOCS_BUCKET = process.env.SUPABASE_CASHRIDES_BUCKET || "cashrides-drivers";

// Public bucket for profile photos (reuse RAH bucket with cashrides/ prefix)
const PHOTOS_BUCKET = process.env.SUPABASE_PHOTOS_BUCKET || "rah-profiles";

// 1 year in seconds — signed URLs for Airtable review links
const SIGNED_URL_EXPIRY = 60 * 60 * 24 * 365;

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false },
});

/**
 * Upload a sensitive driver document to the PRIVATE bucket.
 * Returns a signed URL (1-year expiry) so Sean can review from Airtable.
 */
export async function uploadDriverDoc(
  file: File | Blob,
  filename: string,
  folder: string
): Promise<string> {
  const ext = filename.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `${folder}/${safeName}`;

  const { error } = await supabaseAdmin.storage
    .from(DOCS_BUCKET)
    .upload(path, file, {
      contentType: (file as File).type || undefined,
      upsert: false,
    });

  if (error) throw new Error(`Supabase upload failed: ${error.message}`);

  const { data, error: signError } = await supabaseAdmin.storage
    .from(DOCS_BUCKET)
    .createSignedUrl(path, SIGNED_URL_EXPIRY);

  if (signError || !data?.signedUrl) {
    throw new Error(`Signed URL failed: ${signError?.message || "unknown"}`);
  }

  return data.signedUrl;
}

/**
 * Upload a driver profile photo to the PUBLIC bucket.
 * Returns a permanent public URL for the Meet the Drivers page.
 */
export async function uploadProfilePhoto(
  file: File | Blob,
  filename: string
): Promise<string> {
  const ext = filename.split(".").pop()?.toLowerCase() || "jpg";
  const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const path = `cashrides/${safeName}`;

  const { error } = await supabaseAdmin.storage
    .from(PHOTOS_BUCKET)
    .upload(path, file, {
      contentType: (file as File).type || undefined,
      upsert: false,
    });

  if (error) throw new Error(`Supabase upload failed: ${error.message}`);

  const { data } = supabaseAdmin.storage.from(PHOTOS_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
