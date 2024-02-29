import { useAccounts } from "@/app/api/actions/useAccounts";
import { Account, Reading } from "@/db/types";
import { NextResponse } from "next/server";

function calculateNewReadingId(readings:Reading[]) {
  if (readings.length === 0) {
    return 1;
  }
  const highestExistingId = Math.max(...readings.map(reading => reading.id));
  return highestExistingId + 1;
}
export async function GET(
  request: Request,
  { params }: { params: any }
  ) {
    const { accountId } = params;
  const allReadings:Reading[] = [];
  const selectedAccount = useAccounts.getById(parseInt(accountId));
  selectedAccount?.meters.map((meter) => {
    allReadings.push(...meter.readings);
  });
  return NextResponse.json({data:allReadings}, {status: 200});
}
export async function POST(
  request: Request, 
  { params }: { params: any }
) {
  const {accountId} = params
  const selectedAccount = useAccounts.getById(parseInt(accountId));
  if (!selectedAccount) {
    return NextResponse.json({ message: "unable to find selected account" }, { status: 400 });
  }
  const body:Reading[] = await request.json();
  body.map((newReading) => {
    const meter = selectedAccount?.meters.find(meter => meter.id === newReading.meterPointId);
    if (!meter) {
      return NextResponse.json({ message: "unable to find meter data" }, { status: 400 });

    }
    newReading.id = calculateNewReadingId(meter.readings);;
    meter.readings.unshift(newReading);
  });
  
  useAccounts.save(selectedAccount.accountId,selectedAccount);
  return NextResponse.json({ data: selectedAccount }, { status: 200 });
}