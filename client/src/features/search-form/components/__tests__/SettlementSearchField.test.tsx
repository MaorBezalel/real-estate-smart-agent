import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { SettlementSearchField } from '..';

import SearchForm from './__mocks__/SearchForm.mock';
import { SearchFormContext } from '../../contexts';

import { TEST_ID } from '../../../../common/data/constants/testIds';

describe('SettlementSearchField component', () => {
    describe('when rendered', () => {
        beforeEach(() => {
            renderSettlementSearchField();
        });

        afterEach(() => {
            cleanup();
        });

        it('should render the search input field', () => {
            // Arrange
            const settlementSearchField = getSettlementSearchField();

            // Assert
            expect(settlementSearchField).toBeInTheDocument();
        });

        it('should render the error message of the search input field', () => {
            // Arrange
            const errorMessage = getErrorMessage();

            // Assert
            expect(errorMessage).toBeInTheDocument();
        });

        it('should render the search menu', () => {
            // Arrange
            const searchMenu = getSearchMenu();

            // Assert
            expect(searchMenu).toBeInTheDocument();
        });

        it('should render the search menu items (when the search menu is open)', async () => {
            // Arrange
            const searchInputField = getSettlementSearchField();

            // Act
            fireEvent.focus(searchInputField);
            fireEvent.change(searchInputField, { target: { value: 'א' } });

            // Assert
            await waitFor(() => {
                const searchMenuItems = getSearchMenuItems();
                expect(searchMenuItems.length > 0).toBeTruthy();
            });
        });

        it('should render the SVG icon of the search input field', () => {
            // Arrange
            const svgIcon = getSVGIcon();

            // Assert
            expect(svgIcon).toBeInTheDocument();
        });
    });

    describe('when inspecting the attributes of...', () => {
        describe('the search input field', () => {
            beforeEach(() => {
                renderSettlementSearchField();
            });

            afterEach(() => {
                cleanup();
            });

            it('should have the correct HTML attributes', () => {
                // Arrange
                const actualHTMLAttributes = getSettlementSearchFieldAttributes().html;
                const expectedHTMLAttributes = getExpectedSettlementSearchFieldAttributes(false).html;

                // Assert
                expect(actualHTMLAttributes).toEqual(expectedHTMLAttributes);
            });

            it('should have the correct ARIA attributes', () => {
                // Arrange
                const actualAriaAttributes = getSettlementSearchFieldAttributes().aria;
                const expectedAriaAttributes = getExpectedSettlementSearchFieldAttributes(false).aria;

                // Assert
                expect(actualAriaAttributes).toEqual(expectedAriaAttributes);
            });
        });

        describe('the error message of the search input field', () => {
            beforeEach(() => {
                renderSettlementSearchField();
            });

            afterEach(() => {
                cleanup();
            });

            it('should have the correct HTML attributes', () => {
                // Arrange
                const actualHTMLAttributes = getErrorMessageAttributes().html;
                const expectedHTMLAttributes = getExpectedErrorMessageAttributes(true).html;

                // Assert
                expect(actualHTMLAttributes).toEqual(expectedHTMLAttributes);
            });

            it('should have the correct ARIA attributes', () => {
                // Arrange
                const actualAriaAttributes = getErrorMessageAttributes().aria;
                const expectedAriaAttributes = getExpectedErrorMessageAttributes(true).aria;

                // Assert
                expect(actualAriaAttributes).toEqual(expectedAriaAttributes);
            });
        });

        describe('the search menu', () => {
            beforeEach(() => {
                renderSettlementSearchField();
            });

            afterEach(() => {
                cleanup();
            });

            it('should have the correct HTML attributes', () => {
                // Arrange
                const actualHTMLAttributes = getSearchMenuAttributes().html;
                const expectedHTMLAttributes = getExpectedSearchMenuAttributes(true).html;

                // Assert
                expect(actualHTMLAttributes).toEqual(expectedHTMLAttributes);
            });

            it('should have the correct ARIA attributes', () => {
                // Arrange
                const actualAriaAttributes = getSearchMenuAttributes().aria;
                const expectedAriaAttributes = getExpectedSearchMenuAttributes(true).aria;

                // Assert
                expect(actualAriaAttributes).toEqual(expectedAriaAttributes);
            });
        });
    });

    describe('when focusing on the search input field', () => {
        beforeEach(() => {
            renderSettlementSearchField();
        });

        afterEach(() => {
            cleanup();
        });

        it('should not open the search menu if the search input field is empty', async () => {
            // Arrange
            const searchInputField = getSettlementSearchField();
            const searchMenu = getSearchMenu();

            // Act
            fireEvent.change(searchInputField, { target: { value: '' } });
            fireEvent.focus(searchInputField);

            // Assert
            await waitFor(() => expect(searchMenu).toHaveAttribute('aria-hidden', 'true'));
        });

        it('should open the search menu if the search input field is not empty', async () => {
            // Arrange
            const searchInputField = getSettlementSearchField();
            const searchMenu = getSearchMenu();

            // Act
            fireEvent.change(searchInputField, { target: { value: 'א' } });
            fireEvent.focus(searchInputField);

            // Assert
            await waitFor(() => expect(searchMenu).toHaveAttribute('aria-hidden', 'false'));
        });

        it('should handle both of the above cases', async () => {
            // Arrange
            const searchInputField = getSettlementSearchField();
            const searchMenu = getSearchMenu();

            // Act & Assert 1 - closed search menu
            fireEvent.change(searchInputField, { target: { value: '' } });
            fireEvent.focus(searchInputField);
            await waitFor(() => expect(searchMenu).toHaveAttribute('aria-hidden', 'true'));

            // Act & Assert 2 - open search menu (already focused)
            fireEvent.change(searchInputField, { target: { value: 'א' } });
            await waitFor(() => expect(searchMenu).toHaveAttribute('aria-hidden', 'false'));
        });
    });

    describe('when blurring from the search input field', () => {
        beforeEach(() => {
            renderSettlementSearchField();
        });

        afterEach(() => {
            cleanup();
        });

        it('should close the search menu', async () => {
            // Arrange
            const searchInputField = getSettlementSearchField();
            const searchMenu = getSearchMenu();

            // Act & Assert 1 - open search menu
            fireEvent.change(searchInputField, { target: { value: 'א' } });
            fireEvent.focus(searchInputField);
            await waitFor(() => expect(searchMenu).toHaveAttribute('aria-hidden', 'false'));

            // Act & Assert 2 - close search menu - initiate blur (already focused)
            fireEvent.blur(searchInputField);
            await waitFor(() => expect(searchMenu).toHaveAttribute('aria-hidden', 'true'));
        });
    });

    describe('when picking an option from the search menu', () => {
        it('should set the value of the search input field to the selected option', async () => {
            // Arrange
            renderSettlementSearchField();
            const searchInputField = getSettlementSearchField();

            // Act & Assert 1 - open search menu
            fireEvent.change(searchInputField, { target: { value: 'א' } });
            fireEvent.focus(searchInputField);
            await waitFor(() => expect(getSearchMenuItems().length > 0).toBeTruthy());

            // Act & Assert 2 - pick an option
            const selectedOption = getSearchMenuItems()[0];
            fireEvent.click(selectedOption);
            expect(searchInputField.value).toBe(selectedOption.textContent);
        });

        it('should close the search menu', async () => {
            // Arrange
            renderSettlementSearchField();
            const searchInputField = getSettlementSearchField();
            const searchMenu = getSearchMenu();

            // Act & Assert 1 - open search menu
            fireEvent.change(searchInputField, { target: { value: 'א' } });
            fireEvent.focus(searchInputField);
            await waitFor(() => expect(searchMenu).toHaveAttribute('aria-hidden', 'false'));

            // Act & Assert 2 - pick an option
            const selectedOption = getSearchMenuItems()[0];
            fireEvent.click(selectedOption);
            await waitFor(() => expect(searchMenu).toHaveAttribute('aria-hidden', 'true'));
        });
    });

    describe('when entering a search query and submitting the form', () => {
        beforeEach(() => {
            renderSettlementSearchField();
        });

        afterEach(() => {
            cleanup();
        });

        it('should trigger an error message if the search input field is empty', async () => {
            // Arrange
            const searchInputField = getSettlementSearchField();
            const errorMessage = getErrorMessage();
            const searchForm = searchInputField.closest('form') as HTMLFormElement;

            // Act & Assert 1 - submit the form with an empty search input field
            fireEvent.change(searchInputField, { target: { value: '' } });
            fireEvent.submit(searchForm);
            await waitFor(() => {
                expect(searchInputField).toHaveAttribute('aria-invalid', 'true');
                expect(searchInputField).toHaveAccessibleErrorMessage();
                expect(errorMessage).toHaveAttribute('aria-hidden', 'false');
                expect(errorMessage).toHaveTextContent('שדה חובה');
            });
        });

        it('should trigger an error message if the search input field contains invalid characters', async () => {
            // Arrange
            const searchInputField = getSettlementSearchField();
            const errorMessage = getErrorMessage();
            const searchForm = searchInputField.closest('form') as HTMLFormElement;

            // Act & Assert 1 - submit the form with English characters
            fireEvent.change(searchInputField, { target: { value: 'afsd' } });
            fireEvent.submit(searchForm);
            await waitFor(() => {
                expect(searchInputField).toHaveAttribute('aria-invalid', 'true');
                expect(searchInputField).toHaveAccessibleErrorMessage();
                expect(errorMessage).toHaveAttribute('aria-hidden', 'false');
                expect(errorMessage).toHaveTextContent('הכנס אותיות בעברית בלבד');
            });

            // Act & Assert 2 - submit the form with numbers
            fireEvent.change(searchInputField, { target: { value: '1234' } });
            fireEvent.submit(searchForm);
            await waitFor(() => {
                expect(searchInputField).toHaveAttribute('aria-invalid', 'true');
                expect(searchInputField).toHaveAccessibleErrorMessage();
                expect(errorMessage).toHaveAttribute('aria-hidden', 'false');
                expect(errorMessage).toHaveTextContent('הכנס אותיות בעברית בלבד');
            });
        });

        it('should not trigger an error message if the search input field contains valid characters', async () => {
            // Arrange
            const searchInputField = getSettlementSearchField();
            const errorMessage = getErrorMessage();
            const searchForm = searchInputField.closest('form') as HTMLFormElement;

            // Act & Assert 1 - submit the form with Hebrew characters
            fireEvent.change(searchInputField, { target: { value: 'אבגד' } });
            fireEvent.submit(searchForm);
            await waitFor(() => {
                expect(searchInputField).toHaveAttribute('aria-invalid', 'false');
                expect(errorMessage).toHaveAttribute('aria-hidden', 'true');
            });

            // Act & Assert 2 - submit the form with hebrew characters and a hyphen (-) and a space ( )
            fireEvent.change(searchInputField, { target: { value: 'תל אביב - יפו' } });
            fireEvent.submit(searchForm);
            await waitFor(() => {
                expect(searchInputField).toHaveAttribute('aria-invalid', 'false');
                expect(errorMessage).toHaveAttribute('aria-hidden', 'true');
            });
        });
    });
});

