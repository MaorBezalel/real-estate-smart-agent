import { TEST_ID } from '../../src/common/data/constants/testIds';

describe('About Page', () => {
    it('is able to visit the about page', () => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:5173/about');
    });

    context('page heading', () => {
        const pageHeadingTestId = `[data-testid="${TEST_ID.COMMON.PAGE_HEADING.ABOUT_PAGE}"]`;

        beforeEach(() => {
            cy.viewport(1920, 1080);
            cy.visit('http://localhost:5173/about');
        });

        it('appears on the screen', () => {
            cy.get(pageHeadingTestId).should('exist');
            cy.get(pageHeadingTestId).should('be.visible');
        });

        it('displays the correct text', () => {
            cy.get(pageHeadingTestId).should('have.text', 'אודות הפרויקט:');
        });

        it('displays the correct colors', () => {
            cy.get(pageHeadingTestId).should('have.class', 'text-primary');
        });
    });

    context('illustration', () => {
        const illustrationTestId = `[data-testid="${TEST_ID.COMMON.ILLUSTRATION.ABOUT_PAGE}"]`;

        beforeEach(() => {
            cy.viewport(1920, 1080);
            cy.visit('http://localhost:5173/about');
        });

        it('appear on the screen', () => {
            cy.get(illustrationTestId).should('exist');
            cy.get(illustrationTestId).should('be.visible');
        });
    });

    context('content', () => {
        const contentTestId = `[data-testid="${TEST_ID.COMMON.CONTENT.ABOUT_PAGE}"]`;

        beforeEach(() => {
            cy.viewport(1920, 1080);
            cy.visit('http://localhost:5173/about');
        });

        it('appears on the screen', () => {
            cy.get(contentTestId).should('exist');
            cy.get(contentTestId).should('be.visible');
        });

        it('displays 3 sections with a title and a paragraph in each', () => {
            cy.get(contentTestId)
                .should('have.length', 3)
                .each(($section) => {
                    cy.wrap($section).should('have.descendants', 'h2').and('have.descendants', 'p');
                    cy.wrap($section).find('h2').should('have.length', 1);
                    cy.wrap($section).find('p').should('have.length', 1);
                });
        });

        it('displays the correct text in the title and paragraph of each section', () => {
            cy.get(contentTestId).each(($section, index) => {
                switch (index) {
                    case 0:
                        cy.wrap($section).find('h2').should('have.text', 'מהי מטרת הפרויקט?');
                        cy.wrap($section)
                            .find('p')
                            .should(
                                'have.text',
                                'מטרת הפרויקט היא לפשט את תהליך חיפוש נכסי נדל"ן למכירה או להשכרה מאתר יד2.'
                            );
                        break;
                    case 1:
                        cy.wrap($section).find('h2').should('have.text', 'מי עומד מאחורי הפרויקט?');
                        cy.wrap($section)
                            .find('p')
                            .should('have.text', 'הפרויקט נבנה ועוצב על ידי מאור בצלאל למטרות למידה והדגמת ידע מעשי.');
                        break;
                    case 2:
                        cy.wrap($section).find('h2').should('have.text', 'איך זה עובד?');
                        cy.wrap($section)
                            .find('p')
                            .should(
                                'have.text',
                                "\n            הסוכן מבקש מהמשתמש להגדיר פרמטרים לחיפוש סוג מסוים של נכס כגון: מספר חדרים, מחיר,\n            וכו'. כאשר נבחר סוג נכס לחיפוש, מתבצע מאחורי הקלעים תהליך של Web Scraping באתר יד2\n            כדי להשיג את המידע המבוקש, ולאחר עיבדו המידע מוחזר למשתמש ומוצג עבורו בצורה נוחה\n            וידידותית. למשתמשים יש גם אפשרות לנווט לעמוד המידע הספציפי של כל נכס באתר יד2 עצמו.\n            המידע מתעדכן בזמן אמת ללא צורך בריענון הדפדפן, תכונה שאינה קיימת כלל באתר יד2.\n            "
                            );
                        break;
                    default:
                        break;
                }
            });
        });

        it('displays the correct colors', () => {
            cy.get(contentTestId).each(($section) => {
                cy.wrap($section).find('h2').should('have.class', 'text-secondary');
                cy.wrap($section).find('p').should('have.class', 'text-text');
            });
        });
    });
});
