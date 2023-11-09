import Illustration from './components/Illustration';
import Heading from './components/Heading';
import Cta from './components/Cta';

export default function HomePage(): JSX.Element {
    return (
        <main
            className="tablet-lg:grid-areas-names container mx-auto flex flex-1 flex-col items-center justify-around border border-solid border-red-600 tablet-sm:justify-between tablet-lg:grid tablet-lg:grid-cols-[1fr,1fr] tablet-lg:grid-rows-[2fr,1fr] tablet-lg:items-center tablet-lg:justify-center laptop-sm:px-10"
            aria-label="דף הבית"
            data-testid="Home Page"
        >
            <Illustration />
            <Heading />
            <Cta />
        </main>
    );
}
