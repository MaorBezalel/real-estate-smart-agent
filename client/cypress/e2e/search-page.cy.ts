import { TEST_ID } from '../../src/common/data/constants/testIds';

describe('Search Page', () => {
    it('is able to visit the search page', () => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:5173/search');
    });

    context('page heading', () => {
        const pageHeadingTestId = `[data-testid="${TEST_ID.COMMON.PAGE_HEADING.SEARCH_PAGE}"]`;

        beforeEach(() => {
            cy.viewport(1920, 1080);
            cy.visit('http://localhost:5173/search');
        });

        it('appears on the screen', () => {
            cy.get(pageHeadingTestId).should('exist');
            cy.get(pageHeadingTestId).should('be.visible');
        });

        it('displays the correct text', () => {
            cy.get(pageHeadingTestId).should('have.text', 'חיפוש נדל"ן:');
        });

        it('displays the correct colors', () => {
            cy.get(pageHeadingTestId).should('have.class', 'text-primary');
        });
    });

    context('search form', () => {
        const searchFormTestId = `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.FORM}"]`;
        const formButtonTestId = {
            inactive: `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.FORM_BUTTON.INACTIVE}"]`,
            active: `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.FORM_BUTTON.ACTIVE}"]`,
            loading: `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.FORM_BUTTON.LOADING}"]`,
        };

        beforeEach(() => {
            cy.viewport(1920, 1080);
            cy.visit('http://localhost:5173/search');
        });

        it('appears on the screen', () => {
            cy.get(searchFormTestId).should('exist');
            cy.get(searchFormTestId).should('be.visible');
        });

        it('cotains 1 select field, 3 input fields, and 1 button', () => {
            cy.get(searchFormTestId).find('select').should('have.length', 1);
            cy.get(searchFormTestId).find('input').should('have.length', 3);
            cy.get(searchFormTestId).find('button').should('have.length', 1);
        });

        context('deal type select field', () => {
            const dealTypeSelectFieldTestId = `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.SELECT}"]`;
            const dealTypeSelectFieldErrorMessageTestId = `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.ERROR_MESSAGE}"]`;

            it('appears on the screen', () => {
                cy.get(dealTypeSelectFieldTestId).should('exist');
                cy.get(dealTypeSelectFieldTestId).should('be.visible');
            });

            it('contains 3 options - 1 hidden and 2 visible', () => {
                cy.get(dealTypeSelectFieldTestId).find('option').should('have.length', 3);

                cy.get(dealTypeSelectFieldTestId).find('option').eq(0).should('have.attr', 'hidden');
                cy.get(dealTypeSelectFieldTestId).find('option').eq(1).should('not.have.attr', 'hidden');
                cy.get(dealTypeSelectFieldTestId).find('option').eq(2).should('not.have.attr', 'hidden');
            });

            it('displays the correct text in each option', () => {
                cy.get(dealTypeSelectFieldTestId).find('option').eq(0).should('have.text', 'נכס ל...');
                cy.get(dealTypeSelectFieldTestId).find('option').eq(1).should('have.text', 'מכירה');
                cy.get(dealTypeSelectFieldTestId).find('option').eq(2).should('have.text', 'השכרה');
            });

            it('allows the user to select an option', () => {
                cy.get(dealTypeSelectFieldTestId).select('מכירה').should('have.value', 'forsale');
                cy.get(dealTypeSelectFieldTestId).select('השכרה').should('have.value', 'rent');
            });

            it('displays an error message when the form is submitted without selecting an option and hides it when an option is selected', () => {
                cy.get(dealTypeSelectFieldErrorMessageTestId).should('not.be.visible');

                cy.get(formButtonTestId.inactive).click();
                cy.get(dealTypeSelectFieldErrorMessageTestId).should('be.visible');
                cy.get(dealTypeSelectFieldErrorMessageTestId).should('have.text', 'שדה חובה');

                cy.get(dealTypeSelectFieldTestId).select('מכירה');
                cy.get(dealTypeSelectFieldErrorMessageTestId).should('not.be.visible');

                cy.get(dealTypeSelectFieldTestId).select('השכרה');
                cy.get(dealTypeSelectFieldErrorMessageTestId).should('not.be.visible');

                cy.get(formButtonTestId.inactive).click();
                cy.get(dealTypeSelectFieldErrorMessageTestId).should('not.be.visible');
            });
        });

        context('settlement search field', () => {
            const settlementSearchFieldTestId = `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.INPUT}"]`;
            const settlementSearchFieldErrorMessageTestId = `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.ERROR_MESSAGE}"]`;
            const settlementSearchFieldMenuTestId = `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.MENU}"]`;
            const settlementSearchFieldMenuItemTestId = `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.MENU_ITEM}"]`;

            it('appears on the screen', () => {
                cy.get(settlementSearchFieldTestId).should('exist');
                cy.get(settlementSearchFieldTestId).should('be.visible');
            });

            it('allows the user to type a settlement name', () => {
                cy.get(settlementSearchFieldTestId).type('אשדוד').should('have.value', 'אשדוד');
            });

            it('displays a menu with settlement names that match the user input (if there are any)', () => {
                cy.get(settlementSearchFieldMenuTestId).should('not.be.visible');

                cy.get(settlementSearchFieldTestId).type('חול');
                cy.get(settlementSearchFieldMenuTestId).should('be.visible');
                cy.get(settlementSearchFieldMenuItemTestId).should('have.length.lte', 5);
                cy.get(settlementSearchFieldMenuItemTestId).each(($menuItem) => {
                    cy.wrap($menuItem).should('contain.text', 'חול');
                });

                cy.get(settlementSearchFieldTestId).type('חולולולול');
                cy.get(settlementSearchFieldMenuTestId).should('not.be.visible');
            });

            it('allows the user to select a settlement name from the menu for autocomplete', () => {
                cy.get(settlementSearchFieldTestId).type('חול');
                cy.get(settlementSearchFieldMenuTestId).should('be.visible');
                cy.get(settlementSearchFieldMenuItemTestId).should('have.length.lte', 5);

                cy.get(settlementSearchFieldMenuItemTestId)
                    .first()
                    .then(($menuItem) => {
                        const selectedSettlementName = $menuItem.text();
                        cy.wrap($menuItem).click();
                        cy.get(settlementSearchFieldTestId).should('have.value', selectedSettlementName);
                    });

                cy.get(settlementSearchFieldMenuTestId).should('not.be.visible');
            });

            it('displays an error message when the form is submitted without typing a settlement name and hides it when a settlement name is typed', () => {
                cy.get(settlementSearchFieldErrorMessageTestId).should('not.be.visible');

                cy.get(formButtonTestId.inactive).click();
                cy.get(settlementSearchFieldErrorMessageTestId).should('be.visible');
                cy.get(settlementSearchFieldErrorMessageTestId).should('have.text', 'שדה חובה');

                cy.get(settlementSearchFieldTestId).type('אשדוד');
                cy.get(settlementSearchFieldErrorMessageTestId).should('not.be.visible');

                cy.get(formButtonTestId.inactive).click();
                cy.get(settlementSearchFieldErrorMessageTestId).should('not.be.visible');
            });

            it('displays an error message when the form is submitted with a non-hebrew settlement name and hides it when a hebrew settlement name is typed', () => {
                cy.get(settlementSearchFieldErrorMessageTestId).should('not.be.visible');

                cy.get(settlementSearchFieldTestId).type('a');
                cy.get(formButtonTestId.inactive).click();
                cy.get(settlementSearchFieldErrorMessageTestId).should('be.visible');
                cy.get(settlementSearchFieldErrorMessageTestId).should('have.text', 'הכנס אותיות בעברית בלבד');

                cy.get(settlementSearchFieldTestId).type('{backspace}אשדוד');
                cy.get(settlementSearchFieldErrorMessageTestId).should('not.be.visible');

                cy.get(formButtonTestId.inactive).click();
                cy.get(settlementSearchFieldErrorMessageTestId).should('not.be.visible');
            });
        });

        context('price input fields', () => {
            const priceInputFieldTestId = {
                minPrice: {
                    input: `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MIN_PRICE.INPUT}"]`,
                    errorMessage: `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MIN_PRICE.ERROR_MESSAGE}"]`,
                },
                maxPrice: {
                    input: `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MAX_PRICE.INPUT}"]`,
                    errorMessage: `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MAX_PRICE.ERROR_MESSAGE}"]`,
                },
            };
            const they = it;

            they('appear on the screen', () => {
                cy.get(priceInputFieldTestId.minPrice.input).should('exist');
                cy.get(priceInputFieldTestId.minPrice.input).should('be.visible');
                cy.get(priceInputFieldTestId.maxPrice.input).should('exist');
                cy.get(priceInputFieldTestId.maxPrice.input).should('be.visible');
            });

            they('allow the user to type a number', () => {
                cy.get(priceInputFieldTestId.minPrice.input).type('100').should('have.value', '100');
                cy.get(priceInputFieldTestId.maxPrice.input).type('100').should('have.value', '100');
            });

            they('format the typed number with commas for every 4 digits', () => {
                cy.get(priceInputFieldTestId.minPrice.input).type('1000000').should('have.value', '1,000,000');
                cy.get(priceInputFieldTestId.minPrice.input).type('{backspace}').should('have.value', '100,000');
                cy.get(priceInputFieldTestId.minPrice.input)
                    .type('{backspace}{backspace}{backspace}')
                    .should('have.value', '100');

                cy.get(priceInputFieldTestId.maxPrice.input).type('1000000').should('have.value', '1,000,000');
                cy.get(priceInputFieldTestId.maxPrice.input).type('{backspace}').should('have.value', '100,000');
                cy.get(priceInputFieldTestId.maxPrice.input)
                    .type('{backspace}{backspace}{backspace}')
                    .should('have.value', '100');
            });

            they('only allow the user to type positive integers', () => {
                cy.get(priceInputFieldTestId.minPrice.input).type('aא!e,-').should('have.value', '');
                cy.get(priceInputFieldTestId.minPrice.input).type('01').should('have.value', '0').type('{backspace}'); // 01 is not a valid number
                cy.get(priceInputFieldTestId.minPrice.input)
                    .type('1.1')
                    .should('have.value', '11')
                    .type('{backspace}{backspace}');
                cy.get(priceInputFieldTestId.minPrice.input)
                    .type('aa111aa')
                    .should('have.value', '111')
                    .type('{backspace}{backspace}{backspace}');

                cy.get(priceInputFieldTestId.maxPrice.input).type('aא!e,-').should('have.value', '');
                cy.get(priceInputFieldTestId.maxPrice.input).type('01').should('have.value', '0').type('{backspace}'); // 01 is not a valid number
                cy.get(priceInputFieldTestId.maxPrice.input)
                    .type('1.1')
                    .should('have.value', '11')
                    .type('{backspace}{backspace}');
                cy.get(priceInputFieldTestId.maxPrice.input)
                    .type('aa111aa')
                    .should('have.value', '111')
                    .type('{backspace}{backspace}{backspace}');
            });

            they('display an error message when the form is submitted without typing a number', () => {
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('not.be.visible');

                cy.get(formButtonTestId.inactive).click();
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('be.visible');
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('have.text', 'שדה חובה');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('have.text', 'שדה חובה');

                cy.get(priceInputFieldTestId.minPrice.input).type('100');
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('have.text', 'שדה חובה');

                cy.get(priceInputFieldTestId.maxPrice.input).type('100');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('not.be.visible');

                cy.get(formButtonTestId.inactive).click();
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('not.be.visible');
            });

            they('display an error message when the form is submitted the min price is greater than the max price', () => {
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('not.be.visible');

                cy.get(priceInputFieldTestId.minPrice.input).type('100');
                cy.get(priceInputFieldTestId.maxPrice.input).type('99');
                cy.get(formButtonTestId.inactive).click();
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('be.visible');
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should(
                    'have.text',
                    'מחיר מינימלי חייב להיות נמוך ממחיר מקסימלי'
                );
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should(
                    'have.text',
                    'מחיר מקסימלי חייב להיות גבוה ממחיר מינימלי'
                );

                cy.get(priceInputFieldTestId.minPrice.input).type('{backspace}'); // now the min price is 10 and the max price is 99
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('not.be.visible');

                cy.get(priceInputFieldTestId.maxPrice.input).type('{backspace}'); // now the min price is 10 and the max price is 9
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('be.visible');
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should(
                    'have.text',
                    'מחיר מינימלי חייב להיות נמוך ממחיר מקסימלי'
                );
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should(
                    'have.text',
                    'מחיר מקסימלי חייב להיות גבוה ממחיר מינימלי'
                );

                cy.get(priceInputFieldTestId.minPrice.input).type('{backspace}'); // now the min price is 1 and the max price is 9
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('not.be.visible');

                cy.get(formButtonTestId.inactive).click();
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('not.be.visible');
            });

            they('diplay an error when the form is submitted and the prices are greater than 1,000,000,000', () => {
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('not.be.visible');

                cy.get(priceInputFieldTestId.minPrice.input).type('1000000001');
                cy.get(priceInputFieldTestId.maxPrice.input).type('1000000001');

                cy.get(formButtonTestId.inactive).click();
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('be.visible');
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should(
                    'have.text',
                    'מחיר אינו יכול להיות גבוה מ-1,000,000,000 ₪'
                );
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should(
                    'have.text',
                    'מחיר אינו יכול להיות גבוה מ-1,000,000,000 ₪'
                );

                cy.get(priceInputFieldTestId.minPrice.input).type('{backspace}0');
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');

                cy.get(priceInputFieldTestId.maxPrice.input).type('{backspace}0');
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');

                cy.get(formButtonTestId.inactive).click();
                cy.get(priceInputFieldTestId.minPrice.errorMessage).should('not.be.visible');
                cy.get(priceInputFieldTestId.maxPrice.errorMessage).should('not.be.visible');
            });
        });
    });

    context('failed results', () => {
        const failedResultsTestId = {
            content: `[data-testid="${TEST_ID.COMMON.CONTENT.FAILED_RESULTS}"]`,
            illustration: `[data-testid="${TEST_ID.COMMON.ILLUSTRATION.FAILED_RESULTS}"]`,
        };

        beforeEach(() => {
            cy.viewport(1920, 1080);

            // a search that is guaranteed to fail
            cy.visit(
                'http://localhost:5173/search?dealType=forsale&settlement=%D7%97%D7%95%D7%9C%D7%95%D7%9F&minPrice=1000000&maxPrice=2000000&page=1000000'
            );
        });

        it('appears on the screen with the correct text', () => {
            cy.get(failedResultsTestId.content, { timeout: 1000 * 60 * 2 }).should('exist'); // 2 minutes
            cy.get(failedResultsTestId.content).should('be.visible');

            cy.get(failedResultsTestId.illustration).should('exist');
            cy.get(failedResultsTestId.illustration).should('be.visible');

            cy.get(failedResultsTestId.content).find('h2').should('have.text', 'אין תוצאות זמינות כרגע!');

            const expectedParagraphs = [
                'הסוכן החכם ברגעים אלה ממשיך עדיין לחפש אחר התוצאות שהוזנו.',
                'במידה והסוכן החכם ימצא תוצאות חדשות, הן יופיעו כאן.',
                'ניתן להמתין או לנסות שוב מאוחר יותר.',
            ];
            cy.get(failedResultsTestId.content)
                .find('p')
                .each(($paragraph, index) => {
                    cy.wrap($paragraph).should('have.text', expectedParagraphs[index]);
                });
        });
    });

    context('loading results', () => {
        const loadingResultsTestId = {
            content: `[data-testid="${TEST_ID.COMMON.CONTENT.LOADING_RESULTS}"]`,
            illustration: `[data-testid="${TEST_ID.COMMON.ILLUSTRATION.LOADING_RESULTS}"]`,
        };

        beforeEach(() => {
            cy.viewport(1920, 1080);

            // a search that is guaranteed to take a long time
            cy.visit(
                'http://localhost:5173/search?dealType=forsale&settlement=%D7%97%D7%95%D7%9C%D7%95%D7%9F&minPrice=1000000&maxPrice=2000000&page=1000000'
            );
        });

        it('appears on the screen with the correct text', () => {
            cy.get(loadingResultsTestId.illustration).should('exist');
            cy.get(loadingResultsTestId.illustration).should('be.visible');

            cy.get(loadingResultsTestId.content, { timeout: 1000 * 10 }).should('exist'); // 10 seconds
            cy.get(loadingResultsTestId.content).should('exist');
            cy.get(loadingResultsTestId.content).should('be.visible');

            cy.get(loadingResultsTestId.content).find('h2').should('have.text', 'הערה לאנשי תוכנה:');

            cy.get(loadingResultsTestId.content)
                .find('p')
                .should('have.length', 1)
                .and(
                    'have.text',
                    'החיפוש בהתחלה עלול להימשך עד כדקה בגלל ששרת ה-backend של הפרויקט יושב על השרתים החינמיים של render.com ולשרתים האלה יש idle policy.'
                );
        });

        it('allows the user to navigate to `render.com` site and idle policy page', () => {
            const expectedHrefs = ['https://render.com/', 'https://render.com/docs/free#spinning-down-on-idle'];
            cy.get(loadingResultsTestId.content)
                .find('a', { timeout: 1000 * 10 })
                .should('have.length', 2)
                .each(($link, index) => {
                    cy.wrap($link).should('have.attr', 'href', expectedHrefs[index]);
                });
        });
    });

    context('results', () => {
        const realEstateItemTestId = `[data-testid="${TEST_ID.FEATURE.REAL_ESTATE_ITEM}"]`;
        const resultsControlsTestId = {
            itemCount: `[data-testid="${TEST_ID.FEATURE.RESULTS_CONTROLS.ITEM_COUNT}"]`,
            sortByDropdownMenu: `[data-testid="${TEST_ID.FEATURE.RESULTS_CONTROLS.SORT_BY_DROPDOWN_MENU}"]`,
        };
        const formButtonTestId = {
            inactive: `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.FORM_BUTTON.INACTIVE}"]`,
            active: `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.FORM_BUTTON.ACTIVE}"]`,
            loading: `[data-testid="${TEST_ID.FEATURE.SEARCH_FORM.FORM_BUTTON.LOADING}"]`,
        };
        const they = it;

        beforeEach(() => {
            cy.viewport(1920, 1080);

            // a search that is guaranteed to succeed
            cy.visit(
                'http://localhost:5173/search?dealType=forsale&settlement=%D7%97%D7%95%D7%9C%D7%95%D7%9F&minPrice=1000000&maxPrice=2000000&page=1'
            );
        });

        afterEach(() => {
            cy.get(formButtonTestId.active).click(); // end the search
        });

        they('appear on the screen', () => {
            cy.get(realEstateItemTestId, { timeout: 1000 * 60 * 1.5 }).should('exist'); // 1.5 minutes
            cy.get(realEstateItemTestId).should('be.visible');

            cy.get(resultsControlsTestId.itemCount).should('exist');
            cy.get(resultsControlsTestId.itemCount).should('be.visible');

            cy.get(resultsControlsTestId.sortByDropdownMenu).should('exist');
            cy.get(resultsControlsTestId.sortByDropdownMenu).should('be.visible');
        });

        they('display the correct number of results', () => {
            cy.get(resultsControlsTestId.itemCount, { timeout: 1000 * 60 * 1.5 })
                .find('p')
                .should('have.length', 1)
                .then(($paragraph) => {
                    const expectedReslutsCount = parseInt($paragraph.text());
                    cy.get(realEstateItemTestId).should('have.length', expectedReslutsCount);
                });
        });

        they('can be sorted by date and price', () => {
            cy.get(resultsControlsTestId.sortByDropdownMenu, { timeout: 1000 * 60 * 1.5 })
                .click()
                .find('li>button')
                .should('have.length', 3);

            const expectedOptions = ['לפי תאריך', 'מחיר - מהזול ליקר', 'מחיר - מהיקר לזול'];
            cy.get(resultsControlsTestId.sortByDropdownMenu).within(($menuContainer) => {
                expectedOptions.forEach((option, index) => {
                    cy.get('li>button').eq(index).should('have.text', option).click();
                    cy.wrap($menuContainer).find('button').first().should('have.text', option).click();
                });
            });
        });

        they('can lead to the detailed pages of each of the real estate results', () => {
            cy.get(realEstateItemTestId, { timeout: 1000 * 60 * 1.5 })
                .should('have.length.gte', 1)
                .each(($item) => {
                    cy.wrap($item).should('have.attr', 'href').and('contain', 'https://www.yad2.co.il/item/');
                });
        });
    });
});
