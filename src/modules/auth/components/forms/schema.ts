import { z } from "zod/v4";

// validation values
const emailValidation = z.email();
const passwordValidation = z
  .string()
  .min(8, { error: "Password must be 8 characters long" })
  .max(50, { error: "Password too long, should not exceed 50 characters" });
const nameValidation = z.string().min(1, { error: "Name is required" });
const confirmPasswordValidation = z
  .string()
  .min(8, { error: "Password must be 8 characters long" })
  .max(50, { error: "Password too long, should not exceed 50 characters" });

// validation schemas
export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    name: nameValidation,
    confirmPassword: confirmPasswordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "password and confirm password do not match",
    path: ["confirmPassword"],
  });

// validation types
export type SignInValues = z.infer<typeof signInSchema>;
export type SingUpValues = z.infer<typeof signUpSchema>;

// default values
export const defaultSignInValues = {
  email: "",
  password: "",
} as SignInValues;

export const defaultSignUpValues = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
} as SingUpValues;
