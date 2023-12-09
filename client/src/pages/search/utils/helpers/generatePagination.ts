/**
 * Generates an array of page numbers and ellipsis ('...') to represent pagination.
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {number} [maxPages = 5] - The maximum number of pages to display, other than the first and last pages. Defaults to 5.
 * @returns {(number | '...')[]} An array of page numbers and ellipsis ('...') representing pagination.
 * @example
 * generatePagination(1, 1) // returns [1]
 * generatePagination(5, 20, 5) // returns [1, '...', 3, 4, 5, 6, 7, '...', 20]
 * generatePagination(1, 20, 5) // returns [1, 2, 3, '...', 20]
 * generatePagination(20, 20, 5) // returns [1, '...', 18, 19, 20]
 * generatePagination(9, 30, 6) // returns [1, '...', 6, 7, 8, 9, 10, 11, '...', 30] 
 * 
*/
export const generatePagination = (currentPage: number, totalPages: number, maxPages: number = 5): (number | '...')[] => {
    // Setup
    const pages: (number | '...')[] = [];
    const firstPage: number = 1;
    const lastPage: number = totalPages;

    const maxPagesBeforeCurrentPage: number = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage: number = Math.ceil(maxPages / 2) - 1;

    const theFarthestPageToTheLeft: number = currentPage - maxPagesBeforeCurrentPage;
    const theFarthestPageToTheRight: number = currentPage + maxPagesAfterCurrentPage;

    // Helper function
    const arrayRange = (start: number, end: number): number[] => Array.from({ length: ((end + 1) - start) }, (_, k) => k + start);

    // Validate current page
    if (currentPage > totalPages) currentPage = totalPages;

    // Return empty array if there are no pages
    if (totalPages === 0) return pages;

    // Display all pages if they are less than or equal to the predefined max pages
    if (totalPages <= maxPages) return arrayRange(firstPage, lastPage);

    // Determine which pages to display before the current page
    const isFirstPageCloseEnough: boolean = theFarthestPageToTheLeft < 3;
    if (isFirstPageCloseEnough) pages.push(...arrayRange(firstPage, currentPage));
    else pages.push(firstPage, '...', ...arrayRange(theFarthestPageToTheLeft, currentPage));

    // Determine which pages to display after the current page
    const isLastPageCloseEnough: boolean = theFarthestPageToTheRight > totalPages - 2;
    if (isLastPageCloseEnough) pages.push(...arrayRange(currentPage + 1, totalPages));
    else pages.push(...arrayRange(currentPage + 1, theFarthestPageToTheRight), '...', lastPage);

    return pages;
};
