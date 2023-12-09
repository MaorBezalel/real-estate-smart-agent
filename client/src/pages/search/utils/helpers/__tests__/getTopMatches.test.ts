import { getTopMatches } from '../getTopMatches';

describe('getTopMatches', () => {
    it('should return the top matches based on the search term and limit', () => {
        const searchArray = ['apple', 'banana', 'orange', 'avocado'];
        const searchTerm = 'a';
        const limit = 2;
        const expectedMatches = ['apple', 'avocado'];

        const result = getTopMatches(searchArray, searchTerm, limit);

        expect(result).toEqual(expectedMatches);
    });

    it('should return at most 5 matches if no limit is provided', () => {
        const searchArray = ['apple', 'banana', 'orange', 'avocado', 'apricot', 'pineapple', 'pear', 'peach', 'plum', 'pomegranate', 'papaya'];
        const searchTerm = 'p';
        const expectedMatches = ['pineapple', 'pear', 'peach', 'plum', 'pomegranate'];

        const result = getTopMatches(searchArray, searchTerm);

        expect(result).toEqual(expectedMatches);
    });

    it('should return an empty array if no matches are found', () => {
        const searchArray = ['apple', 'banana', 'orange', 'avocado'];
        const searchTerm = 'watermelon';
        const limit = 3;
        const expectedMatches: string[] = [];

        const result = getTopMatches(searchArray, searchTerm, limit);

        expect(result).toEqual(expectedMatches);
    });
});