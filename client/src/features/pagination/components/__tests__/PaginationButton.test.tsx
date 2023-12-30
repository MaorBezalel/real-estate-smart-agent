import { render, screen, cleanup } from '@testing-library/react';
import PaginationButton from '../PaginationButton';

import { BrowserRouter } from 'react-router-dom';
import PaginationContext from '@features/pagination/contexts/PaginationContext';
import { TEST_ID } from '@common/data/constants/testIds';

describe('PaginationButton', () => {
    const testId = TEST_ID.FEATURE.PAGINATION.PAGINATION_BUTTON;

    describe('when `type` is `prev`', () => {
        it('should be in the document', () => {
            // Arrange
            const type = 'prev';
            const contextValues = { currentPage: 1, totalPages: 1 };

            // Act
            renderComponent(type, contextValues);

            // Assert
            expect(screen.getByTestId(testId)).toBeInTheDocument();
        });

        it('should render one single Link element', () => {
            // Arrange
            const type = 'prev';
            const contextValues = { currentPage: 1, totalPages: 1 };

            // Act
            const component = renderComponent(type, contextValues);

            // Assert
            expect(component.container.querySelector('a')).toBeInTheDocument();
        });

        it('should render the appropriate text content', () => {
            // Arrange
            const type = 'prev';
            const expectedTextContent = 'הקודם';
            const contextValues = { currentPage: 1, totalPages: 1 };

            // Act
            renderComponent(type, contextValues);

            // Assert
            expect(screen.getByTestId(testId)).toHaveTextContent(expectedTextContent);
        });

        it('should render the button as disabled if and only if the current page is the first page', () => {
            // Arrange 1
            const type = 'prev';
            let contextValues = { currentPage: 1, totalPages: 5 };

            // Act 1
            renderComponent(type, contextValues);

            // Assert 1
            expect(screen.getByTestId(testId)).toHaveAttribute('aria-disabled', 'true');

            // ---------------------------------------------

            // Arrange 2
            contextValues = { currentPage: 2, totalPages: 5 };

            // Act 2
            cleanup();
            renderComponent(type, contextValues);

            // Assert 2
            expect(screen.getByTestId(testId)).toHaveAttribute('aria-disabled', 'false');
        });
    });

    describe('when `type` is `next`', () => {
        it('should be in the document', () => {
            // Arrange
            const type = 'next';
            const contextValues = { currentPage: 1, totalPages: 1 };

            // Act
            renderComponent(type, contextValues);

            // Assert
            expect(screen.getByTestId(testId)).toBeInTheDocument();
        });

        it('should render one single Link element', () => {
            // Arrange
            const type = 'next';
            const contextValues = { currentPage: 1, totalPages: 1 };

            // Act
            const component = renderComponent(type, contextValues);

            // Assert
            expect(component.container.querySelector('a')).toBeInTheDocument();
        });

        it('should render the appropriate text content', () => {
            // Arrange
            const type = 'next';
            const expectedTextContent = 'הבא';
            const contextValues = { currentPage: 1, totalPages: 1 };

            // Act
            renderComponent(type, contextValues);

            // Assert
            expect(screen.getByTestId(testId)).toHaveTextContent(expectedTextContent);
        });

        it('should render the button as disabled if and only if the current page is the last page', () => {
            // Arrange 1
            const type = 'next';
            let contextValues = { currentPage: 5, totalPages: 5 };

            // Act 1
            renderComponent(type, contextValues);

            // Assert 1
            expect(screen.getByTestId(testId)).toHaveAttribute('aria-disabled', 'true');

            // ---------------------------------------------

            // Arrange 2
            contextValues = { currentPage: 4, totalPages: 5 };

            // Act 2
            cleanup();
            renderComponent(type, contextValues);

            // Assert 2
            expect(screen.getByTestId(testId)).toHaveAttribute('aria-disabled', 'false');
        });
    });
});

const renderComponent = (
    type: 'prev' | 'next',
    contextValues: { currentPage: number; totalPages: number }
) => {
    return render(
        <BrowserRouter>
            <PaginationContext.Provider value={contextValues}>
                <PaginationButton type={type} />
            </PaginationContext.Provider>
        </BrowserRouter>
    );
};
