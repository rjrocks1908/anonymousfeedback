import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { verifySchema } from "@/schemas/verifySchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    // validate with Zod
    const verifyQuery = await verifySchema.safeParseAsync({
      code,
    });

    if (!verifyQuery.success) {
      const errors = verifyQuery.error.errors.map((error) => error.message);
      return NextResponse.json(
        {
          success: false,
          message:
            errors.length > 0 ? errors.join(", ") : "Invalid verification code",
        },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (!isCodeValid) {
      return NextResponse.json(
        { success: false, message: "Invalid verification code" },
        { status: 400 }
      );
    }

    if (!isCodeNotExpired) {
      return NextResponse.json(
        { success: false, message: "Verification code has expired" },
        { status: 400 }
      );
    }

    user.isVerified = true;
    await user.save();

    return NextResponse.json(
      { success: true, message: "User verified" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying user", error);
    return NextResponse.json(
      { success: false, message: "Error checking username" },
      { status: 500 }
    );
  }
}
