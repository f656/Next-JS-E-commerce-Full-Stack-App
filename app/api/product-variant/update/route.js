import { connectDb } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import ProductVariantsModel from "@/models/ProductVariants.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized access");
    }

    await connectDb();
    const payload = await request.json();

    const schema = zSchema.pick({
      _id:true,
      product: true,
      sku: true,
      color: true,
      size: true,
      mrp: true,
      sellingPrice: true,
      discountPercentage: true,
      media:true,
    });

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
    const getProductVariant = await ProductVariantsModel.findOne({
      deletedAt: null,
      _id: validateData._id,
    });
    if (!getProductVariant) {
      return response(false, 404, "Data not found.");
    }
    getProductVariant.product = validateData.product;
    getProductVariant.sku = validateData.sku;
    getProductVariant.color = validateData.color;
    getProductVariant.size = validateData.size;
    getProductVariant.mrp = validateData.mrp;
    getProductVariant.sellingPrice = validateData.sellingPrice;
    getProductVariant.discountPercentage = validateData.discountPercentage;
    getProductVariant.media = validateData.media;
    await getProductVariant.save();

    return response(true, 200, "Product Variant updated successfully.");
  } catch (error) {
    return catchError(error);
  }
}
