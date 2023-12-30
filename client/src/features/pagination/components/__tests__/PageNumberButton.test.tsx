import { render, screen } from '@testing-library/react';
import PageNumberButton from '../PageNumberButton';

import { BrowserRouter } from 'react-router-dom';
import PaginationContext from '@features/pagination/contexts/PaginationContext';
import { TEST_ID } from '@common/data/constants/testIds';

describe('PageNumberButton', () => {
    const testId = TEST_ID.FEATURE.PAGINATION.PAGE_NUMBER_BUTTON;

    it('should be in the document', () => {
        // Arrange
        const pageNumber = 1;
        const contextValues = { currentPage: 1, totalPages: 1 };

        // Act
        renderComponent(pageNumber, contextValues);

        // Assert
        expect(screen.getByTestId(testId)).toBeInTheDocument();
    });

    describe('when `pageNumber` is an ellipsis', () => {
        it('it should be in the document', () => {
            // Arrange
            const pageNumber = '...';
            const contextValues = { currentPage: 1, totalPages: 1 };

            // Act
            renderComponent(pageNumber, contextValues);

            // Assert
            expect(screen.getByTestId(testId)).toBeInTheDocument();
        });

        it('should render one single span element', () => {
            // Arrange
            const pageNumber = '...';
            const contextValues = { currentPage: 1, totalPages: 1 };

            // Act
            const component = renderComponent(pageNumber, contextValues);

            // Assert
            expect(component.container.querySelector('span')).toBeInTheDocument();
        });

        it('should render the appropriate text content', () => {
            // Arrange
            const pageNumber = '...';
            const expectedTextContent = '...';
            const contextValues = { currentPage: 1, totalPages: 1 };

            // Act
            renderComponent(pageNumber, contextValues);

            // Assert
            expect(screen.getByTestId(testId)).toHaveTextContent(expectedTextContent);
        });
    });

    describe('when `pageNumber` is a number', () => {
        describe('when `pageNumber` is the current page', () => {
            it('should render one single `a` element and one single `span` element', () => {
                // Arrange
                const pageNumber = 2;
                const contextValues = { currentPage: pageNumber, totalPages: 10 };

                // Act
                const component = renderComponent(pageNumber, contextValues);

                // Assert
                expect(component.container.querySelector('a')).toBeInTheDocument();
                expect(component.container.querySelector('span')).toBeInTheDocument();
            });

            it('should render the appropriate text content', () => {
                // Arrange
                const pageNumber = 2;
                const expectedTextContent = pageNumber.toString();
                const contextValues = { currentPage: pageNumber, totalPages: 10 };

                // Act
                renderComponent(pageNumber, contextValues);

                // Assert
                expect(screen.getByTestId(testId)).toHaveTextContent(expectedTextContent);
            });

            it('should render with the appropriate aria attributes', () => {
                // Arrange
                const pageNumber = 2;
                const contextValues = { currentPage: pageNumber, totalPages: 10 };

                // Act
                const component = renderComponent(pageNumber, contextValues);
                const pageNumberButton = component.container.querySelector('a');

                // Assert
                expect(pageNumberButton).toBeTruthy();
                expect(pageNumberButton).toHaveAttribute('aria-selected', 'true');
                expect(pageNumberButton).toHaveAttribute('aria-disabled', 'true');
            });
        });

        describe('when `pageNumber` is not the current page', () => {
            it('should render one single `a` element and one single `span` element', () => {
                // Arrange
                const pageNumber = 2;
                const contextValues = { currentPage: 1, totalPages: 10 };

                // Act
                const component = renderComponent(pageNumber, contextValues);

                // Assert
                expect(component.container.querySelector('a')).toBeInTheDocument();
                expect(component.container.querySelector('span')).toBeInTheDocument();
            });

            it('should render the appropriate text content', () => {
                // Arrange
                const pageNumber = 2;
                const expectedTextContent = pageNumber.toString();
                const contextValues = { currentPage: 1, totalPages: 10 };

                // Act
                renderComponent(pageNumber, contextValues);

                // Assert
                expect(screen.getByTestId(testId)).toHaveTextContent(expectedTextContent);
            });

            it('should render with the appropriate aria attributes', () => {
                // Arrange
                const pageNumber = 2;
                const contextValues = { currentPage: 1, totalPages: 10 };

                // Act
                const component = renderComponent(pageNumber, contextValues);
                const pageNumberButton = component.container.querySelector('a');

                // Assert
                expect(pageNumberButton).toBeTruthy();
                expect(pageNumberButton).toHaveAttribute('aria-selected', 'false');
                expect(pageNumberButton).toHaveAttribute('aria-disabled', 'false');
            });
        });
    });
});

const renderComponent = (
    pageNumber: number | '...',
    contextValues: { currentPage: number; totalPages: number }
) => {
    return render(
        <BrowserRouter>
            <PaginationContext.Provider value={contextValues}>
                <PageNumberButton pageNumber={pageNumber} />
            </PaginationContext.Provider>
        </BrowserRouter>
    );
};
