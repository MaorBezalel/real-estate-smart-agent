import Main from '@layouts/main/Main';

import Illustration from '@common/components/illustration/HomePageIllustration';
import PageHeading from '@common/components/page-heading/HomePageHeading';
import Cta from '@common/components/cta/HomePageCta';

/**
 * Renders the home page of the application.
 * @returns {React.JSX.Element} The home page component.
 */
export default function HomePage(): React.JSX.Element {
    return (
        <Main page="home">
            <Illustration />
            <PageHeading />
            <Cta />
        </Main>
    );
}
