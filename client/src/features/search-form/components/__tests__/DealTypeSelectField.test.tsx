import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { DealTypeSelectField } from '..';

import SearchForm from './__mocks__/SearchForm.mock';
import { SearchFormContext } from '../../contexts';

import { TEST_ID } from '../../../../common/data/constants/testIds';

describe('DealTypeSelectField component', () => {
    describe('when rendered', () => {
        beforeEach(() => {
            renderDealTypeSelectField();
        });

        afterEach(() => {
            cleanup();
        });

        it('should render a select field element', () => {
            // Arrange
            const selectField = getSelectField();

            // Assert
            expect(selectField).toBeInTheDocument();
        });

        it('should render all the option elements of the select field element', () => {
            // Arrange
            const optionElements = getAllOptionElements();

            // Assert
            expect(optionElements).toHaveLength(3);
        });

        it('should render the error message element of the select field element', () => {
            // Arrange
            const errorMessage = getErrorMessage();

            // Assert
            expect(errorMessage).toBeInTheDocument();
        });

        it('should render the SVG icon element of the select field element', () => {
            // Arrange
            const svgIcon = getSVGIconElement();

            // Assert
            expect(svgIcon).toBeInTheDocument();
        });
    });

    describe('when inspecting the attributes of...', () => {
        describe('the select field element', () => {
            beforeEach(() => {
                renderDealTypeSelectField();
            });

            afterEach(() => {
                cleanup();
            });

            it('should have the correct HTML attributes', () => {
                // Arrange
                const selectFieldAttributes = getSelectFieldAttributes();
                const expectedSelectFieldAttributes = getExpectedSelectFieldAttributes(false);

                // Assert
                expect(selectFieldAttributes.html).toEqual(expectedSelectFieldAttributes.html);
            });

            it('should have the correct ARIA attributes', () => {
                // Arrange
                const selectFieldAttributes = getSelectFieldAttributes();
                const expectedSelectFieldAttributes = getExpectedSelectFieldAttributes(false);

                // Assert
                expect(selectFieldAttributes.aria).toEqual(expectedSelectFieldAttributes.aria);
            });
        });

        describe('the error message element', () => {
            beforeEach(() => {
                renderDealTypeSelectField();
            });

            afterEach(() => {
                cleanup();
            });

            it('should have the correct HTML attributes', () => {
                // Arrange
                const errorMessageAttributes = getErrorMessageAttributes();
                const expectedErrorMessageAttributes = getExpectedErrorMessageAttributes(true);

                // Assert
                expect(errorMessageAttributes.html).toEqual(expectedErrorMessageAttributes.html);
            });

            it('...should have the correct ARIA attributes', () => {
                // Arrange
                const errorMessageAttributes = getErrorMessageAttributes();
                const expectedErrorMessageAttributes = getExpectedErrorMessageAttributes(true);

                // Assert
                expect(errorMessageAttributes.aria).toEqual(expectedErrorMessageAttributes.aria);
            });
        });
    });

    describe('when form is submitted', () => {
        describe('when no option has been selected', () => {
            beforeEach(() => {
                renderDealTypeSelectField();
            });

            afterEach(() => {
                cleanup();
            });

            it('should display the error message element', async () => {
                // Arrange
                const selectField = getSelectField();
                const errorMessage = getErrorMessage();
                const form = selectField.closest('form') as HTMLFormElement;

                // Act
                fireEvent.change(selectField, { target: { value: '' } });
                fireEvent.submit(form);

                // Assert
                await waitFor(() => {
                    expect(selectField).toBeInvalid();
                    expect(selectField).toHaveAccessibleErrorMessage();
                    expect(errorMessage).toHaveAttribute('aria-hidden', 'false');
                    expect(errorMessage).toHaveTextContent('שדה חובה');
                });
            });

            it('should have the default element has the selected option', async () => {
                // Arrange
                const selectField = getSelectField();
                const optionElements = getAllOptionElements();
                const form = selectField.closest('form') as HTMLFormElement;

                // Act
                fireEvent.change(selectField, { target: { value: '' } });
                fireEvent.submit(form);

                // Assert
                await waitFor(() => {
                    expect(optionElements[0].selected).toBeTruthy();
                    expect(optionElements[1].selected).toBeFalsy();
                    expect(optionElements[2].selected).toBeFalsy();
                });
            });
        });

        describe('when an option has been selected', () => {
            beforeEach(() => {
                renderDealTypeSelectField();
            });

            afterEach(() => {
                cleanup();
            });

            it('should not display the error message element', async () => {
                // Arrange
                const selectField = getSelectField();
                const errorMessage = getErrorMessage();
                const form = selectField.closest('form') as HTMLFormElement;

                // Act
                fireEvent.change(selectField, { target: { value: 'forsale' } });
                fireEvent.submit(form);

                // Assert
                await waitFor(() => {
                    expect(selectField).toBeValid();
                    expect(errorMessage).toHaveAttribute('aria-hidden', 'true');
                    expect(selectField).not.toHaveAccessibleErrorMessage();
                });
            });

            it('should have the selected option as the selected option', async () => {
                // Arrange
                const selectField = getSelectField();
                const optionElements = getAllOptionElements();
                const form = selectField.closest('form') as HTMLFormElement;

                // Act & Assert 1 - selecting the first option (forsale)
                fireEvent.change(selectField, { target: { value: 'forsale' } });
                fireEvent.submit(form);
                await waitFor(() => {
                    expect(optionElements[0].selected).toBeFalsy();
                    expect(optionElements[1].selected).toBeTruthy();
                    expect(optionElements[2].selected).toBeFalsy();
                });

                // Act & Assert 2 - selecting the second option (rent)
                fireEvent.change(selectField, { target: { value: 'rent' } });
                fireEvent.submit(form);
                await waitFor(() => {
                    expect(optionElements[0].selected).toBeFalsy();
                    expect(optionElements[1].selected).toBeFalsy();
                    expect(optionElements[2].selected).toBeTruthy();
                });
            });
        });
    });
});

