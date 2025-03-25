import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // const { searchParams } = new URL(req.url);
    // const email = searchParams.get("email");
    // // const amount = searchParams.get("amount");

    // if (!email) {
    //   return NextResponse.json({ success: false, error: "Invalid request" });
    // }

    return NextResponse.json({ success: true, message: "Payment confirmed" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
