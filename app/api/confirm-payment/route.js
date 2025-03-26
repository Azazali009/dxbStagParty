// This file will be deleted because it was just for testing but not working properly.
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    return NextResponse.json({ success: true, message: "Payment confirmed" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
