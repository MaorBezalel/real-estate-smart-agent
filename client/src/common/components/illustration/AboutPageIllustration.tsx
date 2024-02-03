import svgBanner from '@common/assets/svgs/about-illustration.svg';
import { TEST_ID } from '@common/data/constants/testIds';

export default function AboutPageIllustration(): React.JSX.Element {
    return (
        <img
            className="h-[22rem] translate-y-1 scale-110 mobile-md:h-[23rem] mobile-lg:h-[23.5rem] tablet-sm:translate-y-[1.3rem] tablet-sm:scale-[1.2] tablet-md:h-[24rem] tablet-lg:h-[32rem] tablet-lg:-translate-y-6 tablet-lg:translate-x-14 laptop-sm:h-[35rem] laptop-sm:translate-x-1 laptop-sm:translate-y-0 laptop-md:h-[40rem] laptop-md:-translate-y-8 laptop-md:translate-x-2 laptop-lg:h-[45rem] laptop-lg:translate-x-3 laptop-lg:translate-y-0"
            style={{ gridArea: 'illustration' }}
            src={svgBanner}
            alt="איור של חיפוש נדלן"
            draggable="false"
            data-testid={TEST_ID.COMMON.ILLUSTRATION.ABOUT_PAGE}
        />
    );
}
