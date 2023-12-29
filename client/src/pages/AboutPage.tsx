import Main from '@layouts/main/Main';

import Illustration from '@common/components/illustration/AboutPageIllustration';
import PageHeading from '@common/components/page-heading/AboutPageHeading';
import Content from '@common/components/content/AboutPageContent';

/**
 * Renders the About page component.
 * @returns {React.JSX.Element} the About page component.
 */
export default function AboutPage(): React.JSX.Element {
    return (
        <Main page="about">
            <Illustration />
            <div className="flex flex-col gap-6 tablet-lg:text-start">
                <PageHeading />
                <Content />
            </div>
        </Main>
    );
}
