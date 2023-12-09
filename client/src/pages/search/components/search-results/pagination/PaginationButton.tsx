import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { PaginationContext, PaginationContextType } from '.';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronLeft,
    faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

type PaginationButtonProps = {
    type: 'prev' | 'next';
};

export default function PaginationButton({
    type,
}: PaginationButtonProps): React.JSX.Element {
    const location = useLocation();
    const { currentPage, totalPages } = useContext(
        PaginationContext
    ) as PaginationContextType;

    return type === 'prev' ? (
        // ------------------------------------------------Prev Page Button---------------------------------------------
        <Link
            className="group flex w-20 cursor-pointer items-center justify-center gap-2 rounded-3xl bg-secondary bg-opacity-90 px-4 py-2 text-sm aria-disabled:pointer-events-none
            aria-disabled:cursor-not-allowed aria-disabled:bg-gray-500 aria-disabled:bg-opacity-50 
            mobile-lg:w-24 mobile-lg:px-6 mobile-lg:py-3 mobile-lg:text-base
            tablet-sm:text-lg
            tablet-md:w-28 tablet-md:px-8 tablet-md:py-3 tablet-md:text-xl"
            id="next-page-button"
            reloadDocument
            to={{
                search: location.search.replace(
                    `page=${currentPage}`,
                    `page=${currentPage - 1}`
                ),
            }}
            aria-disabled={currentPage === 1}
        >
            <FontAwesomeIcon
                icon={faChevronRight}
                className="text-text group-aria-disabled:text-gray-500"
            />
            <span className="font-medium text-text group-aria-disabled:text-gray-500">
                הקודם
            </span>
        </Link>
    ) : (
        // -------------------------------------------------------------------------------------------------------------
        // ------------------------------------------------Next Page Button---------------------------------------------
        <Link
            className="group flex w-20 cursor-pointer items-center justify-center gap-2 rounded-3xl bg-primary bg-opacity-50 px-4 py-2
            text-sm aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:bg-gray-500 aria-disabled:bg-opacity-50
            mobile-lg:w-24 mobile-lg:px-6 mobile-lg:py-3 mobile-lg:text-base
            tablet-sm:text-lg
            tablet-md:w-28 tablet-md:px-8 tablet-md:py-3 tablet-md:text-xl"
            id="previous-page-button"
            reloadDocument
            to={{
                search: location.search.replace(
                    `page=${currentPage}`,
                    `page=${currentPage + 1}`
                ),
            }}
            aria-disabled={currentPage === totalPages}
        >
            <span className="font-bold text-accent group-aria-disabled:text-gray-500">
                הבא
            </span>
            <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-accent group-aria-disabled:text-gray-500"
            />
        </Link>
        // -------------------------------------------------------------------------------------------------------------
    );
}
