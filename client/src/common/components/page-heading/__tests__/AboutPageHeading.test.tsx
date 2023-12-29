import { render, screen, cleanup } from '@testing-library/react';
import AboutPageHeading from '../AboutPageHeading';

import { TEST_ID } from '@common/data/constants/testIds';

describe('AboutPageHeading', () => {
    const testId = TEST_ID.COMMON.PAGE_HEADING.ABOUT_PAGE;

    beforeEach(() => {
        render(<AboutPageHeading />);
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
        const expectedText = 'אודות הפרויקט:';

        // Assert
        expect(component).toHaveTextContent(expectedText);
    });
});
