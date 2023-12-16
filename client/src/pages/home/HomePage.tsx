import Main from '../../layouts/main/Main';

import Illustration from '../../common/components/Illustration';
import PageHeading from '../../common/components/PageHeading';
import Cta from './components/Cta';

import { HOME_PAGE_TEST_ID } from './constants/testIds';

/**
 * Renders the home page of the application.
 * @returns {React.JSX.Element} The home page component.
 */
export default function HomePage(): React.JSX.Element {
    const [page, headingContent] = [
        'home' as 'home',
        'מצאו בקלות את הנכס המושלם עבורכם!',
    ];
    const [forWho, label, roleDescription] = [
        'home' as 'home',
        'איור של חיפוש נדל"ן',
        'Lottie Illustration' as 'Lottie Illustration',
    ];

    return (
        <Main page="home">
            <Illustration
                forWho={forWho}
                label={label}
                roleDescription={roleDescription}
            />
            <PageHeading page={page} content={headingContent} />
            <Cta />
        </Main>
    );
}
