import Illustration from './components/Illustration';
import Heading from './components/Heading';
import Cta from './components/Cta';

import { HOME_PAGE_TEST_ID } from './constants/testIds';

/**
 * Renders the home page of the application.
 * @returns {React.JSX.Element} The home page component.
 */
export default function HomePage(): React.JSX.Element {
    return (
        <main
            className="container mx-auto flex flex-1 flex-col items-center justify-around px-4 tablet-sm:justify-between tablet-lg:grid tablet-lg:grid-cols-[1fr,1fr] tablet-lg:grid-rows-[2fr,1fr] tablet-lg:items-center tablet-lg:justify-center laptop-sm:px-10"
            style={{
                gridTemplateAreas: "'heading illustration' 'cta illustration'",
            }}
            aria-label="דף הבית"
            data-testid={HOME_PAGE_TEST_ID}
        >
            <Illustration />
            <Heading />
            <Cta />
        </main>
    );
}
