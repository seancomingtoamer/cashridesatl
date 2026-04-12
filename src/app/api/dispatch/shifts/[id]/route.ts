import { NextRequest, NextResponse } from "next/server";
import { updateRecord } from "@/lib/airtable";

const TABLE = "CashRides_Shifts";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fields = await request.json();
    const record = await updateRecord(TABLE, id, fields);
    return NextResponse.json({ record });
  } catch (err) {
    console.error("PATCH /api/dispatch/shifts/[id] error:", err);
    return NextResponse.json({ error: "Failed to update shift" }, { status: 500 });
  }
}
