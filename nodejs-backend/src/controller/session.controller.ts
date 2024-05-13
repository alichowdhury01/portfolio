import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

/**
 * Create a new session for the user and return access and refresh tokens.
 * If the user is not authenticated, return an error message.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns Access and Refresh tokens if authentication is successful, else an error message.
 */
export async function createUserSessionHandler(req: Request, res: Response) {
  try {
    // Validate user credentials
    const user = await validatePassword(req.body);
    // console log user role 
    // If user is not found, return an error
    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // Create a new session for the user
    const session = await createSession(user._id, req.get('user-agent') || '');
    // Generate access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get('accessTokenTtl') } 
    );

    // Generate refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get('refreshTokenTtl') }
    );
    // Return access and refresh tokens
    return res.send({ accessToken, refreshToken, user});
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

/**
 * Get all active sessions for the authenticated user.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns All active sessions for the authenticated user.
 */
export async function getUserSessionsHandler(req: Request, res: Response) {
  try {
    // Get user ID from the authenticated user's session
    const userId = res.locals.user._id;

    // Find all active sessions for the user
    const sessions = await findSessions({ user: userId, valid: true });

    // Return all active sessions
    return res.send(sessions);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

/**
 * Delete the current session for the authenticated user.
 *
 * @param req - Express Request object
 * @param res - Express Response object
 * @returns Null access and refresh tokens after deleting the session.
 */
export async function deleteSessionHandler(req: Request, res: Response) {
  try {
    // Get session ID from the authenticated user's session
    const sessionId = res.locals.user.session;

    // Invalidate the current session
    await updateSession({ _id: sessionId }, { valid: false });

    // Return null access and refresh tokens
    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}
