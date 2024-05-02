"use server";

import {
  RegistrationSchema,
  registrationSchema,
} from "@/lib/registrationSchema";

type ActionResponse = {
  message: string;
  user?: RegistrationSchema;
  issues?: string[];
};

export const onRegisterFormActionAction = async (
  prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> => {
  const data = Object.fromEntries(formData);
  const parsed = await registrationSchema.safeParseAsync(data); // para el zipcode usamos refine y validateZipCode actions

  //const parsed = registrationSchema.safeParse(data);

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
