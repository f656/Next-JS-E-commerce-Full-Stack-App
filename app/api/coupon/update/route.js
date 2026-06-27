import { connectDb } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import CouponModel from "@/models/Coupon.model";


export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized access");
    }

    await connectDb();
    const payload = await request.json();

    
    const validate = schema.safeParse(payload);
    if (!validate.success) {
      return response(
        false,
        404,
        "Inavalid or missing fields.",
        validate.error,
      );
    }

    const validateData = validate.data;
    const getCoupon = await CouponModel.findOne({
      deletedAt: null,
      _id: validateData._id,
    });
    if (!getCoupon) {
      return response(false, 404, "Data not found.");
    }
    getCoupon.code = validateData.code;
    getCoupon.discountPercentage = validateData.discountPercentage;
    getCoupon.minShoppingAmount = validateData.minShoppingAmount;
    getCoupon.validity = validateData.validity;

    await getCoupon.save();

    return response(true, 200, "Coupon updated successfully.");
  } catch (error) {
    return catchError(error);
  }
}
