import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { PriceInputField } from '..';

import SearchForm from './__mocks__/SearchForm.mock';
import { SearchFormContext } from '../../contexts';

import { TEST_ID } from '../../../../common/data/constants/testIds';

describe('PriceInputField component', () => {
    const they = it;
    const priceInputFieldTypes: PriceFieldType[] = ['minPrice', 'maxPrice'];

    describe('when rendered', () => {
        beforeEach(() => {
            renderPriceInputFields();
        });

        afterEach(() => {
            cleanup();
        });

        it('should render input field for both min and max price', () => {
            for (const type of priceInputFieldTypes) {
                // Arrange
                const inputField = getPriceInputField(type);

                // Assert
                expect(inputField).toBeInTheDocument();
            }
        });

        it('should render error message for both min and max price', () => {
            for (const type of priceInputFieldTypes) {
                // Arrange
                const errorMessage = getErrorMessage(type);

                // Assert
                expect(errorMessage).toBeInTheDocument();
            }
        });

        it('should render the same SVG icon for both min and max price', () => {
            // Arrange
            const svgIcons = getAllPriceFieldSVGIcon();

            // Assert
            expect(svgIcons).toHaveLength(2);
        });
    });

    describe('when inspecting the attributes of...', () => {
        describe('both min and max price input fields', () => {
            beforeEach(() => {
                renderPriceInputFields();
            });

            afterEach(() => {
                cleanup();
            });

            they('should have the expected html attributes', () => {
                for (const type of priceInputFieldTypes) {
                    // Arrange
                    const actualHTMLAttributes = getPriceInputFieldAttributes(type).html;
                    const expectedHTMLAttributes = getExpectedPriceInputFieldAttributes(
                        type,
                        false
                    ).html;

                    // Assert
                    expect(actualHTMLAttributes).toEqual(expectedHTMLAttributes);
                }
            });

            they('should have the expected aria attributes', () => {
                for (const type of priceInputFieldTypes) {
                    // Arrange
                    const actualAriaAttributes = getPriceInputFieldAttributes(type).aria;
                    const expectedAriaAttributes = getExpectedPriceInputFieldAttributes(
                        type,
                        false
                    ).aria;

                    // Assert
                    expect(actualAriaAttributes).toEqual(expectedAriaAttributes);
                }
            });
        });

        describe('both min and max price error messages', () => {
            beforeEach(() => {
                renderPriceInputFields();
            });

            afterEach(() => {
                cleanup();
            });

            they('should have the expected html attributes', () => {
                for (const type of priceInputFieldTypes) {
                    // Arrange
                    const actualHTMLAttributes = getErrorMessageAttributes(type).html;
                    const expectedHTMLAttributes = getExpectedErrorMessageAttributes(type, true).html;

                    // Assert
                    expect(actualHTMLAttributes).toEqual(expectedHTMLAttributes);
                }
            });

            they('should have the expected aria attributes', () => {
                for (const type of priceInputFieldTypes) {
                    // Arrange
                    const actualAriaAttributes = getErrorMessageAttributes(type).aria;
                    const expectedAriaAttributes = getExpectedErrorMessageAttributes(type, true).aria;

                    // Assert
                    expect(actualAriaAttributes).toEqual(expectedAriaAttributes);
                }
            });
        });
    });

    describe("when the form hasn't been submitted yet...", () => {
        beforeEach(() => {
            renderPriceInputFields();
        });

        afterEach(() => {
            cleanup();
        });

        they('should be valid upon mount', () => {
            for (const type of priceInputFieldTypes) {
                // Arrange
                const inputField = getPriceInputField(type);
                const errorMessage = getErrorMessage(type);

                // Assert
                expect(inputField).toBeValid();
                expect(errorMessage).toHaveAttribute('aria-hidden', 'true');
            }
        });
    });

    describe('when user types in the input fields...', () => {
        beforeEach(() => {
            renderPriceInputFields();
        });

        afterEach(() => {
            cleanup();
        });

        they('should only allow the user to enter only numeric characters', () => {
            for (const type of priceInputFieldTypes) {
                // Arrange
                const inputField = getPriceInputField(type);

                // Act & Assert 1 - without any non-numeric characters
                fireEvent.change(inputField, { target: { value: 'ab%$#_c$@' } });
                expect(inputField.value).toBe('');

                // Act & Assert 2 - with numbers only
                fireEvent.change(inputField, { target: { value: '123' } });
                expect(inputField.value).toBe('123');

                // Act & Assert 3 - without the non-numeric characters at the start
                fireEvent.change(inputField, { target: { value: '$%#av111' } });
                expect(inputField.value).toBe('111');

                // Act & Assert 4 - without the non-numeric characters at the end
                fireEvent.change(inputField, { target: { value: '325a#$bc' } });
                expect(inputField.value).toBe('325');

                // Act & Assert 5 - without the non-numeric characters in the between
                fireEvent.change(inputField, { target: { value: '1a2vb3y' } });
                expect(inputField.value).toBe('123');

                // Act & Assert 6 - without the negative sign
                fireEvent.change(inputField, { target: { value: '-10' } });
                expect(inputField.value).toBe('10');
            }
        });

        they('should format the number with commas', () => {
            for (const type of priceInputFieldTypes) {
                // Arrange
                const inputField = getPriceInputField(type);

                // Act & Assert 1
                fireEvent.change(inputField, { target: { value: '1000' } });
                expect(inputField.value).toBe('1,000');

                // Act & Assert 2
                fireEvent.change(inputField, { target: { value: '1000000' } });
                expect(inputField.value).toBe('1,000,000');

                // Act & Assert 3
                fireEvent.change(inputField, { target: { value: '1000000000' } });
                expect(inputField.value).toBe('1,000,000,000');
            }
        });
    });

    describe('when the form has been submitted...', () => {
        beforeEach(() => {
            renderPriceInputFields();
        });

        afterEach(() => {
            cleanup();
        });

        they('should be valid when numbers were entered', async () => {
            for (const type of priceInputFieldTypes) {
                // Arrange
                const inputField = getPriceInputField(type);
                const errorMessage = getErrorMessage(type);
                const form = inputField.parentElement as HTMLFormElement;

                // Act
                fireEvent.change(inputField, { target: { value: '123456789' } });
                fireEvent.submit(form);

                // Assert
                await waitFor(() => {
                    expect(inputField).toBeValid();
                    expect(errorMessage).toHaveAttribute('aria-hidden', 'true');
                });
            }
        });

        they('should be invalid when nothing was entered', async () => {
            for (const type of priceInputFieldTypes) {
                // Arrange
                const inputField = getPriceInputField(type);
                const errorMessage = getErrorMessage(type);
                const form = inputField.parentElement as HTMLFormElement;

                // Act
                fireEvent.change(inputField, { target: { value: '' } });
                fireEvent.submit(form);

                // Assert
                await waitFor(() => {
                    const actualErrorMessageTextContent = errorMessage.textContent;
                    const expectedErrorMessageTextContent =
                        getExpectedErrorMessageTextContent().required;

                    expect(inputField).toBeInvalid();
                    expect(errorMessage).toHaveAttribute('aria-hidden', 'false');
                    expect(actualErrorMessageTextContent).toBe(expectedErrorMessageTextContent);
                });
            }
        });

        they('should be invalid when a bigger price than 1,000,000,000 was entered', async () => {
            for (const type of priceInputFieldTypes) {
                // Arrange
                const inputField = getPriceInputField(type);
                const errorMessage = getErrorMessage(type);
                const form = inputField.parentElement as HTMLFormElement;

                // Act
                fireEvent.change(inputField, { target: { value: '1000000001' } });
                fireEvent.submit(form);

                // Assert
                await waitFor(() => {
                    const actualErrorMessageTextContent = errorMessage.textContent;
                    const expectedErrorMessageTextContent = getExpectedErrorMessageTextContent().max;

                    expect(inputField).toBeInvalid();
                    expect(errorMessage).toHaveAttribute('aria-hidden', 'false');
                    expect(actualErrorMessageTextContent).toBe(expectedErrorMessageTextContent);
                });
            }
        });

        they('should be invalid when min price is greater than max price and vice versa', async () => {
            // Arrange - min price
            const minPriceInputField = getPriceInputField('minPrice');
            const minPriceErrorMessage = getErrorMessage('minPrice');

            // Arrange - max price
            const maxPriceInputField = getPriceInputField('maxPrice');
            const maxPriceErrorMessage = getErrorMessage('maxPrice');

            // Arrange - form
            const form = minPriceInputField.parentElement as HTMLFormElement;

            // Act
            fireEvent.change(minPriceInputField, { target: { value: '100' } });
            fireEvent.change(maxPriceInputField, { target: { value: '50' } });
            fireEvent.submit(form);

            // Assert
            await waitFor(() => {
                const actualMinPriceErrorMessageTextContent = minPriceErrorMessage.textContent;
                const actualMaxPriceErrorMessageTextContent = maxPriceErrorMessage.textContent;

                const expectedMinPriceErrorMessageTextContent =
                    getExpectedErrorMessageTextContent().validate.minPrice;
                const expectedMaxPriceErrorMessageTextContent =
                    getExpectedErrorMessageTextContent().validate.maxPrice;

                expect(minPriceInputField).toBeInvalid();
                expect(minPriceErrorMessage).toHaveAttribute('aria-hidden', 'false');
                expect(actualMinPriceErrorMessageTextContent).toBe(
                    expectedMinPriceErrorMessageTextContent
                );

                expect(maxPriceInputField).toBeInvalid();
                expect(maxPriceErrorMessage).toHaveAttribute('aria-hidden', 'false');
                expect(actualMaxPriceErrorMessageTextContent).toBe(
                    expectedMaxPriceErrorMessageTextContent
                );
            });
        });
    });
});

