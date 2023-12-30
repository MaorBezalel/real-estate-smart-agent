import { Link } from 'react-router-dom';
import { usePaginationContext } from '../hooks';

import { TEST_ID } from '@common/data/constants/testIds';

type PageButtonProps = {
    pageNumber: number | '...';
};

export default function PageNumberButton({ pageNumber }: PageButtonProps): React.JSX.Element {
    const { currentPage } = usePaginationContext();

    return (
        <li data-testid={TEST_ID.FEATURE.PAGINATION.PAGE_NUMBER_BUTTON}>
            {pageNumber === '...' ? (
                // ----------------------------------------------------Ellipsis-------------------------------------------------------------
                <span className="px-2 py-1">...</span>
            ) : // -------------------------------------------------------------------------------------------------------------------------
            pageNumber === currentPage ? (
                // ---------------------------------------------------Current Page Number---------------------------------------------------
                <a
                    className="flex h-12 w-12 cursor-default select-none items-center justify-center rounded-full bg-primary bg-opacity-50 px-4 py-2 font-bold text-accent"
                    aria-selected={true}
                    aria-disabled={true}
                >
                    <span>{pageNumber}</span>
                </a>
            ) : (
                // -------------------------------------------------------------------------------------------------------------------------
                // ---------------------------------------------------Other Page Number-----------------------------------------------------
                <Link
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full px-4 py-2 text-text
                    hover:bg-primary hover:bg-opacity-50"
                    reloadDocument
                    to={{
                        search: window.location.search.replace(`page=${currentPage}`, `page=${pageNumber}`),
                    }}
                    aria-selected={false}
                    aria-disabled={false}
                >
                    <span>{pageNumber}</span>
                </Link>
                // -------------------------------------------------------------------------------------------------------------------------
            )}
        </li>
    );
}
