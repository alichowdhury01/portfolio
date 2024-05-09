import jwt from 'jsonwebtoken';
import config from 'config';

// Getting the private and public keys from the configuration
const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

/**
 * Generates a JWT (JSON Web Token) using RS256 algorithm.
 * @param object - Payload object to be encoded into the JWT.
 * @param options - Optional signing options.
 * @returns The generated JWT.
 */
export function signJwt(object: object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
} 

/**
 * Verifies the authenticity of a JWT.
 * @param token - The JWT to be verified.
 * @returns An object containing verification result, expiration status, and decoded payload.
 */
export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
