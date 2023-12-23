/**
 * Returns an array of top matches from a search array based on a search term.
 * 
 * @param {readonly string[]} searchArray - The array to search through (read-only).
 * @param {string} searchTerm - The search term to match against.
 * @param {number} [limit = 5] - The maximum number of matches to return.
 * @returns {string[]} An array of top matches.
 */
export const getTopMatches = (searchArray: readonly string[], searchTerm: string, limit: number = 5): string[] => {
    const escapedSearchTerm = searchTerm.trim().replace(/([()])/g, "\\$1");
    const matches = searchArray.filter((item: string) => {
        const regex = new RegExp(`^${escapedSearchTerm}`, 'gi');
        return item.match(regex);
    });
    return matches.slice(0, limit);
}