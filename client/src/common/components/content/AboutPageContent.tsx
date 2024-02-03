import { TEST_ID } from '@common/data/constants/testIds';

export default function AboutPageContent(): React.JSX.Element {
    const content = [
        {
            heading: 'מהי מטרת הפרויקט?',
            paragraph: 'מטרת הפרויקט היא לפשט את תהליך חיפוש נכסי נדל"ן למכירה או להשכרה מאתר יד2.',
        },
        {
            heading: 'מי עומד מאחורי הפרויקט?',
            paragraph: 'הפרויקט נבנה ועוצב על ידי מאור בצלאל למטרות למידה והדגמת ידע מעשי.',
        },
        {
            heading: 'איך זה עובד?',
            paragraph: `
            הסוכן מבקש מהמשתמש להגדיר פרמטרים לחיפוש סוג מסוים של נכס כגון: מספר חדרים, מחיר,
            וכו'. כאשר נבחר סוג נכס לחיפוש, מתבצע מאחורי הקלעים תהליך של Web Scraping באתר יד2
            כדי להשיג את המידע המבוקש, ולאחר עיבדו המידע מוחזר למשתמש ומוצג עבורו בצורה נוחה
            וידידותית. למשתמשים יש גם אפשרות לנווט לעמוד המידע הספציפי של כל נכס באתר יד2 עצמו.
            המידע מתעדכן בזמן אמת ללא צורך בריענון הדפדפן, תכונה שאינה קיימת כלל באתר יד2.
            `,
        },
    ] as const;

    return (
        <>
            {content.map(({ heading, paragraph }, index) => {
                return (
                    <section key={index} className="flex flex-col gap-2" data-testid={TEST_ID.COMMON.CONTENT.ABOUT_PAGE}>
                        <h2
                            className="text-center text-xl font-bold text-secondary underline underline-offset-4 antialiased mobile-md:text-2xl mobile-lg:text-3xl tablet-md:text-4xl tablet-lg:text-start tablet-lg:text-3xl laptop-sm:text-4xl laptop-md:text-[2.5rem] laptop-lg:text-[2.75rem]"
                            style={{
                                textShadow:
                                    '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                            }}
                        >
                            {heading}
                        </h2>
                        <p className="text-justify text-base font-medium text-text [text-align-last:center] mobile-lg:text-lg tablet-md:text-xl tablet-lg:pl-10 tablet-lg:text-start tablet-lg:text-base tablet-lg:[text-align-last:start] laptop-sm:text-lg laptop-md:text-xl">
                            {paragraph}
                        </p>
                    </section>
                );
            })}
        </>
    );
}
