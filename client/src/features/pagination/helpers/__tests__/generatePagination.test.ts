import { generatePagination } from '../generatePagination';

describe('generatePagination', () => {
    it('should return an empty array if totalPages is 0', () => {
        const currentPage = 1;
        const totalPages = 0;
        const maxPages = 5;
        const result = generatePagination(currentPage, totalPages, maxPages);
        expect(result).toEqual([]);
    });

    it('should display all pages if totalPages is less than or equal to maxPages', () => {
        const currentPage = 1;
        const totalPages = 5;
        const maxPages = 10;
        const result = generatePagination(currentPage, totalPages, maxPages);
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it('should display ellipsis on the right side of the current page', () => {
        const currentPage = 3;
        const totalPages = 10;
        const maxPages = 6;
        const result = generatePagination(currentPage, totalPages, maxPages);
        expect(result).toEqual([1, 2, 3, 4, 5, '...', 10]);
    });

    it('should display ellipsis on the left side of the current page', () => {
        const currentPage = 9;
        const totalPages = 10;
        const maxPages = 4;
        const result = generatePagination(currentPage, totalPages, maxPages);
        expect(result).toEqual([1, '...', 7, 8, 9, 10]);
    });


    it('should display ellipsis on both sides of the current page', () => {
        const currentPage = 7;
        const totalPages = 15;
        const maxPages = 8;
        const result = generatePagination(currentPage, totalPages, maxPages);
        expect(result).toEqual([1, '...', 3, 4, 5, 6, 7, 8, 9, 10, '...', 15]);
    });

    it('should display all pages with maxPages equal to 5 if maxPages is not provided', () => {
        const currentPage = 5;
        const totalPages = 10;
        const result = generatePagination(currentPage, totalPages);
        expect(result).toEqual([1, '...', 3, 4, 5, 6, 7, '...', 10]);
    });
});