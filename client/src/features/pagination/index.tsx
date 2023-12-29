import { useSearchParams } from 'react-router-dom';
import PaginationContext from './contexts/PaginationContext';

type PaginationProps = {
    totalPages: number;
    children: React.ReactNode;
};

export default function Pagination({ totalPages, children }: PaginationProps): React.JSX.Element {
    const [searchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    return (
        <nav
            className="mt-10 flex items-center justify-between gap-1 rounded-xl bg-white py-4 shadow-xl outline outline-1 outline-text
            mobile-md:px-2"
        >
            <PaginationContext.Provider value={{ currentPage, totalPages }}>
                {children}
            </PaginationContext.Provider>
        </nav>
    );
}
