import { TypeOf, object, string } from 'zod';

/**
 * createUserSchema - Defines a validation schema for creating a user.
 *
 * This schema ensures that the input data for creating a user is valid. It expects an object with the following properties:
 * - name: A required string representing the user's name.
 * - password: A required string representing the user's password. It must be at least 6 characters long.
 * - passwordConfirmation: A required string representing the confirmation of the user's password.
 * - email: A required string representing the user's email. It must be a valid email address.
 * - role: A required string representing the user's role.
 *
 * Additionally, it includes a refinement to ensure that the password and passwordConfirmation fields match.
 *
 * @returns {ZodObject} createUserSchema - A Zod object schema representing the validation rules for creating a user.
 */

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
    passwordConfirmation: string({
      required_error: 'passwordConfirmation is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    role: string({
      required_error: 'Role is required',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

/**
 * CreateUserInput - Defines the type of input expected when creating a user.
 *
 * This type excludes the `passwordConfirmation` field from the `createUserSchema`.
 *
 * @typedef {Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">} CreateUserInput
 */
export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  'body.passwordConfirmation'
>;
