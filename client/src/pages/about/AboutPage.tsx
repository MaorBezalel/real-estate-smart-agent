import Illustration from './components/Illustration';
import Content from './components/Content';

import { ABOUT_PAGE_TEST_ID } from './constants/testIds';
import { qnaPairs } from './constants/qnaPairs';

/**
 * Renders the About page component.
 * @returns {React.JSX.Element} the About page component.
 */
export default function AboutPage(): React.JSX.Element {
    return (
        <main
            className="container mx-auto flex flex-1 flex-col items-center justify-around gap-4 px-4 tablet-sm:gap-12 tablet-md:gap-14 tablet-lg:grid tablet-lg:grid-cols-2"
            style={{ gridTemplateAreas: "'content illustration'" }}
            aria-label="דף אודות הפרויקט"
            data-testid={ABOUT_PAGE_TEST_ID}
        >
            <Illustration />
            <Content qnaPairs={qnaPairs} />
        </main>
    );
}
