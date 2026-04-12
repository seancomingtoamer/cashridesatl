import { NextResponse } from "next/server";
import { listRecords } from "@/lib/airtable";

export async function GET() {
  try {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];

    const [rides, shifts] = await Promise.all([
      listRecords("CashRides_Rides", { maxRecords: 500 }),
      listRecords("CashRides_Shifts", {
        filterByFormula: `{Status} = "Active"`,
      }),
    ]);

    const activeRides = rides.filter((r) => {
      const s = r.fields.Status as string;
      return s === "New" || s === "Dispatched" || s === "Accepted" || s === "In Progress";
    }).length;

    const driversOnShift = new Set(
      shifts.map((s) => s.fields.Driver_Name as string)
    ).size;

    const todayRides = rides.filter((r) => {
      const created = r.fields.Created_At as string;
      return created && created.startsWith(todayStr);
    }).length;

    const todayRevenue = rides
      .filter((r) => {
        const completed = r.fields.Completed_At as string;
        return completed && completed.startsWith(todayStr);
      })
      .reduce((sum, r) => sum + ((r.fields.Platform_Fee as number) || 0), 0);

    return NextResponse.json({
      activeRides,
      driversOnShift,
      todayRides,
      todayRevenue,
    });
  } catch (err) {
    console.error("GET /api/dispatch/stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
