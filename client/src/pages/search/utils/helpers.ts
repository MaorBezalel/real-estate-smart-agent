/**
 * Removes commas and currency symbol (₪) from a string and returns the resulting number.
 * @param number - The string to unformat.
 * @returns The unformatted number.
 */
export const unformatPrice = (number: string): number => Number(number.replace(/,|₪/g, ''));


/**
 * Returns a string representation of a shortened date and time.
 * @param date - The date to be formatted.
 * @returns A string in the format "DD/MM/YY HH:MM".
 * @example
 * shortenDate(new Date('2020-12-31T23:59:59.999Z')) // returns "31/12/20"
 * shortenDate(new Date('2021-08-01 12:00:00')) // returns "01/08/21"
 */
export const shortenDate = (date: Date): string => {
    const year: string = date.getFullYear().toString().slice(2);
    const month: string = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString();
    const day: string = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate().toString();

    return `${day}/${month}/${year}`;
};