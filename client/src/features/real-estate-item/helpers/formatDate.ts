/**
 * Formats a date into a string in the format "DD/MM/YY HH:MM:SS".
 * @param {Date} date - The date to be formatted.
 * @returns {string} A string in the format "DD/MM/YY HH:MM:SS".
 * @example
 * shortenDate(new Date('2020-12-31T23:59:59.999Z')) // returns "31/12/20 23:59:59"
 * shortenDate(new Date('2021-08-01 12:00:00')) // returns "01/08/21 12:00:00"
*/
export const formatDate = (date: Date): string => {
    const year: string = date.getFullYear().toString().slice(2);
    const month: string = (date.getMonth() + 1 < 10) ? `0${date.getMonth() + 1}` : (date.getMonth() + 1).toString();
    const day: string = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate().toString();
    const hours: string = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours().toString();
    const minutes: string = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes().toString();
    const seconds: string = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds().toString();

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};