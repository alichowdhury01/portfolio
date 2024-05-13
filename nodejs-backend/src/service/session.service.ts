import { get } from 'lodash';
import config from 'config';
import { FilterQuery, UpdateQuery } from 'mongoose';
import SessionModel, { SessionDocument } from '../models/session.model';
import { verifyJwt, signJwt } from '../utils/jwt.utils';
import { findUser } from './user.service';

/**
 * Creates a new session for a user.
 * @param userId The ID of the user for whom the session is created.
 * @param userAgent The user agent string of the client.
 * @returns The created session object.
 */
export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({ user: userId, userAgent});

  return session.toJSON();
}
 
/**
 * Finds sessions based on a query.
 * @param query The query used to find sessions.
 * @returns A list of sessions that match the query.
 */
export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

/**
 * Updates a session based on a query and an update object.
 * @param query The query used to find the session to be updated.
 * @param update The update object.
 * @returns The result of the update operation.
 */
export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

/**
 * Reissues an access token using a refresh token.
 * @param refreshToken The refresh token used to reissue the access token.
 * @returns The newly issued access token.
 */
export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') } 
  );

  return accessToken;
}
