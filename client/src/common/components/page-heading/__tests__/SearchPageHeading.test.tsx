import { render, screen, cleanup } from '@testing-library/react';
import SearchPageHeading from '../SearchPageHeading';

import { TEST_ID } from '@common/data/constants/testIds';

describe('SearchPageHeading', () => {
    const testId = TEST_ID.COMMON.PAGE_HEADING.SEARCH_PAGE;

    beforeEach(() => {
        render(<SearchPageHeading />);
    });
    afterEach(() => cleanup());

    it('should render the component', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toBeInTheDocument();
    });

    it('should render the component with the correct text', () => {
        // Arrange
        const component = screen.getByTestId(testId);
        const expectedText = 'חיפוש נדל"ן';

        // Assert
        expect(component).toHaveTextContent(expectedText);
    });
});
