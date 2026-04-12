import { NextResponse } from "next/server";
import { listRecords } from "@/lib/airtable";

const TABLE = "CashRides_Drivers";

export async function GET() {
  try {
    const records = await listRecords(TABLE, {
      sort: [{ field: "Name", direction: "asc" }],
      maxRecords: 100,
    });
    return NextResponse.json({ records });
  } catch (err) {
    console.error("GET /api/dispatch/drivers error:", err);
    return NextResponse.json({ error: "Failed to fetch drivers" }, { status: 500 });
  }
}
