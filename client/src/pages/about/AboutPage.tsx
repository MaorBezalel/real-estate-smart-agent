import Main from '../../layouts/main/Main';

import Illustration from '../../common/components/Illustration';
import Container from '../../common/components/Container';
import PageHeading from '../../common/components/PageHeading';
import QuestionAnswer from './components/QuestionAnswer';

import { ABOUT_PAGE_TEST_ID } from './constants/testIds';
import { qnaPairs } from './constants/qnaPairs';

/**
 * Renders the About page component.
 * @returns {React.JSX.Element} the About page component.
 */
export default function AboutPage(): React.JSX.Element {
    const [page, headingContent] = ['about' as 'about', 'אודות הפרויקט:'];
    const [forWho, label, roleDescription] = [
        'about' as 'about',
        'איור של שלוש ידיים מציירות נורה דולקת על רקע גלגלי שיניים ועלים',
        'SVG Illustration' as 'SVG Illustration',
    ];

    return (
        <Main page="about">
            <Illustration
                forWho={forWho}
                label={label}
                roleDescription={roleDescription}
            />
            <Container className="flex flex-col gap-6 tablet-lg:text-start">
                <PageHeading page={page} content={headingContent} />
                {qnaPairs.map((pair, index) => (
                    <QuestionAnswer
                        key={index}
                        number={index + 1}
                        question={pair.question}
                        answer={pair.answer}
                    />
                ))}
            </Container>
        </Main>
    );
}
