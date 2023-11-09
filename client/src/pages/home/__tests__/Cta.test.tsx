import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router } from 'react-router-dom'; // Using BrowserRouter instead of HashRouter to avoid # in the URL during tests
import Cta from '../components/Cta';

describe('`Cta` component', () => {
    // Constants
    const CTA_TEST_ID = 'Home Page CTA';
    const LINKS_LIST_TEST_ID = 'Home Page CTA Links List';
    const SEARCH_LINK_ITEM_TEST_ID = 'Home Page CTA Search Link Item';
    const ABOUT_LINK_ITEM_TEST_ID = 'Home Page CTA About Link Item';

    it('should render the Cta', () => {
        // Setup
        render(
            <Router>
                <Cta />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId(CTA_TEST_ID)).toBeInTheDocument();
    });

    it('should render the Cta with the correct accessibility attributes', () => {
        // Setup
        render(
            <Router>
                <Cta />
            </Router>
        );
        const cta = screen.getByTestId(CTA_TEST_ID);

        // Post Expectations
        expect(cta).toHaveAttribute('aria-roledescription', 'Call To Action');
    });

    describe('when looking it the list of links', () => {
        it('should first be in the document', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const list = screen.getByTestId(LINKS_LIST_TEST_ID);

            // Post Expectations
            expect(list).toBeInTheDocument();
        });

        it('should render the list as the only direct child element of the Cta', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const cta = screen.getByTestId(CTA_TEST_ID);
            const list = screen.getByTestId(LINKS_LIST_TEST_ID);

            // Post Expectations
            expect(cta).toContainElement(list);
        });

        it('should render the list with the correct accessibility attributes', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const list = screen.getByTestId(LINKS_LIST_TEST_ID);

            // Post Expectations)
            expect(list).toHaveAttribute(
                'aria-label',
                'רשימת קישורים דמויי כפתורים לדפים נוספים'
            );
        });
    });

    describe('when looking at the search button-like link item', () => {
        it('should first be in the document', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const searchLinkItem = screen.getByTestId(SEARCH_LINK_ITEM_TEST_ID);

            // Post Expectations
            expect(searchLinkItem).toBeInTheDocument();
        });

        it('should be a child of the Cta list', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const list = screen.getByTestId(LINKS_LIST_TEST_ID);
            const searchLinkItem = screen.getByTestId(SEARCH_LINK_ITEM_TEST_ID);

            // Post Expectations
            expect(list).toContainElement(searchLinkItem);
        });

        it('should render it with the correct accessibility attributes', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const searchLinkItem = screen.getByTestId(SEARCH_LINK_ITEM_TEST_ID);

            // Post Expectations
            expect(searchLinkItem).toHaveAttribute(
                'aria-label',
                'קישור לדף חיפוש נדל"ן'
            );
        });

        it('should contain a single link child element which set to lead to the search page', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const searchLinkItem = screen.getByTestId(SEARCH_LINK_ITEM_TEST_ID);
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
            const searchLinkItem = screen.getByTestId(SEARCH_LINK_ITEM_TEST_ID);
            const searchLink = searchLinkItem.firstElementChild;

            // Actions
            await user.click(searchLink as HTMLElement);

            // Post Expectations
            expect(window.location.pathname).toBe('/search');
        });
    });

    describe('when looking at the about link', () => {
        it('should first be in the document', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const aboutLinkItem = screen.getByTestId(ABOUT_LINK_ITEM_TEST_ID);

            // Post Expectations
            expect(aboutLinkItem).toBeInTheDocument();
        });

        it('should be a child of the Cta list', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const list = screen.getByTestId(LINKS_LIST_TEST_ID);
            const aboutLinkItem = screen.getByTestId(ABOUT_LINK_ITEM_TEST_ID);

            // Post Expectations
            expect(list).toContainElement(aboutLinkItem);
        });

        it('should render it with the correct accessibility attributes', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const aboutLinkItem = screen.getByTestId(ABOUT_LINK_ITEM_TEST_ID);

            // Post Expectations
            expect(aboutLinkItem).toHaveAttribute(
                'aria-label',
                'קישור לדף אודות'
            );
        });

        it('should contain a single link child element which set to lead to the about page', () => {
            // Setup
            render(
                <Router>
                    <Cta />
                </Router>
            );
            const aboutLinkItem = screen.getByTestId(ABOUT_LINK_ITEM_TEST_ID);
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
            const aboutLinkItem = screen.getByTestId(ABOUT_LINK_ITEM_TEST_ID);
            const aboutLink = aboutLinkItem.firstElementChild;

            // Actions
            await user.click(aboutLink as HTMLElement);

            // Post Expectations
            expect(window.location.pathname).toBe('/about');
        });
    });
});
