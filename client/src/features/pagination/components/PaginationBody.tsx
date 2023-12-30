import { usePaginationContext } from '../hooks';

import { PageNumberButton } from '.';
import { generatePagination } from '../helpers/generatePagination';

import { TEST_ID } from '@common/data/constants/testIds';

export default function PaginationBody(): React.JSX.Element {
    const { currentPage, totalPages } = usePaginationContext();

    return (
        <div data-test-id={TEST_ID.FEATURE.PAGINATION.PAGINATION_BODY}>
            {/* Mobile*/}
            <span
                className="text-sm text-text
                mobile-lg:text-base
                tablet-sm:text-lg
                tablet-md:text-xl
                tablet-lg:hidden"
            >
                עמוד {currentPage} מתוך {totalPages}
            </span>

            {/* Desktop */}
            <ul
                className="hidden
                tablet-lg:flex tablet-lg:items-center tablet-lg:justify-center tablet-lg:gap-6 tablet-lg:text-xl"
            >
                {generatePagination(currentPage, totalPages, 10).map((pageNumber) => (
                    <PageNumberButton key={pageNumber} pageNumber={pageNumber} />
                ))}
            </ul>
        </div>
    );
}
