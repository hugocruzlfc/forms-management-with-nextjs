import { z } from "zod";
import { validateZipCode } from "@/actions/validate-zip-code-actions";

export const registrationSchema = z.object({
  first: z.string().trim().min(2, { message: "First name is required" }),
  last: z.string().trim().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  zipCode: z.string().refine(validateZipCode, {
    message: "Invalid zipcode",
  }),
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
