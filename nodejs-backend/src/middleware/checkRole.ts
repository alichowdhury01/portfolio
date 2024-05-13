import { Request, Response, NextFunction } from "express";
import { findUser } from "../service/user.service";
import { Role } from "../enum/enum.enum";
import UserModel from "../models/user.model";

/**
 * Middleware function to check if a user is authenticated.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns 403 Forbidden error if user is not authenticated, otherwise calls next middleware
 */
export const checkRole = (requiredRole: Role) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user._id;
    const user = await findUser({ _id: userId });

    if (!user) {
      return res.status(404).send('User not found or you do not have permission to perform this action');
    }

    if (user.role !== requiredRole) {
      return res.status(403).send('User not found or you do not have permission to perform this action');
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};