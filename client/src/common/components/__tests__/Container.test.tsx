import Container from '../Container';
import { render } from '@testing-library/react';

import { TEST_ID } from '../../data/constants/testIds';

describe('Container', () => {
    it('should render the container', () => {
        // Arrange
        const { getByTestId } = render(
            <Container>
                <></>
            </Container>
        );

        // Assert
        expect(getByTestId(TEST_ID.COMMON.CONTAINER)).toBeInTheDocument();
    });

    it('should render the children', () => {
        // Arrange
        const { getByTestId } = render(
            <Container>
                <div data-testid="child" />
            </Container>
        );

        // Assert
        expect(getByTestId('child')).toBeInTheDocument();
    });
});
