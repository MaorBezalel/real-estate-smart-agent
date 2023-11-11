import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Content from '../components/Content';

import { qnaPairs } from '../constants/qnaPairs';
import {
    CONTENT_TEST_ID,
    HEADING_TEST_ID,
    QNA_SECTION_TEST_ID,
    QNA_QUESTION_TEST_ID,
    QNA_ANSWER_TEST_ID,
} from '../constants/testIds';

describe('`Content` component', () => {
    it('should render with the correct test id', () => {
        // Setup
        render(<Content qnaPairs={qnaPairs} />);

        // Post Expectations
        expect(screen.getByTestId(CONTENT_TEST_ID)).toBeInTheDocument();
    });

    it('should render the `Heading` component', () => {
        // Setup
        render(<Content qnaPairs={qnaPairs} />);

        // Post Expectations
        expect(screen.getByTestId(HEADING_TEST_ID)).toBeInTheDocument();
    });

    it('should render the right amount of `QnA` section components', () => {
        // Setup
        render(<Content qnaPairs={qnaPairs} />);

        // Post Expectations
        expect(screen.getAllByTestId(QNA_SECTION_TEST_ID)).toHaveLength(
            qnaPairs.length
        );
    });

    it('should render the questions and answers of the `QnA` section components with the correct text content', () => {
        // Setup
        render(<Content qnaPairs={qnaPairs} />);
        const questions = screen.getAllByTestId(QNA_QUESTION_TEST_ID);
        const answers = screen.getAllByTestId(QNA_ANSWER_TEST_ID);

        // Post Expectations
        qnaPairs.forEach((pair, index) => {
            const question = questions[index];
            const answer = answers[index];

            expect(question.textContent).toBe(pair.question);
            expect(answer.textContent).toBe(pair.answer);
        });
    });
});
