import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Illustration from '../components/Illustration';

import { ILLUSTRATION_TEST_ID } from '../constants/testIds';

describe('`Illustration` component', () => {
    it('should render with the correct test id', () => {
        // Setup
        render(<Illustration />);

        // Post Expectations
        expect(screen.getByTestId(ILLUSTRATION_TEST_ID)).toBeInTheDocument();
    });

    it('should render with the correct accessibility attributes', () => {
        // Setup
        render(<Illustration />);
        const illustration = screen.getByTestId(ILLUSTRATION_TEST_ID);

        // Post Expectations
        expect(illustration).toHaveAttribute(
            'aria-label',
            'איור של חיפוש נדל"ן'
        );
        expect(illustration).toHaveAttribute(
            'aria-roledescription',
            'Lottie Animation'
        );
    });

    it('should be positioned in the correct grid area', () => {
        // Setup
        render(<Illustration />);

        // Post Expectations
        expect(screen.getByTestId(ILLUSTRATION_TEST_ID)).toHaveStyle({
            gridArea: 'illustration',
        });
    });
});
