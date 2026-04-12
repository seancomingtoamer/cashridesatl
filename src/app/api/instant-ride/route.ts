import { NextRequest, NextResponse } from "next/server";
import { createRecord } from "@/lib/airtable";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, pickup, dropoff, when, scheduledDate, scheduledTime, passengers, notes } = body;

    if (!name || !phone || !pickup || !dropoff) {
      return NextResponse.json(
        { error: "Name, phone, pickup, and dropoff are required" },
        { status: 400 }
      );
    }

    const rideRequest = {
      name,
      phone,
      pickup,
      dropoff,
      when,
      scheduledDate: when === "scheduled" ? scheduledDate : null,
      scheduledTime: when === "scheduled" ? scheduledTime : null,
      passengers,
      notes,
      source: "instant-ride",
      status: "pending",
      timestamp: new Date().toISOString(),
    };

    // Write to CashRides_Rides Airtable table for dispatch dashboard
    const scheduledDateTime = when === "scheduled" && scheduledDate && scheduledTime
      ? `${scheduledDate}T${scheduledTime}`
      : "";

    try {
      await createRecord("CashRides_Rides", {
        Rider_Name: name,
        Rider_Phone: phone,
        Pickup: pickup,
        Dropoff: dropoff,
        When: when === "scheduled" ? "Scheduled" : "ASAP",
        Scheduled_DateTime: scheduledDateTime,
        Passengers: Number(passengers) || 1,
        Notes: notes || "",
        Status: "New",
        Source: "Website",
        Platform_Fee: 10,
        CashRides_Cut: 5,
        WoD_Cut: 5,
        Created_At: new Date().toISOString(),
      });
    } catch (airtableErr) {
      console.error("Airtable write error (non-blocking):", airtableErr);
    }

    // Forward to n8n webhook for dispatch
    const webhookUrl = process.env.INSTANT_RIDE_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rideRequest),
      });
    }

    return NextResponse.json({ success: true, ride: rideRequest });
  } catch {
    return NextResponse.json(
      { error: "Failed to process ride request" },
      { status: 500 }
    );
  }
}
