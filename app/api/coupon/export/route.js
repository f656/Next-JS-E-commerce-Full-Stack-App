import { connectDb } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import CouponModel from "@/models/Coupon.model";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized");
    }
    await connectDb();

    const filter = {
      deletedAt: null,
    };

    const getCoupons = await CouponModel.find(filter).sort({ createdAt: -1 }).lean();
    if (!getCoupons) {
      return response(false, 404, "Collection Empty.");
    }

    return response(true, 200, "Data found.", getCoupons);
  } catch (error) {
    return catchError(error);
  }
}
