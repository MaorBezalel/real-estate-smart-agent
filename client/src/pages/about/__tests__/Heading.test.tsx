import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Heading from '../components/Heading';

import { HEADING_TEST_ID } from '../constants/testIds';

describe('`Heading` component', () => {
    it('should render with the correct test id', () => {
        // Setup
        render(<Heading />);

        // Post Expectations
        expect(screen.getByTestId(HEADING_TEST_ID)).toBeInTheDocument();
    });

    it('should render with the correct text content', () => {
        // Setup
        render(<Heading />);

        // Post Expectations
        expect(screen.getByTestId(HEADING_TEST_ID)).toHaveTextContent(
            'אודות הפרויקט:'
        );
    });
});
