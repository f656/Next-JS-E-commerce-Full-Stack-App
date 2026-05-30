import { connectDb } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import ProductVariantsModel from "@/models/ProductVariants.model";

export async function POST(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized access");
    }

    await connectDb();
    const payload = await request.json();

    const schema = zSchema.pick({
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

    const variantData = validate.data;
    const newProductVariant = new ProductVariantsModel({
      product: variantData.product,
      sku: variantData.sku,
      color: variantData.color,
      size: variantData.size,
      mrp: variantData.mrp,
      sellingPrice: variantData.sellingPrice,
      discountPercentage: variantData.discountPercentage,
      media: variantData.media,
    });
    await newProductVariant.save();
    return response(true, 201, "Product variant added successfully.");
  } catch (error) {
    return catchError(error);
  }
}
