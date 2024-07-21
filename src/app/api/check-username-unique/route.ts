import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { success: false, message: "Username is required" },
        { status: 400 }
      );
    }

    // validate with Zod
    const usernameQuery = await UsernameQuerySchema.safeParseAsync({
      username,
    });

    if (!usernameQuery.success) {
      const errors = usernameQuery.error.errors.map((error) => error.message);
      return NextResponse.json(
        {
          success: false,
          message: errors.length > 0 ? errors.join(", ") : "Invalid username",
        },
        { status: 400 }
      );
    }

    const existingVerifiedUser = await UserModel.findOne({
      username: usernameQuery.data?.username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return NextResponse.json(
        { success: false, message: "Username is already taken" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Username is available" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json(
      { success: false, message: "Error checking username" },
      { status: 500 }
    );
  }
}
