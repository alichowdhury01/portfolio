import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

/**
 * Middleware to deserialize user from JWT token.
 * @param req - Express Request object.
 * @param res - Express Response object.
 * @param next - Express NextFunction.
 * @returns Calls the next middleware in the stack.
 */
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extracts access token from the authorization header
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  // Extracts refresh token from the x-refresh header
  const refreshToken = get(req, 'headers.x-refresh') as string;

  // If no access token is provided, calls the next middleware
  if (!accessToken) {
    return next();
  }

  // Verifies the access token
  const { decoded, expired } = verifyJwt(accessToken);

  // If the access token is valid, sets the user in res.locals and calls the next middleware
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  // If the access token is expired and a refresh token is provided, reissues access token
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    // If a new access token is issued, sets it in the response header and sets the user in res.locals
    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
      const result = verifyJwt(newAccessToken);
      res.locals.user = result.decoded;
      return next();
    }
  }

  // Calls the next middleware
  return next();
};

export default deserializeUser;
