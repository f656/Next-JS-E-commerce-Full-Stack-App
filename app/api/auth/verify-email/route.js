import { connectDb } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import UserModel from "@/models/User.model";
import { jwtVerify } from "jose";
import { isValidObjectId } from "mongoose";

export async function GET(request) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return response(false, 400, "Token is not found");
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const decoded = await jwtVerify(token, secret);
    const userId = decoded.payload.userId;

    if (!isValidObjectId(userId)) {
      return response(false, 404, "Invalid user id");
    }
  
    //get user...
    const user = await UserModel.findById(userId);
    if (!user) {
      return response(false, 404, "User not found");
    }

    user.isEmailVerified = true;
    await user.save();

    return response(true, 200, "Email verification successfully.");
  } catch (error) {
    return catchError(error);
  }
}