// --------------------------------------Test-Helpers--------------------------------------
function renderSettlementSearchField() {
    render(
        <SearchFormContext>
            <SearchForm>
                <SettlementSearchField />
            </SearchForm>
        </SearchFormContext>
    );
}

// ---------------------------Settlement-Search-Field---------------------------
const getSettlementSearchField = () => {
    return screen.getByTestId(
        TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.INPUT
    ) as HTMLInputElement;
};
const getSettlementSearchFieldAttributes = () => {
    const settlementSearchField = getSettlementSearchField();
    return {
        html: {
            id: settlementSearchField.id,
            type: settlementSearchField.type,
            inputMode: settlementSearchField.inputMode,
            autoComplete: settlementSearchField.autocomplete,
            placeholder: settlementSearchField.placeholder,
        },
        aria: {
            invalid: settlementSearchField.getAttribute('aria-invalid'),
            required: settlementSearchField.getAttribute('aria-required'),
            label: settlementSearchField.getAttribute('aria-label'),
            placeholder: settlementSearchField.getAttribute('aria-placeholder'),
            errormessage: settlementSearchField.getAttribute('aria-errormessage'),
        },
    };
};
const getExpectedSettlementSearchFieldAttributes = (isInvalid: boolean) => {
    return {
        html: {
            id: 'settlement',
            type: 'text',
            inputMode: 'search',
            autoComplete: 'off',
            placeholder: 'יישוב...',
        },
        aria: {
            invalid: isInvalid.toString(),
            required: 'true',
            label: 'הכנס שם של יישוב',
            placeholder: 'יישוב...',
            errormessage: 'settlement-search-field-error-message',
        },
    };
};
// --------------------------------------------------------------------------------

