import { Request, Response } from "express";
import { omit } from "lodash";
import logger from "../utils/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";

/**
 * Handler function to create a new user.
 * 
 * @param req Express Request object containing user data in the body
 * @param res Express Response object
 * @returns Returns the newly created user object with the password field omitted
 */
export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
  try {
    // Create a new user using the data from the request body
    const user = await createUser(req.body);
    // Omit the password field from the user object before sending the response
    return res.send(omit(user, "password"));
  } catch (e: any) {
    // Log any errors that occur during user creation
    logger.error(e);
    // Send an error response with the error message
    return res.status(409).send(e.message);
  }
}
