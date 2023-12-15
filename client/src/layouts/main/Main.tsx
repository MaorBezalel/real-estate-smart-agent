type MainProps = {
    page: 'home' | 'about' | 'search';
    children: React.ReactNode;
};

export default function Main({ page, children }: MainProps): React.JSX.Element {
    switch (page) {
        case 'home':
            return (
                <main
                    className="container mx-auto flex flex-1 flex-col items-center justify-around px-4 
                    tablet-sm:justify-between 
                    tablet-lg:grid tablet-lg:grid-cols-[1fr,1fr] tablet-lg:grid-rows-[2fr,1fr] tablet-lg:items-center tablet-lg:justify-center
                    laptop-sm:px-10"
                    style={{
                        gridTemplateAreas:
                            "'heading illustration' 'cta illustration'",
                    }}
                    aria-label="דף הבית"
                    //data-testid={HOME_PAGE_TEST_ID}
                >
                    {children}
                </main>
            );

        case 'about':
            return (
                <main
                    className="container mx-auto flex flex-1 flex-col items-center justify-around gap-4 px-4 
                    tablet-sm:gap-12 
                    tablet-md:gap-14 
                    tablet-lg:grid tablet-lg:grid-cols-2"
                    style={{ gridTemplateAreas: "'content illustration'" }}
                    aria-label="דף אודות הפרויקט"
                >
                    {children}
                </main>
            );

        case 'search':
            return (
                <main
                    className="container mx-auto flex flex-1 flex-col place-items-center gap-4 px-4 pt-4
                    mobile-md:gap-6
                    tablet-sm:gap-7
                    laptop-md:gap-10"
                    aria-label='דף חיפוש נכסי נדל"ן'
                >
                    {children}
                </main>
            );
    }
}
