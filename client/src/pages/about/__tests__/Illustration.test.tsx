import { render, screen } from '@testing-library/react';
import Illustration from '../components/Illustration';

describe('`Illustration` component', () => {
    // Constants
    const ILLUSTRATION_TEST_ID = 'About Page Illustration';

    it('should render the SVG image', () => {
        // Setup
        render(<Illustration />);

        // Post Expectations
        expect(screen.getByTestId(ILLUSTRATION_TEST_ID)).toBeInTheDocument();
    });

    it('should render the SVG image with the correct accessibility attributes', () => {
        // Setup
        render(<Illustration />);
        const animation = screen.getByTestId(ILLUSTRATION_TEST_ID);

        // Post Expectations
        expect(animation).toHaveAttribute(
            'aria-label',
            'איור של שלוש ידיים מציירות נורה דולקת על רקע גלגלי שיניים ועלים'
        );
        expect(animation).toHaveAttribute(
            'aria-roledescription',
            'Illustration'
        );
    });

    it('should be positioned in the correct grid area', () => {
        // Setup
        render(<Illustration />);
        const animation = screen.getByTestId(ILLUSTRATION_TEST_ID);

        // Post Expectations
        expect(animation).toHaveStyle({
            gridArea: 'illustration',
        });
    });
});
