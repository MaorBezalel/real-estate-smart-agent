import { render, screen, cleanup } from '@testing-library/react';

import PageHeading from '../PageHeading';
import { TEST_ID } from '../../data/constants/testIds';

type Page = 'home' | 'search' | 'about';
const pages: Page[] = ['home', 'search', 'about'];

const homeDesktopHeading = '/src/common/data/svgs/home-desktop-heading.svg';
const homeMobileHeading = '/src/common/data/svgs/home-mobile-heading.svg';

describe('PageHeading', () => {
    it('should render the heading', () => {
        // Arrange
        render(<PageHeading page="home" content="Home" />);
        const heading = screen.getByTestId(TEST_ID.COMMON.PAGE_HEADING);

        // Assert
        expect(heading).toBeInTheDocument();
    });

    it('should render the heading for each page', () => {
        pages.forEach((page) => {
            // Arrange
            render(<PageHeading page={page} content={page} />);
            const heading = screen.getByTestId(TEST_ID.COMMON.PAGE_HEADING);

            // Assert
            expect(heading).toBeInTheDocument();

            // Cleanup
            cleanup();
        });
    });

    describe('Home PageHeading', () => {
        it('should have a heading role with level 1', () => {
            // Arrange
            render(<PageHeading page="home" content="Home" />);
            const heading = screen.getByTestId(TEST_ID.COMMON.PAGE_HEADING);

            // Assert
            expect(heading).toHaveAttribute('role', 'heading');
            expect(heading).toHaveAttribute('aria-level', '1');
        });

        it('should render the content in the alt attribute', () => {
            // Arrange
            render(<PageHeading page="home" content="Home" />);
            const heading = screen.getByTestId(TEST_ID.COMMON.PAGE_HEADING);

            // Assert
            expect(heading).toHaveAttribute('alt', 'Home');
        });

        it('should by default render the mobile heading', () => {
            // Arrange
            render(<PageHeading page="home" content="Home" />);
            const heading = screen.getByTestId(TEST_ID.COMMON.PAGE_HEADING);

            // Assert
            expect(heading).toHaveAttribute('src', homeMobileHeading);
        });

        it('should render the desktop heading when the screen is wider than 1024px', () => {
            // Arrange
            render(<PageHeading page="home" content="Home" />);
            const heading = screen.getByTestId(TEST_ID.COMMON.PAGE_HEADING);
            const source = heading.previousSibling as HTMLSourceElement;

            // Assert
            expect(source).toHaveAttribute('srcSet', homeDesktopHeading);
            expect(source).toHaveAttribute('media', '(min-width: 1024px)');
        });
    });

    describe('About PageHeading', () => {
        it('should render the content in the heading body itself', () => {
            // Arrange
            render(<PageHeading page="about" content="About" />);
            const heading = screen.getByTestId(TEST_ID.COMMON.PAGE_HEADING);

            // Assert
            expect(heading).toHaveTextContent('About');
        });
    });

    describe('Search PageHeading', () => {
        it('should render the content in the heading body itself', () => {
            // Arrange
            render(<PageHeading page="search" content="Search" />);
            const heading = screen.getByTestId(TEST_ID.COMMON.PAGE_HEADING);

            // Assert
            expect(heading).toHaveTextContent('Search');
        });
    });
});
