import { z } from "zod/v4"

export const SignupSchema = z
    .object({
        fullName: z.string().min(1, { message: "Full name is required." }),
        email: z.email({
            message: "Invalid email format.",
        }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long." })
            .regex(/[A-Za-z]/, {
                message: "Password must contain at least one letter.",
            })
            .regex(/[0-9]/, {
                message: "Password must contain at least one number.",
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    })
