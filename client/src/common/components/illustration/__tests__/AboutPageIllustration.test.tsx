import { render, screen, cleanup } from '@testing-library/react';
import AboutPageIllustration from '../AboutPageIllustration';

import svgBanner from '@common/assets/svgs/about-illustration.svg';
import { TEST_ID } from '@common/data/constants/testIds';

describe('AboutPageIllustration', () => {
    const testId = TEST_ID.COMMON.ILLUSTRATION.ABOUT_PAGE;

    beforeEach(() => {
        render(<AboutPageIllustration />);
    });
    afterEach(() => cleanup());

    it('should render the component', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toBeInTheDocument();
    });

    it('should render the component with the correct alt attribute', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toHaveAccessibleName('איור של חיפוש נדלן');
    });

    it('should render the component with the correct src attribute', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toHaveAttribute('src', svgBanner);
    });
});
