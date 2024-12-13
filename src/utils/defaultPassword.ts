/**
 * @param {}
 * @returns {string}
 */

import { hashPassword } from "./hashPassword";

export const defaultPassword = (): string => {
  return hashPassword("muyaspace@12345");
};
