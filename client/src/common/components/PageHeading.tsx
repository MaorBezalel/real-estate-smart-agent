import homeDesktopHeading from '../data/svgs/home-desktop-heading.svg';
import homeMobileHeading from '../data/svgs/home-mobile-heading.svg';

import { TEST_ID } from '../data/constants/testIds';

type PageHeadingProps = {
    page: 'home' | 'search' | 'about';
    content: string;
};

export default function PageHeading({ page, content }: PageHeadingProps): React.JSX.Element {
    switch (page) {
        case 'home':
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
                        alt={content}
                        role="heading"
                        aria-level={1}
                        data-testid={TEST_ID.COMMON.PAGE_HEADING}
                    />
                </picture>
            );

        case 'about':
            return (
                <h1
                    className="text-center text-4xl font-extrabold text-primary underline underline-offset-4 antialiased
                    mobile-md:text-5xl 
                    mobile-lg:text-[3.5rem] 
                    tablet-md:text-6xl 
                    tablet-lg:text-start tablet-lg:text-[3.5rem] 
                    laptop-sm:text-6xl 
                    laptop-md:text-7xl 
                    laptop-lg:text-[4.5rem]"
                    style={{
                        textShadow:
                            '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                    }}
                    data-testid={TEST_ID.COMMON.PAGE_HEADING}
                >
                    {content}
                </h1>
            );

        case 'search':
            return (
                <h1
                    className="text-center text-[2.5rem] font-extrabold text-primary underline underline-offset-4 antialiased 
                    mobile-md:text-5xl
                    mobile-lg:text-[3.5rem]
                    tablet-md:text-6xl
                    tablet-lg:text-[3.5rem]
                    laptop-sm:text-6xl
                    laptop-md:text-7xl
                    laptop-lg:text-[4.5rem]"
                    style={{
                        textShadow:
                            '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                    }}
                    data-testid={TEST_ID.COMMON.PAGE_HEADING}
                >
                    {content}
                </h1>
            );
    }
}
