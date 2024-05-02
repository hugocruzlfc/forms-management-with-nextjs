"use server";

import {
  RegistrationSchema,
  registrationSchema,
} from "@/lib/registrationSchema";

export const onRegisterAction = async (data: RegistrationSchema) => {
  const parsed = registrationSchema.safeParse(data);

  if (parsed.success) {
    console.log("User registered");
    return { message: "User registered", user: parsed.data };
  } else {
    return {
      message: "Invalid data",
      issues: parsed.error.issues.map((issue) => issue.message),
    };
  }
};
