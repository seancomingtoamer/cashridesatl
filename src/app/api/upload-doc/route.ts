import { NextRequest, NextResponse } from "next/server";
import { uploadDriverDoc, uploadProfilePhoto } from "@/lib/blob";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
]);

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const folder = (form.get("folder") as string) || "docs";
    const type = (form.get("type") as string) || "doc";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 10 MB)" }, { status: 413 });
    }
    if (file.type && !ALLOWED.has(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 415 });
    }

    let url: string;
    if (type === "photo") {
      // Profile photos → public bucket (permanent public URL)
      url = await uploadProfilePhoto(file, file.name || "photo.jpg");
    } else {
      // Sensitive docs → private bucket (signed URL, 1-year expiry)
      url = await uploadDriverDoc(file, file.name || "doc.jpg", folder);
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[POST /api/upload-doc]", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
