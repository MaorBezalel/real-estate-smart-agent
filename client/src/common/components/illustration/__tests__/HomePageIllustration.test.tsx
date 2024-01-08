import { render, screen, cleanup } from '@testing-library/react';
import HomePageIllustration from '../HomePageIllustration';

import { TEST_ID } from '@common/data/constants/testIds';

describe('HomePageIllustration', () => {
    const testId = TEST_ID.COMMON.ILLUSTRATION.HOME_PAGE;

    beforeEach(() => {
        render(<HomePageIllustration />);
    });
    afterEach(() => cleanup());

    it('should render the component', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toBeInTheDocument();
    });

    it('should render the component with the correct aria-roledescription attribute', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toHaveAttribute('aria-roledescription', 'Lottie Illustration');
    });

    it('should render the component with the correct aria-label attribute', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toHaveAccessibleName('איור של חיפוש נדל"ן.');
    });
});
