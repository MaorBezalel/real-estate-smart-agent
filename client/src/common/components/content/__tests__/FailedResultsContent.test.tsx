import { render, screen, cleanup } from '@testing-library/react';
import FailedResultsContent from '../FailedResultsContent';

import { TEST_ID } from '@common/data/constants/testIds';

describe('FailedResultsContent', () => {
    const testId = TEST_ID.COMMON.CONTENT.FAILED_RESULTS;

    beforeEach(() => {
        render(<FailedResultsContent />);
    });
    afterEach(() => cleanup());

    it('should render the component', () => {
        // Arrange
        const component = screen.getByTestId('common-content-failed-results');

        // Assert
        expect(component).toBeInTheDocument();
    });

    it('should render 1 heading and 3 paragraphs', () => {
        // Arrange
        const component = screen.getByTestId(testId);
        const headings = component.getElementsByTagName('h2');
        const paragraphs = component.getElementsByTagName('p');

        // Assert
        expect(headings).toHaveLength(1);
        expect(paragraphs).toHaveLength(3);
    });

    it('should render the heading with the correct text', () => {
        // Arrange
        const component = screen.getByTestId(testId);
        const heading = component.getElementsByTagName('h2')[0];
        const expectedHeadingText = 'אין תוצאות זמינות כרגע!';

        // Assert
        expect(heading).toHaveTextContent(expectedHeadingText);
    });

    it('should render the 3 paragraphs with the correct text', () => {
        // Arrange
        const component = screen.getByTestId(testId);
        const paragraphs = component.getElementsByTagName('p');
        const expectedParagraphsText = [
            'הסוכן החכם ברגעים אלה ממשיך עדיין לחפש אחר התוצאות שהוזנו.',
            'במידה והסוכן החכם ימצא תוצאות חדשות, הן יופיעו כאן.',
            'ניתן להמתין או לנסות שוב מאוחר יותר.',
        ];

        // Assert
        for (let i = 0; i < paragraphs.length; i++) {
            expect(paragraphs[i]).toHaveTextContent(expectedParagraphsText[i]);
        }
    });
});
