import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import Heading from '../components/Heading';

import { HEADING_TEST_ID } from '../constants/testIds';

describe('`Heading` component', () => {
    it('should render with the correct test id', () => {
        // Setup
        render(
            <Router>
                <Heading />
            </Router>
        );

        // Post Expectations
        expect(screen.getByTestId(HEADING_TEST_ID)).toBeInTheDocument();
    });

    it('should render the heading image with the correct accessibility attributes', () => {
        // Setup
        render(
            <Router>
                <Heading />
            </Router>
        );
        const heading = screen.getByTestId(HEADING_TEST_ID);

        // Post Expectations
        expect(heading).toHaveAttribute('role', 'heading');
        expect(heading).toHaveAttribute('aria-level', '1');
        expect(heading).toHaveAttribute(
            'alt',
            'מצאו בקלות את הנכס המושלם עבורכם!'
        );
    });
});
