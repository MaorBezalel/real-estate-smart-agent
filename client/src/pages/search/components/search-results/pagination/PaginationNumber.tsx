import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PaginationContext, PaginationContextType } from '.';

type PaginationNumberProps = {
    pageNumber: number | '...';
};

export default function PaginationNumber({
    pageNumber,
}: PaginationNumberProps): React.JSX.Element {
    const { currentPage, mutation } = useContext(
        PaginationContext
    ) as PaginationContextType;

    return (
        <li>
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
                        search: window.location.search.replace(
                            `page=${currentPage}`,
                            `page=${pageNumber}`
                        ),
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
