import Heading from './Heading';
import QnA from './QnA';

import { QnAPairs } from '../constants/QnAPair';

/**
 * The content component of the About page
 * @returns The React.JSX content element
 */
export default function Content(): React.JSX.Element {
    return (
        <div
            className="flex flex-col gap-6 tablet-lg:text-start"
            data-testid="About Page Content"
        >
            <Heading />
            {QnAPairs.map((pair, index) => (
                <QnA
                    key={index}
                    number={index + 1}
                    question={pair.question}
                    answer={pair.answer}
                />
            ))}
        </div>
    );
}
