import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Qna from '../components/Qna';

import {
    QNA_SECTION_TEST_ID,
    QNA_QUESTION_TEST_ID,
    QNA_ANSWER_TEST_ID,
} from '../constants/testIds';

describe('`QnA` component', () => {
    // Fake Data
    const QUESTION_NUMBER = 1;
    const QUESTION = 'What is the name of my cat?';
    const ANSWER = 'MEOW!';

    it('should render with the correct test id', () => {
        // Setup
        render(
            <Qna number={QUESTION_NUMBER} question={QUESTION} answer={ANSWER} />
        );

        // Post Expectations
        expect(screen.getByTestId(QNA_SECTION_TEST_ID)).toBeInTheDocument();
    });

    it('should render with the correct accessibility attributes', () => {
        // Setup
        render(
            <Qna number={QUESTION_NUMBER} question={QUESTION} answer={ANSWER} />
        );

        // Post Expectations
        expect(screen.getByTestId(QNA_SECTION_TEST_ID)).toHaveAttribute(
            'aria-label',
            `שאלה ותשובה מספר ${QUESTION_NUMBER}`
        );
    });

    describe('when looking at the question', () => {
        it('should render with the correct test id', () => {
            // Setup
            render(
                <Qna
                    number={QUESTION_NUMBER}
                    question={QUESTION}
                    answer={ANSWER}
                />
            );

            // Post Expectations
            expect(
                screen.getByTestId(QNA_QUESTION_TEST_ID)
            ).toBeInTheDocument();
        });

        it('should display the correct text', () => {
            // Setup
            render(
                <Qna
                    number={QUESTION_NUMBER}
                    question={QUESTION}
                    answer={ANSWER}
                />
            );

            // Post Expectations
            expect(screen.getByTestId(QNA_QUESTION_TEST_ID)).toHaveTextContent(
                QUESTION
            );
        });

        it('should have the correct accessibility attributes', () => {
            // Setup
            render(
                <Qna
                    number={QUESTION_NUMBER}
                    question={QUESTION}
                    answer={ANSWER}
                />
            );

            // Post Expectations
            expect(screen.getByTestId(QNA_QUESTION_TEST_ID)).toHaveAttribute(
                'aria-label',
                `שאלה מספר ${QUESTION_NUMBER}`
            );
        });
    });

    describe('when looking at the answer', () => {
        it('should render with the correct test id', () => {
            // Setup
            render(
                <Qna
                    number={QUESTION_NUMBER}
                    question={QUESTION}
                    answer={ANSWER}
                />
            );

            // Post Expectations
            expect(screen.getByTestId(QNA_ANSWER_TEST_ID)).toBeInTheDocument();
        });

        it('should display the correct text', () => {
            // Setup
            render(
                <Qna
                    number={QUESTION_NUMBER}
                    question={QUESTION}
                    answer={ANSWER}
                />
            );

            // Post Expectations
            expect(screen.getByTestId(QNA_ANSWER_TEST_ID)).toHaveTextContent(
                ANSWER
            );
        });

        it('should have the correct accessibility attributes', () => {
            // Setup
            render(
                <Qna
                    number={QUESTION_NUMBER}
                    question={QUESTION}
                    answer={ANSWER}
                />
            );

            // Post Expectations
            expect(screen.getByTestId(QNA_ANSWER_TEST_ID)).toHaveAttribute(
                'aria-label',
                `תשובה לשאלה מספר ${QUESTION_NUMBER}`
            );
        });
    });
});
