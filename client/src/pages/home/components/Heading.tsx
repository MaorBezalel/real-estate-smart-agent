import { useMediaQuery } from '../../../hooks';

import mobileHeading from '../../../assets/mobile-heading.svg';
import desktopHeading from '../../../assets/desktop-heading.svg';

export default function Heading(): JSX.Element {
    const isRowLayout = useMediaQuery('(max-width: 767px)');

    return (
        <img
            src={isRowLayout ? mobileHeading : desktopHeading}
            className="tablet-lg:scale-12 tablet-lg:grid-heading scale-[1.2] mobile-md:scale-[1.3] mobile-lg:-translate-y-1 mobile-lg:scale-[1.3] tablet-sm:translate-y-2 tablet-sm:scale-[1.7] tablet-lg:h-[8rem] tablet-lg:w-[20rem] tablet-lg:-translate-x-[4.5rem] tablet-lg:translate-y-11 tablet-lg:scale-[1.6] laptop-sm:-translate-x-24 laptop-sm:scale-[1.8] laptop-md:-translate-x-[7.5rem] laptop-md:scale-[2] laptop-lg:-translate-x-40 laptop-lg:scale-[2.2]"
            style={{ gridArea: 'heading' }}
            alt="מצאו בקלות את הנכס המושלם עבורכם!"
            role="heading"
            aria-level={1}
            data-testid="Home Page Heading"
        />
    );
}
