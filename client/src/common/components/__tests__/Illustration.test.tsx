import { render, screen, cleanup } from '@testing-library/react';

import Illustration from '../Illustration';
import { TEST_ID } from '../../data/constants/testIds';

type ForWho = 'home' | 'about';
const forWhoArray: ForWho[] = ['home', 'about'];

const lottieIllustration = 'Lottie Illustration';
const svgIllustration = 'SVG Illustration';

//import homePageIllustration from '../../data/animations/home-illustration-animation.json';
const aboutPageIllustration = '/src/common/data/svgs/about-illustration.svg';

describe('Illustration', () => {
    it('should render the illustration', () => {
        // Arrange
        render(
            <Illustration
                forWho="home"
                label="Home Illustration"
                roleDescription="Lottie Illustration"
            />
        );
        const illustration = screen.getByTestId(TEST_ID.COMMON.ILLUSTRATION);

        // Assert
        expect(illustration).toBeInTheDocument();
    });

    it('should render the illustration for each page', () => {
        forWhoArray.forEach((forWho) => {
            // Arrange
            render(
                <Illustration
                    forWho={forWho}
                    label={`${forWho} Illustration`}
                    roleDescription="Lottie Illustration"
                />
            );
            const illustration = screen.getByTestId(TEST_ID.COMMON.ILLUSTRATION);

            // Assert
            expect(illustration).toBeInTheDocument();

            // Cleanup
            cleanup();
        });
    });

    describe('Home Illustration', () => {
        it('should have a role description of Lottie Illustration', () => {
            // Arrange
            render(
                <Illustration
                    forWho="home"
                    label="Home Illustration"
                    roleDescription="Lottie Illustration"
                />
            );
            const illustration = screen.getByTestId(TEST_ID.COMMON.ILLUSTRATION);

            // Assert
            expect(illustration).toHaveAttribute('aria-roledescription', lottieIllustration);
        });

        it('should have a label of Home Illustration', () => {
            // Arrange
            render(
                <Illustration
                    forWho="home"
                    label="Home Illustration"
                    roleDescription="Lottie Illustration"
                />
            );
            const illustration = screen.getByTestId(TEST_ID.COMMON.ILLUSTRATION);

            // Assert
            expect(illustration).toHaveAttribute('aria-label', 'Home Illustration');
        });
    });

    describe('About Illustration', () => {
        it('should have a role description of SVG Illustration', () => {
            // Arrange
            render(
                <Illustration
                    forWho="about"
                    label="About Illustration"
                    roleDescription="SVG Illustration"
                />
            );
            const illustration = screen.getByTestId(TEST_ID.COMMON.ILLUSTRATION);

            // Assert
            expect(illustration).toHaveAttribute('aria-roledescription', svgIllustration);
        });

        it('should have a label of About Illustration', () => {
            // Arrange
            render(
                <Illustration
                    forWho="about"
                    label="About Illustration"
                    roleDescription="SVG Illustration"
                />
            );
            const illustration = screen.getByTestId(TEST_ID.COMMON.ILLUSTRATION);

            // Assert
            expect(illustration).toHaveAttribute('aria-label', 'About Illustration');
        });

        it('should render the SVG illustration', () => {
            // Arrange
            render(
                <Illustration
                    forWho="about"
                    label="About Illustration"
                    roleDescription="SVG Illustration"
                />
            );
            const illustration = screen.getByTestId(TEST_ID.COMMON.ILLUSTRATION);

            // Assert
            expect(illustration).toHaveAttribute('type', 'image/svg+xml');
            expect(illustration).toHaveAttribute('data', aboutPageIllustration);
        });
    });
});
