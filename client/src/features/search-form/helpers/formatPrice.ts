/**
 * Formats a price number or string into a formatted string with commas and optional currency symbol (₪).
 * @param {number | string} price - The price to be formatted.
 * @param {boolean} withCurrencySymbol - Whether to include the currency symbol. Default is true.
 * @returns {string} The price as a formatted string.
 * @example
 * formatPrice(1000000) // returns "1,000,000 ₪"
 * formatPrice(1000000, false) // returns "1,000,000"
 * formatPrice(100) // returns "100 ₪"
 * formatPrice(100, false) // returns "100"
 */
export const formatPrice = (price: number | string, withCurrencySymbol: boolean = true): string => {
    const priceWithCommas: string = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return withCurrencySymbol ? `${priceWithCommas} ₪` : priceWithCommas;
}
