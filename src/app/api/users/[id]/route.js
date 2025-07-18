import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../../../lib/connectDB";
import UserModel from "../../../../models/User";

export async function PUT(req, context) {
  await connectDB();

  try {
    const { id } = await context.params;
    const { name, email, password } = await req.json();

    const updateData = { name, email };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const existingUser = await UserModel.findById(id);
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const user = await UserModel.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
        message: "User updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error updating user",
      },
      { status: 500 }
    );
  }
}

export async function GET(req, context) {
  await connectDB();
  try {
    const { id } = await context.params;
    const user = await UserModel.findById(id).select("-password");
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        data: user,
        message: "User fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching user",
      },
      { status: 500 }
    );
  }
}
