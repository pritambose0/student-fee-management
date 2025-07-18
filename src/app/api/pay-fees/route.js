import connectDB from "../../../lib/connectDB";
import UserModel from "../../../models/User";

export async function POST(req) {
  await connectDB();
  try {
    const { id } = await req.json();

    const existingUser = await UserModel.findOne({ _id: id });
    if (!existingUser) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const user = await UserModel.findOneAndUpdate(
      { _id: id },
      { feesPaid: true },
      { new: true }
    );

    return Response.json(
      {
        success: true,
        feesPaid: true,
        data: user,
        message: "Payment successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Payment simulation failed:", error);
    return Response.json(
      { message: "Error updating payment" },
      { status: 500 }
    );
  }
}
