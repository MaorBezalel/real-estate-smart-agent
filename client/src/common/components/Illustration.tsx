import Lottie from 'lottie-react';

import homePageIllustration from '../../common/data/animations/home-illustration-animation.json';
import aboutPageIllustration from '../data/svgs/about-illustration.svg';

type IllustrationProps = {
    forWho: 'home' | 'about'; // TODO: add 'failed-search'
    label: string;
    roleDescription: 'Lottie Illustration' | 'SVG Illustration';
};

export default function Illustration({
    forWho,
    label,
    roleDescription,
}: IllustrationProps): React.JSX.Element {
    switch (forWho) {
        case 'home':
            return (
                <Lottie
                    className="w-[19rem] translate-y-4 scale-125 mobile-lg:h-[20rem] mobile-lg:w-auto mobile-lg:-translate-y-1 tablet-sm:translate-y-5 tablet-sm:scale-[1.3] tablet-md:h-[21rem] tablet-md:-translate-y-1 tablet-lg:h-auto tablet-lg:w-auto tablet-lg:-translate-y-4 tablet-lg:translate-x-1 tablet-lg:scale-125 laptop-lg:h-[40rem] laptop-lg:scale-[1.35]"
                    style={{ gridArea: 'illustration' }}
                    animationData={homePageIllustration}
                    loop={true}
                    aria-roledescription={roleDescription}
                    aria-label={label}
                />
            );

        case 'about':
            return (
                <object
                    className="h-[22rem] translate-y-1 scale-110 mobile-md:h-[23rem] mobile-lg:h-[23.5rem] tablet-sm:translate-y-[1.3rem] tablet-sm:scale-[1.2] tablet-md:h-[24rem] tablet-lg:h-[32rem] tablet-lg:-translate-y-6 tablet-lg:translate-x-14 laptop-sm:h-[35rem] laptop-sm:translate-x-1 laptop-sm:translate-y-0 laptop-md:h-[40rem] laptop-md:-translate-y-8 laptop-md:translate-x-2 laptop-lg:h-[45rem] laptop-lg:translate-x-3 laptop-lg:translate-y-0"
                    style={{ gridArea: 'illustration' }}
                    data={aboutPageIllustration}
                    type="image/svg+xml"
                    aria-roledescription={roleDescription}
                    aria-label={label}
                />
            );
    }
}
