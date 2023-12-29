import { render, screen, cleanup } from '@testing-library/react';
import { LoadingResultsIllustration } from '..';

import { TEST_ID } from '@common/data/constants/testIds';

describe('LoadingResultsIllustration', () => {
    const testId = TEST_ID.COMMON.ILLUSTRATION.LOADING_RESULTS;

    beforeEach(() => {
        render(<LoadingResultsIllustration />);
    });
    afterEach(() => cleanup());

    it('should render the component', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toBeInTheDocument();
    });

    it('should render the component with a css class called `pac-man`', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toHaveClass('pac-man');
    });
});
