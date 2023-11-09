import { Link } from 'react-router-dom';

export default function Cta(): JSX.Element {
    return (
        <div
            className="h-full min-w-full pr-1 tablet-sm:mb-3 tablet-lg:min-w-fit"
            style={{ gridArea: 'cta' }}
            aria-roledescription="Call To Action"
            data-testid="Home Page CTA"
        >
            <ul
                className="flex min-w-full items-center justify-center gap-4 mobile-md:gap-11 mobile-lg:gap-14 tablet-sm:gap-20 tablet-md:gap-32 tablet-lg:items-center tablet-lg:justify-start tablet-lg:gap-10 laptop-sm:mt-14 laptop-lg:gap-20"
                aria-label="רשימת קישורים דמויי כפתורים לדפים נוספים"
                data-testid="Home Page CTA Links List"
            >
                <li
                    aria-label='קישור לדף חיפוש נדל"ן'
                    data-testid="Home Page CTA Search Link Item"
                >
                    <Link
                        to="/search"
                        className="inline-block min-w-[9rem] rounded border-4 border-solid border-text bg-primary px-8 py-4 text-center font-extrabold text-background drop-shadow-xl duration-200 hover:scale-105 hover:brightness-110 hover:filter hover:ease-in-out tablet-sm:min-w-[11rem] tablet-sm:text-lg tablet-md:min-w-[12rem] tablet-md:text-xl laptop-sm:w-[14rem] laptop-sm:py-5 laptop-sm:text-2xl laptop-lg:w-[16rem] laptop-lg:py-5 laptop-lg:text-3xl"
                    >
                        חיפוש נדל"ן
                    </Link>
                </li>
                <li
                    aria-label="קישור לדף אודות"
                    data-testid="Home Page CTA About Link Item"
                >
                    <Link
                        to="/about"
                        className="inline-block min-w-[9rem] rounded border-4 border-solid border-text bg-secondary px-8 py-4 text-center font-extrabold text-text drop-shadow-xl duration-200 hover:scale-105 hover:brightness-110 hover:filter hover:ease-in-out tablet-sm:min-w-[11rem] tablet-sm:text-lg tablet-md:min-w-[12rem] tablet-md:text-xl laptop-sm:w-[14rem] laptop-sm:py-5 laptop-sm:text-2xl laptop-lg:w-[16rem] laptop-lg:py-5 laptop-lg:text-3xl"
                    >
                        אודות
                    </Link>
                </li>
            </ul>
        </div>
    );
}
