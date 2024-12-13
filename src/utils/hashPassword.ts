import { hashSync } from "bcryptjs";

/**
 * @param {string} password
 * @returns {string}
 */

export const hashPassword = (password: string) => {
  return hashSync(password, 12);
};
