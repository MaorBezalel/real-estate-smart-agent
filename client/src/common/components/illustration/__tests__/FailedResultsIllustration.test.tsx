import { render, screen, cleanup } from '@testing-library/react';
import FailedResultsIllustration from '../FailedResultsIllustration';

import { TEST_ID } from '@common/data/constants/testIds';

describe('FailedResultsIllustration', () => {
    const testId = TEST_ID.COMMON.ILLUSTRATION.FAILED_RESULTS;

    beforeEach(() => {
        render(<FailedResultsIllustration />);
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
        expect(component).toHaveAccessibleName(
            'איור של מישהו עם זכוכית מגדלת וסביבו סימני שאלה וקריאה ושדה חיפוש ריק'
        );
    });
});