// ---------------------------Settlement-Search-Field-Error-Message---------------------------
const getErrorMessage = () => {
    return screen.getByTestId(TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.ERROR_MESSAGE);
};
const getErrorMessageAttributes = () => {
    const errorMessage = getErrorMessage();

    return {
        html: {
            id: errorMessage.id,
            role: errorMessage.getAttribute('role'),
        },
        aria: {
            hidden: errorMessage.getAttribute('aria-hidden'),
        },
    };
};
const getExpectedErrorMessageAttributes = (isHidden: boolean) => {
    return {
        html: {
            id: 'settlement-search-field-error-message',
            role: 'alert',
        },
        aria: {
            hidden: isHidden.toString(),
        },
    };
};
// --------------------------------------------------------------------------------

// ---------------------------Settlement-Search-Menu---------------------------
const getSearchMenu = () => {
    return screen.getByTestId(
        TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.MENU
    ) as HTMLMenuElement;
};
const getSearchMenuAttributes = () => {
    const searchMenu = getSearchMenu();

    return {
        html: {
            id: searchMenu.id,
        },
        aria: {
            hidden: searchMenu.getAttribute('aria-hidden'),
        },
    };
};
const getExpectedSearchMenuAttributes = (isHidden: boolean) => {
    return {
        html: {
            id: 'settlement-search-menu',
        },
        aria: {
            hidden: isHidden.toString(),
        },
    };
};
const getSearchMenuItems = () => {
    return screen.getAllByTestId(
        TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.MENU_ITEM
    ) as HTMLButtonElement[];
};
// --------------------------------------------------------------------------------------

// ---------------------------Settlement-Search-Field-SVG-Icon---------------------------
const getSVGIcon = () => {
    return screen.getByTestId(TEST_ID.FEATURE.SEARCH_FORM.SETTLEMENT_SEARCH_FIELD.SVG_ICON);
};
// --------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
