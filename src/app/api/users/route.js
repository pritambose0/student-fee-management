import connectDB from "../../../lib/connectDB";
import UserModel from "../../../models/User";

export async function GET(req) {
  await connectDB();
  try {
    const users = await UserModel.find({});
    return Response.json(
      {
        success: true,
        data: users,
        message: "Users fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json(
      {
        success: false,
        message: "Error fetching users",
      },
      { status: 500 }
    );
  }
}
