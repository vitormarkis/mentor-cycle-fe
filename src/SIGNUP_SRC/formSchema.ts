import { statesObject } from "SIGNUP_SRC/constants";
import { userSchema } from "schemas";
import { z } from "zod";

export const signupFormSchema = z
  .object({
    firstName: userSchema.shape.firstName
      .min(2, "Nome muito curto.")
      .max(20, "Nome muito longo."),
    lastName: userSchema.shape.lastName
      .min(2, "Nome muito curto.")
      .max(20, "Nome muito longo."),
    email: userSchema.shape.email,
    password: userSchema.shape.password,
    repeatPassword: userSchema.shape.password,
    state: userSchema.shape.state,
    country: userSchema.shape.country,
    city: userSchema.shape.city,
    birthDate: z.string(),
    skills: userSchema.shape.skills,
    linkedin: userSchema.shape.linkedin,
    github: userSchema.shape.github,
    description: userSchema.shape.description,
    isMentor: userSchema.shape.isMentor,
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.repeatPassword)
      ctx.addIssue({
        code: "invalid_intersection_types",
        path: ["repeatPassword"],
        message: "As senhas não coincidem.",
      });
  })
  .transform((obj) => {
    const foundState = statesObject.find(({ label }) => obj.state === label);
    const newState = foundState?.value ?? obj.state;

    return {
      ...obj,
      state: newState,
    };
  });
