import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePageCta from '../HomePageCta';

import { TEST_ID } from '@common/data/constants/testIds';

describe('HomePageCta', () => {
    const testId = TEST_ID.COMMON.CTA.HOME_PAGE;

    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <HomePageCta />
            </MemoryRouter>
        );
    });
    afterEach(() => cleanup());

    it('should render the component', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toBeInTheDocument();
    });

    it('should render 2 links - primary and secondary', () => {
        // Arrange
        const component = screen.getByTestId(testId);
        const links = component.getElementsByTagName('a');

        // Assert
        expect(links).toHaveLength(2);
    });

    describe('primary link', () => {
        it('should render the link with the correct text', () => {
            // Arrange
            const component = screen.getByTestId(testId);
            const link = component.getElementsByTagName('a')[0];
            const expectedLinkText = 'חיפוש נדל"ן';

            // Assert
            expect(link).toHaveTextContent(expectedLinkText);
        });

        it('should render the link with the correct href', () => {
            // Arrange
            const component = screen.getByTestId(testId);
            const link = component.getElementsByTagName('a')[0];
            const expectedLinkHref = '/search';

            // Assert
            expect(link).toHaveAttribute('href', expectedLinkHref);
        });
    });

    describe('secondary link', () => {
        it('should render the link with the correct text', () => {
            // Arrange
            const component = screen.getByTestId(testId);
            const link = component.getElementsByTagName('a')[1];
            const expectedLinkText = 'אודות';

            // Assert
            expect(link).toHaveTextContent(expectedLinkText);
        });

        it('should render the link with the correct href', () => {
            // Arrange
            const component = screen.getByTestId(testId);
            const link = component.getElementsByTagName('a')[1];
            const expectedLinkHref = '/about';

            // Assert
            expect(link).toHaveAttribute('href', expectedLinkHref);
        });
    });
});
