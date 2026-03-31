import { z } from "zod";

export const zSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(32, { message: "Password must not exceed 32 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter (A-Z)",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter (a-z)",
    })
    .regex(/[0-9]/, {
      message: "Password must contain at least one number (0-9)",
    })
    .regex(/[^A-Za-z0-9]/, {
      message:
        "Password must contain at least one special character (@, #, $, etc.)",
    }),

  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" })
    .regex(/^[A-Za-z ]+$/, {
      message: "Name can only contain letters and spaces",
    }),

  otp: z.string().regex(/^\d{6}$/, { message: "OTP must be exactly 6 digits" }),

  _id: z.string().min(3,'_id is required.'),
  alt: z.string().min(3,'alt is required.'),
  title:z.string().min(3,'title is required.'),
});
