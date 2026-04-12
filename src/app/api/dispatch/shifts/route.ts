import { NextRequest, NextResponse } from "next/server";
import { listRecords, createRecord } from "@/lib/airtable";

const TABLE = "CashRides_Shifts";

export async function GET() {
  try {
    const records = await listRecords(TABLE, {
      sort: [{ field: "Driver_Name", direction: "asc" }],
      maxRecords: 200,
    });
    return NextResponse.json({ records });
  } catch (err) {
    console.error("GET /api/dispatch/shifts error:", err);
    return NextResponse.json({ error: "Failed to fetch shifts" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const record = await createRecord(TABLE, {
      Driver_Name: body.driverName,
      Driver_Phone: body.driverPhone,
      Fleet: body.fleet || "Wheels on Demand",
      Day: body.day,
      Start_Time: body.startTime,
      End_Time: body.endTime,
      Areas: body.areas,
      Status: "Active",
    });
    return NextResponse.json({ record });
  } catch (err) {
    console.error("POST /api/dispatch/shifts error:", err);
    return NextResponse.json({ error: "Failed to create shift" }, { status: 500 });
  }
}
