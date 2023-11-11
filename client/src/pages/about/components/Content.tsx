import Heading from './Heading';
import Qna from './Qna';

import { QnaPair } from '../constants/qnaPairs';
import { CONTENT_TEST_ID } from '../constants/testIds';

/** The props for the `Content` component */
type ContentProps = {
    qnaPairs: QnaPair[];
};

/**
 * The `Content` component of the About page
 * @param {ContentProps} props The props for the `Content` component
 * @returns The React.JSX content element
 */
export default function Content({ qnaPairs }: ContentProps): React.JSX.Element {
    return (
        <div
            className="flex flex-col gap-6 tablet-lg:text-start"
            data-testid={CONTENT_TEST_ID}
        >
            <Heading />
            {qnaPairs.map((pair, index) => (
                <Qna
                    key={index}
                    number={index + 1}
                    question={pair.question}
                    answer={pair.answer}
                />
            ))}
        </div>
    );
}
