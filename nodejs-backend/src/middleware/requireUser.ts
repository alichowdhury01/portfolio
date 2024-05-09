import { Request, Response, NextFunction } from 'express';

/**
 * Middleware function to check if a user is authenticated.
 * @param req - Express Request object
 * @param res - Express Response object
 * @param next - Express NextFunction
 * @returns 403 Forbidden error if user is not authenticated, otherwise calls next middleware
 */
const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(403).send({ error: 'User is not authenticated' });
  }

  return next();
};

export default requireUser;
