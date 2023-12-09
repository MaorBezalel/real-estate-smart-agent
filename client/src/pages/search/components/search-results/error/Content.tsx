export default function Content(): React.JSX.Element {
    return (
        <div
            className="flex flex-col gap-2
            tablet-lg:mt-10 tablet-lg:items-start tablet-lg:justify-start tablet-lg:gap-6
            laptop-sm:mt-20 laptop-sm:gap-8
            laptop-md:gap-12"
        >
            <h2
                className="text-center text-2xl font-bold underline underline-offset-4 antialiased
                mobile-md:text-3xl
                mobile-lg:text-4xl
                tablet-sm:text-5xl
                tablet-lg:text-start
                laptop-sm:text-[3.25rem]
                laptop-md:text-[3.5rem]"
            >
                אין תוצאות זמינות כרגע!
            </h2>
            <div
                className="flex flex-col gap-1 px-6
                mobile-md:gap-2
                mobile-lg:px-5
                tablet-sm:flex-wrap tablet-sm:px-16
                tablet-md:place-items-center tablet-md:px-0
                tablet-lg:place-items-start tablet-lg:gap-14
                laptop-sm:gap-20 laptop-sm:pl-10
                laptop-md:gap-24"
            >
                <p
                    className="text-base
                    mobile-md:text-lg
                    mobile-lg:text-xl
                    tablet-sm:text-2xl
                    laptop-sm:text-3xl
                    laptop-md:text-4xl"
                >
                    הסוכן החכם ברגעים אלה ממשיך עדיין לחפש אחר התוצאות שהוזנו.
                </p>
                <p
                    className="text-base
                    mobile-md:text-lg
                    mobile-lg:text-xl
                    tablet-sm:text-2xl
                    laptop-sm:text-3xl
                    laptop-md:text-4xl"
                >
                    במידה והסוכן החכם ימצא תוצאות חדשות, הן יופיעו כאן.
                </p>
                <p
                    className="text-base
                    mobile-md:text-lg
                    mobile-lg:text-xl
                    tablet-sm:text-2xl
                    laptop-sm:text-3xl
                    laptop-md:text-4xl"
                >
                    ניתן להמתין או לחפש אחר סוגי נכסים אחרים.
                </p>
            </div>
        </div>
    );
}
