import { connectDb } from "@/lib/databaseConnection";
import { catchError, isAuthenticated, response } from "@/lib/helperFunction";
import { zSchema } from "@/lib/zodSchema";
import ProductModel from "@/models/Product.model";

export async function PUT(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized access");
    }

    await connectDb();
    const payload = await request.json();

    const schema = zSchema.pick({
      name: true,
      slug: true,
      category: true,
      mrp: true,
      sellingPrice: true,
      discountPercentage: true,
      description: true,
      media: true,
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
    const getProduct = await ProductModel.findOne({  deletedAt: null, _id: validateData._id });
    if (!getProduct) {
      return response(false, 404, "Data not found.");
    }
    getProduct.name = validateData.name;
    getProduct.slug = validateData.slug;
    getProduct.category = validateData.category;
    getProduct.mrp = validateData.mrp;
    getProduct.sellingPrice = validateData.sellingPrice;
    getProduct.discountPercentage = validateData.discountPercentage;
    getProduct.description = encode(validateData.description);
    getProduct.media = validateData.media;
    await getProduct.save();

    return response(true, 200, "Product updated successfully.");
  } catch (error) {
    return catchError(error);
  }
}
