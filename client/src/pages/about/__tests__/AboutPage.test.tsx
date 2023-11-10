import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import AboutPage from '../AboutPage';

describe('`AboutPage` component', () => {
    // Constants
    const ABOUT_PAGE_TEST_ID = 'About Page';
    const ILLUSTRATION_TEST_ID = 'About Page Illustration';
    const CONTENT_TEST_ID = 'About Page Content';

    it('should render the `AboutPage` component', () => {
        // Setup
        render(<AboutPage />);

        // Post Expectations
        expect(screen.getByTestId(ABOUT_PAGE_TEST_ID)).toBeInTheDocument();
    });

    it('should render the `AboutPage` component with the correct accessibility attributes', () => {
        // Setup
        render(<AboutPage />);
        const aboutPage = screen.getByTestId(ABOUT_PAGE_TEST_ID);

        // Post Expectations
        expect(aboutPage).toHaveAttribute('aria-label', 'דף אודות הפרויקט');
    });

    it('should render the `Illustration` component', () => {
        // Setup
        render(<AboutPage />);

        // Post Expectations
        expect(screen.getByTestId(ILLUSTRATION_TEST_ID)).toBeInTheDocument();
    });

    it('should render the `Content` component', () => {
        // Setup
        render(<AboutPage />);

        // Post Expectations
        expect(screen.getByTestId(CONTENT_TEST_ID)).toBeInTheDocument();
    });
});
