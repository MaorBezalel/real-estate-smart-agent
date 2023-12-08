/**
 * Returns the current date and time in the specified format.
 * @returns {string} The current date and time formatted as "DD-MM-YYYY, HH:MM:SS".
 */
export const getTodayDateTime = (): string => {
    const date = new Date();

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based, so we need to add 1
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${day}-${month}-${year}, ${hours}:${minutes}:${seconds}`;
}