import illustrationSvg from '../assets/images/about-illustration.svg';
import { ILLUSTRATION_TEST_ID } from '../constants/testIds';

/**
 * Renders an SVG illustration component for the About page.
 * @returns {React.JSX.Element} The rendered component.
 */
export default function Illustration(): React.JSX.Element {
    return (
        <object
            className="h-[22rem] translate-y-1 scale-110 mobile-md:h-[23rem] mobile-lg:h-[23.5rem] tablet-sm:translate-y-[1.3rem] tablet-sm:scale-[1.2] tablet-md:h-[24rem] tablet-lg:h-[32rem] tablet-lg:-translate-y-6 tablet-lg:translate-x-14 laptop-sm:h-[35rem] laptop-sm:translate-x-1 laptop-sm:translate-y-0 laptop-md:h-[40rem] laptop-md:-translate-y-8 laptop-md:translate-x-2 laptop-lg:h-[45rem] laptop-lg:translate-x-3 laptop-lg:translate-y-0"
            style={{ gridArea: 'illustration' }}
            data={illustrationSvg}
            type="image/svg+xml"
            aria-roledescription="Illustration"
            aria-label="איור של שלוש ידיים מציירות נורה דולקת על רקע גלגלי שיניים ועלים"
            data-testid={ILLUSTRATION_TEST_ID}
        />
    );
}
