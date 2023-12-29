import { render, screen, cleanup } from '@testing-library/react';
import HomePageHeading from '../HomePageHeading';

import { TEST_ID } from '@common/data/constants/testIds';

describe('HomePageHeading', () => {
    const testId = TEST_ID.COMMON.PAGE_HEADING.HOME_PAGE;

    beforeEach(() => {
        render(<HomePageHeading />);
    });
    afterEach(() => cleanup());

    it('should render the component', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toBeInTheDocument();
    });

    it('should render the component with the correct role attribute', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toHaveAttribute('role', 'heading');
        expect(component).toHaveAttribute('aria-level', '1');
    });

    it('should render the component with the correct alt attribute', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toHaveAccessibleName('מצאו בקלות את הנכס המושלם עבורכם!');
    });
});
