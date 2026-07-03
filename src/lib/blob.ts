// Vercel Blob storage for CashRides ATL — server-side uploads.
// Uses BLOB_READ_WRITE_TOKEN (auto-provisioned) so do NOT import this from client code.
import { put } from "@vercel/blob";

/**
 * Upload a sensitive driver document (license, registration, insurance, driving record).
 * Stored under cashrides-docs/ with a random unguessable suffix — the URL is only
 * shared with Airtable for Sean's review, and never expires (unlike the old
 * 1-year Supabase signed URLs).
 */
export async function uploadDriverDoc(
  file: File | Blob,
  filename: string,
  folder: string
): Promise<string> {
  const ext = filename.split(".").pop()?.toLowerCase() || "jpg";
  const blob = await put(`cashrides-docs/${folder}/doc.${ext}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: (file as File).type || undefined,
  });
  return blob.url;
}

/**
 * Upload a driver profile photo for the Meet the Drivers page.
 */
export async function uploadProfilePhoto(
  file: File | Blob,
  filename: string
): Promise<string> {
  const ext = filename.split(".").pop()?.toLowerCase() || "jpg";
  const blob = await put(`cashrides-photos/photo.${ext}`, file, {
    access: "public",
    addRandomSuffix: true,
    contentType: (file as File).type || undefined,
  });
  return blob.url;
}
