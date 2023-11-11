import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import '../__mocks__/matchMedia.mock';

import { HashRouter as Router } from 'react-router-dom';
import HomePage from '../HomePage';

import {
    HOME_PAGE_TEST_ID,
    ILLUSTRATION_TEST_ID,
    HEADING_TEST_ID,
    CTA_TEST_ID,
} from '../constants/testIds';

describe('`HomePage` component', () => {
    it('should render with the correct test id', () => {
        // Setup
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId(HOME_PAGE_TEST_ID)).toBeInTheDocument();
    });

    it('should render with the correct accessibility attributes', () => {
        // Setup
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId(HOME_PAGE_TEST_ID)).toHaveAttribute(
            'aria-label',
            'דף הבית'
        );
    });

    it('should render the `Illustration` component', () => {
        // Setup
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId(ILLUSTRATION_TEST_ID)).toBeInTheDocument();
    });

    it('should render the `Heading` component', () => {
        // Setup
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId(HEADING_TEST_ID)).toBeInTheDocument();
    });

    it('should render the `Cta` component', () => {
        // Setup
        render(
            <Router>
                <HomePage />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId(CTA_TEST_ID)).toBeInTheDocument();
    });
});