// ---------------------------------------Test-Helpers-----------------------------------------
type PriceFieldType = 'minPrice' | 'maxPrice';

const renderPriceInputFields = () => {
    return render(
        <SearchFormContext>
            <SearchForm>
                <PriceInputField type="minPrice" />
                <PriceInputField type="maxPrice" />
            </SearchForm>
        </SearchFormContext>
    );
};

// --------------------Input-Field--------------------
const getPriceInputField = (type: PriceFieldType) => {
    return screen.getByTestId(
        type === 'minPrice'
            ? TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MIN_PRICE.INPUT
            : TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MAX_PRICE.INPUT
    ) as HTMLInputElement;
};
const getPriceInputFieldAttributes = (type: PriceFieldType) => {
    const inputField = getPriceInputField(type);
    return {
        html: {
            id: inputField.id,
            type: inputField.type,
            inputMode: inputField.inputMode,
            autoComplete: inputField.autocomplete,
            placeholder: inputField.placeholder,
        },
        aria: {
            invalid: inputField.getAttribute('aria-invalid'),
            required: inputField.getAttribute('aria-required'),
            label: inputField.getAttribute('aria-label'),
            placeholder: inputField.getAttribute('aria-placeholder'),
            errorMessage: inputField.getAttribute('aria-errormessage'),
        },
    };
};
const getExpectedPriceInputFieldAttributes = (type: PriceFieldType, isInvalid: boolean) => {
    return {
        html: {
            id: `${type}-input-field`,
            type: 'text',
            inputMode: 'numeric',
            autoComplete: 'off',
            placeholder: `מחיר ${type === 'minPrice' ? 'מינימלי' : 'מקסימלי'}...`,
        },
        aria: {
            invalid: isInvalid.toString(),
            required: 'true',
            label: `הכנס מחיר ${type === 'minPrice' ? 'מינימלי' : 'מקסימלי'}`,
            placeholder: `מחיר ${type === 'minPrice' ? 'מינימלי' : 'מקסימלי'}...`,
            errorMessage: `${type}-input-field-error-message`,
        },
    };
};
// --------------------------------------------------

