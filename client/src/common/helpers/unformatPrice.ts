/**
 * Removes formatting characters from a price string and returns the numeric value.
 * @param {string} price - The price string to be unformatted.
 * @returns {number} The unformatted price as a number.
 * @example
 * unformatPrice('1,000,000₪') // returns 1000000
 * unformatPrice('100₪') // returns 100
 */
export const unformatPrice = (price: string): number => Number(price.replace(/,|₪/g, ''));