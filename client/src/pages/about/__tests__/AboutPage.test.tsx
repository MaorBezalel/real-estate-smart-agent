import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import AboutPage from '../AboutPage';

import {
    ABOUT_PAGE_TEST_ID,
    ILLUSTRATION_TEST_ID,
    CONTENT_TEST_ID,
} from '../constants/testIds';

describe('`AboutPage` component', () => {
    it('should render with the correct test id', () => {
        // Setup
        render(<AboutPage />);

        // Post Expectations
        expect(screen.getByTestId(ABOUT_PAGE_TEST_ID)).toBeInTheDocument();
    });

    it('should render with the correct accessibility attributes', () => {
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
