import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import Illustration from '../components/Illustration';

describe('`Illustration` component', () => {
    // Constants
    const ANIMATION_TEST_ID = 'Home Page Illustration';

    it('should render the Lottie animation', () => {
        // Setup
        render(<Illustration />);

        // Post Expectations
        expect(screen.getByTestId(ANIMATION_TEST_ID)).toBeInTheDocument();
    });

    it('should render the Lottie animation with the correct accessibility attributes', () => {
        // Setup
        render(<Illustration />);
        const animation = screen.getByTestId(ANIMATION_TEST_ID);

        // Post Expectations
        expect(animation).toHaveAttribute('aria-label', 'איור של חיפוש נדל"ן');
        expect(animation).toHaveAttribute(
            'aria-roledescription',
            'Lottie Animation'
        );
    });

    it('should be positioned in the correct grid area', () => {
        // Setup
        render(<Illustration />);
        const animation = screen.getByTestId(ANIMATION_TEST_ID);

        // Post Expectations
        expect(animation).toHaveStyle({
            gridArea: 'illustration',
        });
    });
});
