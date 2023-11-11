import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router } from 'react-router-dom'; // Using BrowserRouter instead of HashRouter to avoid # in the URL during tests
import Cta from '../components/Cta';

import {
    CTA_TEST_ID,
    CTA_LINKS_LIST_TEST_ID,
    CTA_SEARCH_LINK_ITEM_TEST_ID,
    CTA_ABOUT_LINK_ITEM_TEST_ID,
} from '../constants/testIds';

describe('`Cta` component', () => {
    it('should render with the correct test id', () => {
        // Setup
        render(
            <Router>
                <Cta />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId(CTA_TEST_ID)).toBeInTheDocument();
    });

    it('should render with the correct accessibility attributes', () => {
        // Setup
        render(
            <Router>
                <Cta />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId(CTA_TEST_ID)).toHaveAttribute(
            'aria-roledescription',
            'Call To Action'
        );
    });

    describe('when looking it the list of links', () => {
        it('should render with the correct test id', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );

            // Post Expectations
            expect(
                screen.getByTestId(CTA_LINKS_LIST_TEST_ID)
            ).toBeInTheDocument();
        });

        it('should be the only direct child element of the `Cta` component', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const cta = screen.getByTestId(CTA_TEST_ID);
            const list = screen.getByTestId(CTA_LINKS_LIST_TEST_ID);

            // Post Expectations
            expect(cta).toContainElement(list);
        });

        it('should render with the correct accessibility attributes', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );

            // Post Expectations)
            expect(screen.getByTestId(CTA_LINKS_LIST_TEST_ID)).toHaveAttribute(
                'aria-label',
                'רשימת קישורים דמויי כפתורים לדפים נוספים'
            );
        });
    });

    describe('when looking at the `search` button-like link item', () => {
        it('should render with the correct test id', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );

            // Post Expectations
            expect(
                screen.getByTestId(CTA_SEARCH_LINK_ITEM_TEST_ID)
            ).toBeInTheDocument();
        });

        it('should be a child of the `Cta` component links list', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const list = screen.getByTestId(CTA_LINKS_LIST_TEST_ID);
            const searchLinkItem = screen.getByTestId(
                CTA_SEARCH_LINK_ITEM_TEST_ID
            );

            // Post Expectations
            expect(list).toContainElement(searchLinkItem);
        });

        it('should render with the correct accessibility attributes', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );

            // Post Expectations
            expect(
                screen.getByTestId(CTA_SEARCH_LINK_ITEM_TEST_ID)
            ).toHaveAttribute('aria-label', 'קישור לדף חיפוש נדל"ן');
        });

        it('should father a link child element to the `search` page', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const searchLinkItem = screen.getByTestId(
                CTA_SEARCH_LINK_ITEM_TEST_ID
            );
            const searchLink = searchLinkItem.firstElementChild;

            // Post Expectations
            expect(searchLinkItem.childElementCount).toBe(1);
            expect(searchLink).toHaveAttribute('href', '/search');
        });

        it('should lead to the search page when its link child element is clicked', async () => {
            // Setup
            const user = userEvent.setup();
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const searchLinkItem = screen.getByTestId(
                CTA_SEARCH_LINK_ITEM_TEST_ID
            );
            const searchLink = searchLinkItem.firstElementChild;

            // Actions
            await user.click(searchLink as HTMLElement);

            // Post Expectations
            expect(window.location.pathname).toBe('/search');
        });
    });

    describe('when looking at the `about` button-like link item', () => {
        it('should render with the correct test id', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );

            // Post Expectations
            expect(
                screen.getByTestId(CTA_ABOUT_LINK_ITEM_TEST_ID)
            ).toBeInTheDocument();
        });

        it('should be a child of the `Cta` component links list', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const list = screen.getByTestId(CTA_LINKS_LIST_TEST_ID);
            const aboutLinkItem = screen.getByTestId(
                CTA_ABOUT_LINK_ITEM_TEST_ID
            );

            // Post Expectations
            expect(list).toContainElement(aboutLinkItem);
        });

        it('should render with the correct accessibility attributes', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );

            // Post Expectations
            expect(
                screen.getByTestId(CTA_ABOUT_LINK_ITEM_TEST_ID)
            ).toHaveAttribute('aria-label', 'קישור לדף אודות');
        });

        it('should father a link child element to the `about` page', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const aboutLinkItem = screen.getByTestId(
                CTA_ABOUT_LINK_ITEM_TEST_ID
            );
            const aboutLink = aboutLinkItem.firstElementChild;

            // Post Expectations
            expect(aboutLinkItem.childElementCount).toBe(1);
            expect(aboutLink).toHaveAttribute('href', '/about');
        });

        it('should lead to the about page when its link child element is clicked', async () => {
            // Setup
            const user = userEvent.setup();
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const aboutLinkItem = screen.getByTestId(
                CTA_ABOUT_LINK_ITEM_TEST_ID
            );
            const aboutLink = aboutLinkItem.firstElementChild;

            // Actions
            await user.click(aboutLink as HTMLElement);

            // Post Expectations
            expect(window.location.pathname).toBe('/about');
        });
    });
});
