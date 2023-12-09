import mobileHeading from '../assets/images/mobile-heading.svg';
import desktopHeading from '../assets/images/desktop-heading.svg';

import { HEADING_TEST_ID } from '../constants/testIds';

/**
 * Renders the heading component with a responsive image.
 * @returns {React.JSX.Element} The heading component.
 */
export default function Heading(): React.JSX.Element {
    return (
        <picture>
            <source srcSet={desktopHeading} media="(min-width: 1024px)" />
            <img
                src={mobileHeading}
                className="scale-[1.2] mobile-md:scale-[1.3] mobile-lg:-translate-y-1 mobile-lg:scale-[1.3] tablet-sm:translate-y-3 tablet-sm:scale-[1.4] tablet-md:h-[7.5rem] tablet-md:translate-y-0 tablet-lg:h-[8rem] tablet-lg:w-[20rem] tablet-lg:-translate-x-[4.5rem] tablet-lg:translate-y-11 tablet-lg:scale-[1.6] laptop-sm:-translate-x-24 laptop-sm:scale-[1.8] laptop-md:-translate-x-[7.5rem] laptop-md:scale-[2] laptop-lg:-translate-x-40 laptop-lg:scale-[2.2]"
                style={{ gridArea: 'heading' }}
                alt="מצאו בקלות את הנכס המושלם עבורכם!"
                role="heading"
                aria-level={1}
                data-testid={HEADING_TEST_ID}
            />
        </picture>
    );
}
