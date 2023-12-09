import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { PaginationContext, PaginationContextType } from '.';

type PaginationNumberProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
>;

export default function PaginationNumberList({
    children,
    ...rest
}: PaginationNumberProps): React.JSX.Element {
    const { currentPage, totalPages } = useContext(
        PaginationContext
    ) as PaginationContextType;

    return (
        <>
            <span
                className="text-sm text-text
                mobile-lg:text-base
                tablet-sm:text-lg
                tablet-md:text-xl
                tablet-lg:hidden"
            >
                עמוד {currentPage} מתוך {totalPages}
            </span>

            <ul
                className="hidden
                tablet-lg:flex tablet-lg:items-center tablet-lg:justify-center tablet-lg:gap-6 tablet-lg:text-xl"
                {...rest}
            >
                {children}
            </ul>
        </>
    );
}
