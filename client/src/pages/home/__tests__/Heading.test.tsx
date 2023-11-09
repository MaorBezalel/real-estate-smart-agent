import { render, screen } from '@testing-library/react';
import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest';

import * as hooks from '../../../hooks';
import '../__mocks__/matchMedia.mock';

import { HashRouter as Router } from 'react-router-dom';
import Heading from '../components/Heading';

describe('`Heading` component', () => {
    // Constants
    const HEADING_TEST_ID = 'Home Page Heading';
    const MOBILE_HEADING_SRC =
        '/real-estate-smart-agent/src/assets/mobile-heading.svg';
    const DESKTOP_HEADING_SRC =
        '/real-estate-smart-agent/src/assets/desktop-heading.svg';

    it('should render the heading image', () => {
        // Setup
        render(
            <Router>
                <Heading />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId(HEADING_TEST_ID)).toBeInTheDocument();
    });

    describe('when the screen width is less than 1024px', () => {
        beforeEach(() => {
            vi.spyOn(hooks, 'useMediaQuery').mockImplementation(() => true);
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should render the mobile heading image', () => {
            // Setup
            render(
                <Router>
                    <Heading />
                </Router>
            );
            const mobileHeading = screen.getByTestId(HEADING_TEST_ID);

            // Post Expectations
            expect(mobileHeading).toBeInTheDocument();
            expect(mobileHeading).toHaveAttribute('src', MOBILE_HEADING_SRC);
        });

        it('should render the mobile heading image with the correct accessibility attributes', () => {
            // Setup
            render(
                <Router>
                    <Heading />
                </Router>
            );
            const mobileHeading = screen.getByTestId(HEADING_TEST_ID);

            // Post Expectations
            expect(mobileHeading).toHaveAttribute('role', 'heading');
            expect(mobileHeading).toHaveAttribute('aria-level', '1');
            expect(mobileHeading).toHaveAttribute(
                'alt',
                'מצאו בקלות את הנכס המושלם עבורכם!'
            );
        });
    });

    describe('when the screen width is greater or equal to 1024px', () => {
        beforeEach(() => {
            vi.spyOn(hooks, 'useMediaQuery').mockImplementation(() => false);
        });

        afterEach(() => {
            vi.restoreAllMocks();
        });

        it('should render the desktop heading image', () => {
            // Setup
            render(
                <Router>
                    <Heading />
                </Router>
            );
            const desktopHeading = screen.getByTestId(HEADING_TEST_ID);

            // Post Expectations
            expect(desktopHeading).toBeInTheDocument();
            expect(desktopHeading).toHaveAttribute('src', DESKTOP_HEADING_SRC);
        });

        it('should render the desktop heading image with the correct accessibility attributes', () => {
            // Setup
            render(
                <Router>
                    <Heading />
                </Router>
            );
            const desktopHeading = screen.getByTestId(HEADING_TEST_ID);

            // Post Expectations
            expect(desktopHeading).toHaveAttribute('role', 'heading');
            expect(desktopHeading).toHaveAttribute('aria-level', '1');
            expect(desktopHeading).toHaveAttribute(
                'alt',
                'מצאו בקלות את הנכס המושלם עבורכם!'
            );
        });

        it('should be positioned in the correct grid area', () => {
            // Setup
            render(
                <Router>
                    <Heading />
                </Router>
            );
            const desktopHeading = screen.getByTestId(HEADING_TEST_ID);

            // Post Expectations
            expect(desktopHeading).toHaveStyle({ gridArea: 'heading' });
        });
    });
});
