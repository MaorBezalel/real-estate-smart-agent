import { render, screen } from '@testing-library/react';
import Illustration from '../components/Illustration';

describe('`Illustration` component', () => {
    // Constants
    const ILLUSTRATION_TEST_ID = 'About Page Illustration';

    it('should render with the correct test id', () => {
        // Setup
        render(<Illustration />);

        // Post Expectations
        expect(screen.getByTestId(ILLUSTRATION_TEST_ID)).toBeInTheDocument();
    });

    it('should render with the correct accessibility attributes', () => {
        // Setup
        render(<Illustration />);
        const illustration = screen.getByTestId(ILLUSTRATION_TEST_ID);

        // Post Expectations
        expect(illustration).toHaveAttribute(
            'aria-label',
            'איור של שלוש ידיים מציירות נורה דולקת על רקע גלגלי שיניים ועלים'
        );
        expect(illustration).toHaveAttribute(
            'aria-roledescription',
            'Illustration'
        );
    });

    it('should be positioned in the correct grid area', () => {
        // Setup
        render(<Illustration />);
        const illustration = screen.getByTestId(ILLUSTRATION_TEST_ID);

        // Post Expectations
        expect(illustration).toHaveStyle({
            gridArea: 'illustration',
        });
    });
});
