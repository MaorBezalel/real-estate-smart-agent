import { TEST_ID } from '../../src/common/data/constants/testIds';

describe('Home Page', () => {
    it('is able to visit the home page', () => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:5173/');
    });

    context('page heading', () => {
        const pageHeadingTestId = `[data-testid="${TEST_ID.COMMON.PAGE_HEADING.HOME_PAGE}"]`;

        beforeEach(() => {
            cy.viewport(1920, 1080);
            cy.visit('http://localhost:5173/');
        });

        it('displays the page heading', () => {
            cy.get(pageHeadingTestId).should('exist');
        });

        it('displays the correct text', () => {
            cy.get(pageHeadingTestId).should('have.attr', 'alt', 'מצאו בקלות את הנכס המושלם עבורכם!');
        });
    });

    context('illustration', () => {
        const illustrationTestId = `[data-testid="${TEST_ID.COMMON.ILLUSTRATION.HOME_PAGE}"]`;

        beforeEach(() => {
            cy.viewport(1920, 1080);
            cy.visit('http://localhost:5173/');
        });

        it('displays the illustration', () => {
            cy.get(illustrationTestId).should('exist');
        });
    });

    context('cta', () => {
        const ctaTestId = `[data-testid="${TEST_ID.COMMON.CTA.HOME_PAGE}"]`;

        beforeEach(() => {
            cy.viewport(1920, 1080);
            cy.visit('http://localhost:5173/');
        });

        it('displays the cta', () => {
            cy.get(ctaTestId).should('exist');
        });

        it('contain two button-like links', () => {
            cy.get(ctaTestId).find('a').should('have.length', 2);
        });

        context('the rightest button-like link', () => {
            it('displays the correct text', () => {
                cy.get(ctaTestId).find('a').eq(0).should('have.text', 'חיפוש נדל"ן');
            });

            it('displays the correct colors', () => {
                cy.get(ctaTestId).find('a').eq(0).should('have.class', 'bg-primary');
                cy.get(ctaTestId).find('a').eq(0).should('have.class', 'text-background');
                cy.get(ctaTestId).find('a').eq(0).should('have.class', 'border-text');
            });

            it('scales and brightens on hover', () => {
                cy.get(ctaTestId).find('a').eq(0).should('have.class', 'hover:scale-105');
                cy.get(ctaTestId).find('a').eq(0).should('have.class', 'hover:brightness-110');
            });

            it('redirects to the search page', () => {
                cy.get(ctaTestId).find('a').eq(0).should('have.attr', 'href', '/search');
                cy.get(ctaTestId).find('a').eq(0).click();
                cy.url().should('include', '/search');
            });
        });

        context('the leftest button-like link', () => {
            it('displays the correct text', () => {
                cy.get(ctaTestId).find('a').eq(1).should('have.text', 'אודות');
            });

            it('displays the correct colors', () => {
                cy.get(ctaTestId).find('a').eq(1).should('have.class', 'bg-secondary');
                cy.get(ctaTestId).find('a').eq(1).should('have.class', 'text-text');
                cy.get(ctaTestId).find('a').eq(1).should('have.class', 'border-text');
            });

            it('scales and brightens on hover', () => {
                cy.get(ctaTestId).find('a').eq(1).should('have.class', 'hover:scale-105');
                cy.get(ctaTestId).find('a').eq(1).should('have.class', 'hover:brightness-110');
            });

            it('redirects to the about page', () => {
                cy.get(ctaTestId).find('a').eq(1).should('have.attr', 'href', '/about');
                cy.get(ctaTestId).find('a').eq(1).click();
                cy.url().should('include', '/about');
            });
        });
    });
});
