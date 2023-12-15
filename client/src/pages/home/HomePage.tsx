import Main from '../../layouts/main/Main';

import Illustration from './components/Illustration';
import Heading from './components/Heading';
import Cta from './components/Cta';

import { HOME_PAGE_TEST_ID } from './constants/testIds';

/**
 * Renders the home page of the application.
 * @returns {React.JSX.Element} The home page component.
 */
export default function HomePage(): React.JSX.Element {
    return (
        <Main page="home">
            <Illustration />
            <Heading />
            <Cta />
        </Main>
    );
}
