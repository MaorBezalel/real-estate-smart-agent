export default function LoadingResultsContent(): React.JSX.Element {
    return (
        <div className="flex flex-col place-items-center gap-2 laptop-lg:gap-6">
            <h2
                className="text-xl font-bold text-text underline underline-offset-4
                mobile-lg:text-2xl
                tablet-lg:text-3xl
                laptop-sm:text-4xl
                laptop-md:text-5xl
                laptop-lg:text-[3.5rem]"
            >
                הערה לאנשי תוכנה:
            </h2>
            <p
                className="text-base text-text
                mobile-lg:text-lg
                tablet-sm:px-14 tablet-sm:text-center
                tablet-md:px-28
                tablet-lg:px-56 tablet-lg:text-xl
                laptop-sm:px-72 laptop-sm:text-2xl
                laptop-md:px-80"
            >
                החיפוש בהתחלה עלול להימשך עד כדקה בגלל ששרת ה-backend של הפרויקט יושב על השרתים החינמיים
                של{' '}
                <a
                    className="text-primary hover:text-accent"
                    href="https://render.com/"
                    target="_blank"
                    rel="noreferrer"
                >
                    render.com
                </a>{' '}
                ולשרתים האלה יש{' '}
                <a
                    className="text-primary hover:text-accent"
                    href="https://render.com/docs/free#spinning-down-on-idle"
                    target="_blank"
                    rel="noreferrer"
                >
                    idle policy
                </a>
                .
            </p>
        </div>
    );
}
