import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDb } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/User.model";
import { SignJWT } from "jose";

export async function POST(request) {
  try {
    await connectDb();

    //Validation schema
    const validationSchema = zSchema.pick({
      name: true,
      email: true,
      password: true,
    });

    const payload = await request.json();
    const validatedData = validationSchema.safeParse(payload);

    if (!validatedData.success) {
      return response(
        false,
        401,
        "Invalid or missing input field.",
        validatedData.error
      );
    }
    //check user already registered
    const { name, email, password } = validatedData.data;
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return response(true, 409, "User already exists with this email.");
    }

    //new registration
    const newRegistration = new UserModel({
      name,
      email,
      password,
    });
    await newRegistration.save();

    //Token generation
    // JWT
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY missing in env");
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    const token = await new SignJWT({ userId: newRegistration._id.toString() })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    //email sending
    await sendMail(
      "Email Verification request from Ali Developer Nextjs E-commerce",
      email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`
      )
    );

    return response(
      true,
      200,
      "Registration successful,please verify your email address"
    );
  } catch (error) {
    catchError(error);
  }
}
