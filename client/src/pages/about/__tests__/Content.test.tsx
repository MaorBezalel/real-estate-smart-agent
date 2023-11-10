import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { QnAPairs } from '../constants/QnAPair';

import Content from '../components/Content';

describe('`Content` component', () => {
    // Constants
    const CONTENT_TEST_ID = 'About Page Content';
    const HEADING_TEST_ID = 'About Page Heading';
    const QNA_SECTION_TEST_ID = 'QnA Section';

    it('should render the `Content` component', () => {
        // Setup
        render(<Content />);

        // Post Expectations
        expect(screen.getByTestId(CONTENT_TEST_ID)).toBeInTheDocument();
    });

    it('should render the `Heading` component', () => {
        // Setup
        render(<Content />);

        // Post Expectations
        expect(screen.getByTestId(HEADING_TEST_ID)).toBeInTheDocument();
    });

    it('should render the `QnA` section components', () => {
        // Setup
        render(<Content />);

        // Post Expectations
        expect(screen.getAllByTestId(QNA_SECTION_TEST_ID)).toHaveLength(
            QnAPairs.length
        );
        QnAPairs.forEach((pair) => {
            const questionElement = screen.getByText(pair.question);
            const answerElement = screen.getByText(pair.answer);
            expect(questionElement).toBeInTheDocument();
            expect(answerElement).toBeInTheDocument();
        });
    });
});
