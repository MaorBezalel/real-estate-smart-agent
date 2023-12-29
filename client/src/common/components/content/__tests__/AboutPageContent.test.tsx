import { render, screen, cleanup } from '@testing-library/react';
import AboutPageContent from '../AboutPageContent';
import { TEST_ID } from '@common/data/constants/testIds';

describe('AboutPageContent', () => {
    const testId = TEST_ID.COMMON.CONTENT.ABOUT_PAGE;

    beforeEach(() => {
        render(<AboutPageContent />);
    });
    afterEach(() => cleanup());

    it('should render 3 content sections', () => {
        // Arrange
        const contents = screen.getAllByTestId(testId);

        // Assert
        expect(contents).toHaveLength(3);
    });

    describe('first content section', () => {
        it('should render the heading with the correct text', () => {
            // Arrange
            const heading = screen.getAllByTestId(testId)[0].getElementsByTagName('h2')[0];
            const expectedHeadingText = 'מהי מטרת הפרויקט?';

            // Assert
            expect(heading).toHaveTextContent(expectedHeadingText);
        });

        it('should render the paragraph with the correct text', () => {
            // Arrange
            const paragraph = screen.getAllByTestId(testId)[0].getElementsByTagName('p')[0];
            const expectedParagraphText =
                'מטרת הפרויקט היא לפשט את תהליך חיפוש נכסי נדל"ן למכירה או להשכרה מאתר יד2.';

            // Assert
            expect(paragraph).toHaveTextContent(expectedParagraphText);
        });
    });

    describe('second content section', () => {
        it('should render the heading with the correct text', () => {
            // Arrange
            const heading = screen.getAllByTestId(testId)[1].getElementsByTagName('h2')[0];
            const expectedHeadingText = 'מי עומד מאחורי הפרויקט?';

            // Assert
            expect(heading).toHaveTextContent(expectedHeadingText);
        });

        it('should render the paragraph with the correct text', () => {
            // Arrange
            const paragraph = screen.getAllByTestId(testId)[1].getElementsByTagName('p')[0];
            const expectedParagraphText =
                'הפרויקט נבנה ועוצב על ידי מאור בצלאל למטרות למידה והדגמת ידע מעשי.';

            // Assert
            expect(paragraph).toHaveTextContent(expectedParagraphText);
        });
    });

    describe('third content section', () => {
        it('should render the heading with the correct text', () => {
            // Arrange
            const heading = screen.getAllByTestId(testId)[2].getElementsByTagName('h2')[0];
            const expectedHeadingText = 'איך זה עובד?';

            // Assert
            expect(heading).toHaveTextContent(expectedHeadingText);
        });

        it('should render the paragraph with the correct text', () => {
            // Arrange
            const paragraph = screen.getAllByTestId(testId)[2].getElementsByTagName('p')[0];
            const expectedParagraphText =
                "הסוכן מבקש מהמשתמש להגדיר פרמטרים לחיפוש סוג מסוים של נכס כגון: מספר חדרים, מחיר, וכו'. כאשר נבחר סוג נכס לחיפוש, מתבצע מאחורי הקלעים תהליך של Web Scraping באתר יד2 כדי להשיג את המידע המבוקש, ולאחר עיבדו המידע מוחזר למשתמש ומוצג עבורו בצורה נוחה וידידותית. למשתמשים יש גם אפשרות לנווט לעמוד המידע הספציפי של כל נכס באתר יד2 עצמו. המידע מתעדכן בזמן אמת ללא צורך בריענון הדפדפן, תכונה שאינה קיימת כלל באתר יד2.";

            // Assert
            expect(paragraph).toHaveTextContent(expectedParagraphText);
        });
    });
});
