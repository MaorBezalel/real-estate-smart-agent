import Lottie from 'lottie-react';
import animationData from '@common/assets/animations/estate-searching.json';

export default function HomePageIllustration(): React.JSX.Element {
    return (
        <Lottie
            className="w-[19rem] translate-y-4 scale-125 mobile-lg:h-[20rem] mobile-lg:w-auto mobile-lg:-translate-y-1 tablet-sm:translate-y-5 tablet-sm:scale-[1.3] tablet-md:h-[21rem] tablet-md:-translate-y-1 tablet-lg:h-auto tablet-lg:w-auto tablet-lg:-translate-y-4 tablet-lg:translate-x-1 tablet-lg:scale-125 laptop-lg:h-[40rem] laptop-lg:scale-[1.35]"
            style={{ gridArea: 'illustration' }}
            animationData={animationData}
            loop={true}
            aria-roledescription="Lottie Illustration"
            aria-label="איור של חיפוש נדלן."
        />
    );
}
