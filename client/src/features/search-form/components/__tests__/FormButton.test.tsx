import { render, screen, fireEvent, cleanup } from '@testing-library/react';

import { FormButton } from '..';
import { SearchStateProvider } from '../../../../common/contexts';
import * as hooks from '../../hooks';
import { TEST_ID } from '../../../../common/data/constants/testIds';

describe('FormButton', () => {
    describe('when search state is inactive', () => {
        const state = 'inactive';
        const testId = TEST_ID.FEATURE.SEARCH_FORM.FORM_BUTTON.INACTIVE;

        beforeEach(() => {
            render(
                <SearchStateProvider initialState={state}>
                    <FormButton />
                </SearchStateProvider>
            );
        });

        afterEach(() => {
            cleanup();
        });

        it('should render a button with the text "הפעל" when search state is inactive', () => {
            expect(screen.getByTestId(testId)).toBeInTheDocument();
            expect(screen.getByText('הפעל')).toBeInTheDocument();
        });

        it('should render that button with the button with the correct attributes', () => {
            expect(screen.getByTestId(testId)).toHaveAttribute('id', 'submit-button');
            expect(screen.getByTestId(testId)).toHaveAttribute('type', 'submit');
            expect(screen.getByTestId(testId)).toHaveAttribute('aria-disabled', 'false');
        });
    });

    describe('when search state is loading', () => {
        const state = 'loading';
        const testId = TEST_ID.FEATURE.SEARCH_FORM.FORM_BUTTON.LOADING;

        beforeEach(() => {
            render(
                <SearchStateProvider initialState={state}>
                    <FormButton />
                </SearchStateProvider>
            );
        });

        afterEach(() => {
            cleanup();
        });

        it('should render a button with the text "טוען..." when search state is loading', () => {
            expect(screen.getByTestId(testId)).toBeInTheDocument();
            expect(screen.getByTestId(testId)).toHaveTextContent('טוען...');
        });

        it('should render that button with the button with the correct attributes', () => {
            expect(screen.getByTestId(testId)).toHaveAttribute('id', 'loading-button');
            expect(screen.getByTestId(testId)).toHaveAttribute('type', 'button');
            expect(screen.getByTestId(testId)).toHaveAttribute('aria-disabled', 'true');
            expect(screen.getByTestId(testId)).toBeDisabled();
        });
    });

    describe('when search state is active', () => {
        const onReset = vitest.fn();
        const state = 'active';
        const testId = TEST_ID.FEATURE.SEARCH_FORM.FORM_BUTTON.ACTIVE;

        beforeEach(() => {
            vitest.spyOn(hooks, 'useSearchFormActions').mockReturnValueOnce({
                onReset,
                onError: vitest.fn(),
                onSubmit: vitest.fn(),
            });

            render(
                <SearchStateProvider initialState={state}>
                    <FormButton />
                </SearchStateProvider>
            );
        });

        afterEach(() => {
            vitest.clearAllMocks();
            cleanup();
        });

        it('should render a button with the text "בטל"', () => {
            expect(screen.getByTestId(testId)).toBeInTheDocument();
            expect(screen.getByTestId(testId)).toHaveTextContent('בטל');
        });

        it('should render that button with the button with the correct attributes', () => {
            expect(screen.getByTestId(testId)).toHaveAttribute('id', 'reset-button');
            expect(screen.getByTestId(testId)).toHaveAttribute('type', 'button');
            expect(screen.getByTestId(testId)).toHaveAttribute('aria-disabled', 'false');
        });

        it('should call the onReset function when the button is clicked', () => {
            // Act
            fireEvent.click(screen.getByTestId(TEST_ID.FEATURE.SEARCH_FORM.FORM_BUTTON.ACTIVE));

            // Assert
            expect(onReset).toHaveBeenCalledTimes(1);
        });
    });
});
