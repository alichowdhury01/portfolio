import { object, string } from "zod";

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Eail is required",
        }),
        password: string({
            required_error: "Password is required",
        })
    })
});