import Lottie from 'lottie-react';
import searchingEstateAnimation from '../assets/animations/home-page.json';

export default function Illustration(): React.JSX.Element {
    return (
        <Lottie
            className="w-[19rem] translate-y-4 scale-125 mobile-lg:h-[20rem] mobile-lg:w-auto mobile-lg:-translate-y-1 tablet-sm:translate-y-5 tablet-sm:scale-[1.3] tablet-md:h-[21rem] tablet-md:-translate-y-1 tablet-lg:h-auto tablet-lg:w-auto tablet-lg:-translate-y-4 tablet-lg:translate-x-1 tablet-lg:scale-125 laptop-lg:h-[40rem] laptop-lg:scale-[1.35]"
            style={{ gridArea: 'illustration' }}
            animationData={searchingEstateAnimation}
            loop={true}
            aria-roledescription="Lottie Animation"
            aria-label='איור של חיפוש נדל"ן'
            data-testid="Home Page Illustration"
        />
    );
}
