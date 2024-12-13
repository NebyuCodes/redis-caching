import { verify, JwtPayload } from "jsonwebtoken";
import { configs } from "../config";
/**
 * @param {JwtPayload} token
 * @returns {}
 */

interface ICustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

export const verifyToken = (token: string): ICustomJwtPayload => {
  return verify(token, configs.jwt.secret) as ICustomJwtPayload;
};
