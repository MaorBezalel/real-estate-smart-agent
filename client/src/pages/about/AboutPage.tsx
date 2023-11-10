import Illustration from './components/Illustration';
import Content from './components/Content';

export default function AboutPage(): React.JSX.Element {
    const textStroke = {
        textShadow:
            '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
    };

    return (
        <main
            className="container mx-auto flex flex-1 flex-col items-center justify-around gap-4 px-4 tablet-sm:gap-12 tablet-md:gap-14 tablet-lg:grid tablet-lg:grid-cols-2"
            style={{ gridTemplateAreas: "'content illustration'" }}
            aria-label="דף אודות הפרויקט"
            data-testid="About Page"
        >
            <Illustration />
            <Content />
        </main>
    );
}
