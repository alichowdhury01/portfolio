import { object, string } from "zod";

/**
 * Schema for validating the request body when creating a session.
 * 
 * @property {object} body - Object containing the session creation data.
 * @property {string} body.email - User's email.
 * @property {string} body.password - User's password.
 */
export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }),
        password: string({
            required_error: "Password is required",
        })
    })
});
