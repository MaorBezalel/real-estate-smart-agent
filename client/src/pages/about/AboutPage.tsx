import Main from '../../layouts/main/Main';

import Illustration from './components/Illustration';
import Content from './components/Content';

import { ABOUT_PAGE_TEST_ID } from './constants/testIds';
import { qnaPairs } from './constants/qnaPairs';

/**
 * Renders the About page component.
 * @returns {React.JSX.Element} the About page component.
 */
export default function AboutPage(): React.JSX.Element {
    return (
        <Main page="about">
            <Illustration />
            <Content qnaPairs={qnaPairs} />
        </Main>
    );
}
