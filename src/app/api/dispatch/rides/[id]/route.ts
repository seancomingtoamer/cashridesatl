import { NextRequest, NextResponse } from "next/server";
import { updateRecord } from "@/lib/airtable";

const TABLE = "CashRides_Rides";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const fields = await request.json();

    // Add timestamps on status changes
    if (fields.Status === "Dispatched" && !fields.Dispatched_At) {
      fields.Dispatched_At = new Date().toISOString();
    }
    if (fields.Status === "Completed" && !fields.Completed_At) {
      fields.Completed_At = new Date().toISOString();
    }

    const record = await updateRecord(TABLE, id, fields);
    return NextResponse.json({ record });
  } catch (err) {
    console.error("PATCH /api/dispatch/rides/[id] error:", err);
    return NextResponse.json({ error: "Failed to update ride" }, { status: 500 });
  }
}
