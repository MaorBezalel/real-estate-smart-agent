import { render, screen, cleanup } from '@testing-library/react';
import LoadingResultsContent from '../LoadingResultsContent';

import { TEST_ID } from '@common/data/constants/testIds';

describe('LoadingResultsContent', () => {
    const testId = TEST_ID.COMMON.CONTENT.LOADING_RESULTS;

    beforeEach(() => {
        render(<LoadingResultsContent />);
    });
    afterEach(() => cleanup());

    it('should render the component', () => {
        // Arrange
        const component = screen.getByTestId(testId);

        // Assert
        expect(component).toBeInTheDocument();
    });

    it('should render 1 heading and 1 paragraph', () => {
        // Arrange
        const component = screen.getByTestId(testId);
        const headings = component.getElementsByTagName('h2');
        const paragraphs = component.getElementsByTagName('p');

        // Assert
        expect(headings).toHaveLength(1);
        expect(paragraphs).toHaveLength(1);
    });

    it('should render the heading with the correct text', () => {
        // Arrange
        const component = screen.getByTestId(testId);
        const heading = component.getElementsByTagName('h2')[0];
        const expectedHeadingText = 'הערה לאנשי תוכנה:';

        // Assert
        expect(heading).toHaveTextContent(expectedHeadingText);
    });

    it('should render the paragraph with the correct text', () => {
        // Arrange
        const component = screen.getByTestId(testId);
        const paragraph = component.getElementsByTagName('p')[0];
        const expectedParagraphText =
            'החיפוש בהתחלה עלול להימשך עד כדקה בגלל ששרת ה-backend של הפרויקט יושב על השרתים החינמיים של render.com ולשרתים האלה יש idle policy.';

        // Assert
        expect(paragraph).toHaveTextContent(expectedParagraphText);
    });

    it('should render the paragraph with an anchor tag to render.com', () => {
        // Arrange
        const component = screen.getByTestId(testId);
        const paragraph = component.getElementsByTagName('p')[0];
        const link = paragraph.getElementsByTagName('a')[0];
        const expectedLinkText = 'render.com';
        const expectedLinkHref = 'https://render.com/';

        // Assert
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent(expectedLinkText);
        expect(link).toHaveAttribute('href', expectedLinkHref);
    });

    it('should render the paragraph with an anchor tag to render.com/docs/free#spinning-down-on-idle', () => {
        // Arrange
        const component = screen.getByTestId(testId);
        const paragraph = component.getElementsByTagName('p')[0];
        const link = paragraph.getElementsByTagName('a')[1];
        const expectedLinkText = 'idle policy';
        const expectedLinkHref = 'https://render.com/docs/free#spinning-down-on-idle';

        // Assert
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent(expectedLinkText);
        expect(link).toHaveAttribute('href', expectedLinkHref);
    });
});
