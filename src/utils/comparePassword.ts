import { compareSync } from "bcryptjs";

/**
 * @param {string} candidatePassword
 * @param {string} password
 * @returns {boolean}
 */
export const comparePassword = (
  candidatePassword: string,
  password: string
): boolean => {
  return compareSync(candidatePassword, password);
};
