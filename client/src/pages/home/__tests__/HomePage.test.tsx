import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import '../__mocks__/matchMedia.mock';

import { HashRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage';

describe('`HomePage` component', () => {
    it('should render', () => {
        // Setup
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId('Home Page')).toBeInTheDocument();
    });

    it('should render with the correct accessibility attributes', () => {
        // Setup
        render(
            <Router>
                <HomePage />
            </Router>
        );
        const homePage = screen.getByTestId('Home Page');

        // Post Expectations
        expect(homePage).toHaveAttribute('aria-label', 'דף הבית');
    });

    it('should render the `Illustration` component', () => {
        // Setup
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Post Expectations
        expect(
            screen.getByTestId('Home Page Illustration')
        ).toBeInTheDocument();
    });

    it('should render the `Heading` component', () => {
        // Setup
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId('Home Page Heading')).toBeInTheDocument();
    });

    it('should render the `Cta` component', () => {
        // Setup
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId('Home Page CTA')).toBeInTheDocument();
    });
});
