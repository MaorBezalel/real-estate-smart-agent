import { PaginationContext, PaginationContextType } from '.';

type PaginationProps = PaginationContextType &
    React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
HTMLElement;

export default function Pagination({
    currentPage,
    totalPages,
    mutation,
    children,
    ...rest
}: PaginationProps): React.JSX.Element {
    return (
        <PaginationContext.Provider
            value={{ currentPage, totalPages, mutation }}
        >
            <nav
                className="mt-10 flex items-center justify-between gap-1 rounded-xl bg-white py-4 shadow-xl outline outline-1 outline-text
                mobile-md:px-2"
                {...rest}
            >
                {children}
            </nav>
        </PaginationContext.Provider>
    );
}
