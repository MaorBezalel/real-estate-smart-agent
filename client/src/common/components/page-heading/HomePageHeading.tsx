import homeDesktopHeading from '@common/assets/svgs/home-desktop-heading.svg';
import homeMobileHeading from '@common/assets/svgs/home-mobile-heading.svg';

import { TEST_ID } from '@common/data/constants/testIds';

export default function PageHeading(): React.JSX.Element {
    return (
        <picture>
            <source srcSet={homeDesktopHeading} media="(min-width: 1024px)" />
            <img
                src={homeMobileHeading}
                className="scale-[1.2] 
                mobile-md:scale-[1.3] 
                mobile-lg:-translate-y-1 mobile-lg:scale-[1.3] 
                tablet-sm:translate-y-3 tablet-sm:scale-[1.4] 
                tablet-md:h-[7.5rem] tablet-md:translate-y-0
                tablet-lg:h-[8rem] tablet-lg:w-[20rem] tablet-lg:-translate-x-[4.5rem] tablet-lg:translate-y-11 tablet-lg:scale-[1.6]
                laptop-sm:-translate-x-24 laptop-sm:scale-[1.8] 
                laptop-md:-translate-x-[7.5rem] laptop-md:scale-[2] 
                laptop-lg:-translate-x-40 laptop-lg:scale-[2.2]"
                style={{ gridArea: 'heading' }}
                alt="מצאו בקלות את הנכס המושלם עבורכם!"
                role="heading"
                aria-level={1}
                data-testid={TEST_ID.COMMON.PAGE_HEADING.HOME_PAGE}
            />
        </picture>
    );
}
