import { connectDb } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import ProductVariantsModel from "@/models/ProductVariants.model";

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

    const getProductVariant = await ProductVariantsModel.find(filter)
      .select("-media ")
      .sort({ createdAt: -1 })
      .lean();
    if (!getProductVariant) {
      return response(false, 404, "Collection Empty.");
    }

    return response(true, 200, "Data found.", getProductVariant);
  } catch (error) {
    return catchError(error);
  }
}
