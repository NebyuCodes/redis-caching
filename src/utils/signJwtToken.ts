import { sign } from "jsonwebtoken";
import { configs } from "../config";

/**
 * @param {string} id
 * @return {string}
 */

export const signToken = (payload: {
  id: string;
  role: "user" | "admin";
}): string => {
  const token = sign(
    { id: payload.id, role: payload.role },
    configs.jwt.secret,
    {
      expiresIn: configs.jwt.expires_in,
    }
  );
  return token;
};