// --------------------Error-Message--------------------
const getErrorMessage = (type: PriceFieldType) => {
    return screen.getByTestId(
        type === 'minPrice'
            ? TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MIN_PRICE.ERROR_MESSAGE
            : TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.MAX_PRICE.ERROR_MESSAGE
    );
};
const getErrorMessageAttributes = (type: PriceFieldType) => {
    const errorMessage = getErrorMessage(type);
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
const getExpectedErrorMessageAttributes = (type: PriceFieldType, isHidden: boolean) => {
    return {
        html: {
            id: `${type}-input-field-error-message`,
            role: 'alert',
        },
        aria: {
            hidden: isHidden.toString(),
        },
    };
};
const getExpectedErrorMessageTextContent = () => {
    return {
        required: 'שדה חובה',
        min: 'מחיר אינו יכול להיות נמוך מ-0 ₪',
        max: 'מחיר אינו יכול להיות גבוה מ-1,000,000,000 ₪',
        pattern: 'הכנס מספרים בלבד',
        validate: {
            minPrice: 'מחיר מינימלי חייב להיות נמוך ממחיר מקסימלי',
            maxPrice: 'מחיר מקסימלי חייב להיות גבוה ממחיר מינימלי',
        },
        default: 'שגיאה',
    };
};
// --------------------------------------------------

// --------------------SVG-Icon--------------------
const getAllPriceFieldSVGIcon = () => {
    return screen.getAllByTestId(TEST_ID.FEATURE.SEARCH_FORM.PRICE_INPUT_FIELD.SVG_ICON);
};
// --------------------------------------------------
// ---------------------------------------------------------------------------------------------
