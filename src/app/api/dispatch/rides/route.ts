import { NextRequest, NextResponse } from "next/server";
import { listRecords, createRecord } from "@/lib/airtable";

const TABLE = "CashRides_Rides";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let filterByFormula: string | undefined;
    if (status && status !== "All") {
      filterByFormula = `{Status} = "${status}"`;
    }

    const records = await listRecords(TABLE, {
      filterByFormula,
      sort: [{ field: "Created_At", direction: "desc" }],
      maxRecords: 100,
    });

    return NextResponse.json({ records });
  } catch (err) {
    console.error("GET /api/dispatch/rides error:", err);
    return NextResponse.json({ error: "Failed to fetch rides" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const record = await createRecord(TABLE, {
      Rider_Name: body.name,
      Rider_Phone: body.phone,
      Pickup: body.pickup,
      Dropoff: body.dropoff,
      When: body.when === "scheduled" ? "Scheduled" : "ASAP",
      Scheduled_DateTime: body.scheduledDateTime || "",
      Passengers: Number(body.passengers) || 1,
      Notes: body.notes || "",
      Status: "New",
      Source: body.source || "Website",
      Platform_Fee: 10,
      CashRides_Cut: 5,
      WoD_Cut: 5,
      Created_At: new Date().toISOString(),
    });

    return NextResponse.json({ record });
  } catch (err) {
    console.error("POST /api/dispatch/rides error:", err);
    return NextResponse.json({ error: "Failed to create ride" }, { status: 500 });
  }
}
