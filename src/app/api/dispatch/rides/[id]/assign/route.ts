import { NextRequest, NextResponse } from "next/server";
import { updateRecord } from "@/lib/airtable";

const TABLE = "CashRides_Rides";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { driverName, driverPhone, fleet } = await request.json();

    const record = await updateRecord(TABLE, id, {
      Assigned_Driver: driverName,
      Assigned_Driver_Phone: driverPhone,
      Fleet: fleet || "Wheels on Demand",
      Status: "Dispatched",
      Dispatched_At: new Date().toISOString(),
    });

    return NextResponse.json({ record });
  } catch (err) {
    console.error("POST /api/dispatch/rides/[id]/assign error:", err);
    return NextResponse.json({ error: "Failed to assign ride" }, { status: 500 });
  }
}
