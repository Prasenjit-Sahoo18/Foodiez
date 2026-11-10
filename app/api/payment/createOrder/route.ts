import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  try {
    const { amount, currency } = await req.json();
    if (typeof amount !== "number" || typeof currency !== "string") {
      return NextResponse.json(
        { error: "Invalid request body. 'amount' must be a number and 'currency' must be a string." },
        { status: 400 }
      );
    }

    // Check if Razorpay credentials are configured
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      // Mock order for demo / development without Razorpay keys
      const mockOrder = {
        id: `order_demo_${Date.now()}`,
        amount: amount * 100,
        currency: currency || "INR",
        status: "created",
        mock: true,
      };
      return NextResponse.json(mockOrder);
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const options = {
      amount: Math.round(amount * 100),
      currency: currency,
      receipt: `order_rcptid_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create order", details: error },
      { status: 500 }
    );
  }
}
