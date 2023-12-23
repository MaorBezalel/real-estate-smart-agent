/**
 * Removes all non-digit characters from a string.
 * @param {string} str - The input string.
 * @returns {string} The string with only digits.
 * @example
 * keepOnlyDigits('abc123') // returns "123"
 * keepOnlyDigits('abc') // returns ""
 * keepOnlyDigits('123') // returns "123"
 * keepOnlyDigits('') // returns ""
 * keepOnlyDigits('abc123def456') // returns "123456"
 */
export const keepOnlyDigits = (str: string): string => str.replace(/\D/g, '');