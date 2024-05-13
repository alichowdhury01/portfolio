import { FilterQuery } from 'mongoose';
import { omit } from 'lodash';
import UserModel, { UserDocument, UserInput } from '../models/user.model';

/**
 * Creates a new user in the database.
 * @param input - User input data.
 * @returns User data without the password field.
 * @throws Error if user creation fails.
 */
export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}

/**
 * Validates the user's password.
 * @param param0 - Object containing user's email and password.
 * @returns User data without the password field if the password is valid, otherwise false.
 */
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), 'password');
}

/**
 * Finds a user in the database based on the provided query.
 * @param query - Query to find the user.
 * @returns User data if found, otherwise null.
 */
export async function findUser(query: FilterQuery<UserDocument>) {
  // Using lean() to return plain JavaScript objects instead of Mongoose documents for improved performance.
  return UserModel.findOne(query).lean().select('-password');
}
