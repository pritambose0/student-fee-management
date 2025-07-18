import connectDB from "../../../lib/connectDB";
import UserModel from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  try {
    const { name, email, password } = await req.json();
    if (!password || !email || !name) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return Response.json(
      {
        success: true,
        data: user,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