// ---------------------------------------Test-Helpers-----------------------------------------
const renderDealTypeSelectField = () => {
    return render(
        <SearchFormContext>
            <SearchForm>
                <DealTypeSelectField />
            </SearchForm>
        </SearchFormContext>
    );
};

// ----------------------------Select-Field-----------------------------
const getSelectField = () => {
    return screen.getByTestId(
        TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.SELECT
    ) as HTMLSelectElement;
};
const getSelectFieldAttributes = () => {
    const selectField = getSelectField();

    return {
        html: {
            id: selectField.id,
            autocomplete: selectField.getAttribute('autocomplete'),
        },
        aria: {
            invalid: selectField.getAttribute('aria-invalid'),
            required: selectField.getAttribute('aria-required'),
            label: selectField.getAttribute('aria-label'),
            placeholder: selectField.getAttribute('aria-placeholder'),
            errormessage: selectField.getAttribute('aria-errormessage'),
        },
    };
};
const getExpectedSelectFieldAttributes = (isInvalid: boolean) => {
    return {
        html: {
            id: 'dealType',
            autocomplete: 'off',
        },
        aria: {
            invalid: isInvalid.toString(),
            required: 'true',
            label: 'בחר נכס ל',
            placeholder: 'נכס ל...',
            errormessage: 'dealType-error-message',
        },
    };
};
// ---------------------------------------------------------------------

// ----------------------------Option-Elements-----------------------------
const getAllOptionElements = () => {
    return screen.getAllByTestId(
        TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.OPTION
    ) as HTMLOptionElement[];
};
// ---------------------------------------------------------------------

// ----------------------------Error-Message-----------------------------
const getErrorMessage = () => {
    return screen.getByTestId(TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.ERROR_MESSAGE);
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
            id: 'dealType-error-message',
            role: 'alert',
        },
        aria: {
            hidden: isHidden.toString(),
        },
    };
};
// ---------------------------------------------------------------------

// ----------------------------SVG-Icon-----------------------------
const getSVGIconElement = () => {
    return screen.getByTestId(TEST_ID.FEATURE.SEARCH_FORM.DEAL_TYPE_SELECT_FIELD.SVG_ICON);
};
// ---------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
