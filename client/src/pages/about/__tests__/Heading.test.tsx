import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Heading from '../components/Heading';

describe('`Heading` component', () => {
    const HEADING_TEST_ID = 'About Page Heading';

    it('should render the heading text', () => {
        // Setup
        render(<Heading />);

        // Post Expectations
        expect(screen.getByTestId(HEADING_TEST_ID)).toBeInTheDocument();
        expect(screen.getByTestId(HEADING_TEST_ID)).toHaveTextContent(
            'אודות הפרויקט:'
        );
    });
});
