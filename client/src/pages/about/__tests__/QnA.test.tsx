import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import QnA from '../components/QnA';

describe('`QnA` component', () => {
    // Constants
    const QUESTION_TEST_ID = 'QnA Question';
    const ANSWER_TEST_ID = 'QnA Answer';
    const QNA_SECTION_TEST_ID = 'QnA Section';

    // Fake Data
    const QUESTION_NUMBER = 1;
    const QUESTION = 'What is the name of my cat?';
    const ANSWER = 'MEOW!';

    it('should render the question and answer', () => {
        // Setup
        render(
            <QnA number={QUESTION_NUMBER} question={QUESTION} answer={ANSWER} />
        );

        // Post Expectations
        expect(screen.getByTestId(QUESTION_TEST_ID)).toHaveTextContent(
            QUESTION
        );
        expect(screen.getByTestId(ANSWER_TEST_ID)).toHaveTextContent(ANSWER);
    });

    it('should have the correct accessibility attributes', () => {
        // Setup
        render(
            <QnA number={QUESTION_NUMBER} question={QUESTION} answer={ANSWER} />
        );

        // Post Expectations
        expect(screen.getByTestId(QNA_SECTION_TEST_ID)).toHaveAttribute(
            'aria-label',
            `שאלה ותשובה מספר ${QUESTION_NUMBER}`
        );
        expect(screen.getByTestId(QUESTION_TEST_ID)).toHaveAttribute(
            'aria-label',
            `שאלה מספר ${QUESTION_NUMBER}`
        );
        expect(screen.getByTestId(ANSWER_TEST_ID)).toHaveAttribute(
            'aria-label',
            `תשובה לשאלה מספר ${QUESTION_NUMBER}`
        );
    });
});
