import { HEADING_TEST_ID } from '../constants/testIds';

/**
 * The heading component of the About page
 * @returns The React.JSX heading element
 */
export default function Heading(): React.JSX.Element {
    return (
        <h1
            className="text-center text-4xl font-extrabold text-primary underline underline-offset-4 antialiased mobile-md:text-5xl mobile-lg:text-[3.5rem] tablet-md:text-6xl tablet-lg:text-start tablet-lg:text-[3.5rem] laptop-sm:text-6xl laptop-md:text-7xl laptop-lg:text-[4.5rem]"
            style={{
                textShadow:
                    '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
            }}
            data-testid={HEADING_TEST_ID}
        >
            אודות הפרויקט:
        </h1>
    );
}
