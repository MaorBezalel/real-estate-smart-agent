/** The type of props passed to the QnA component */
type QnAProps = {
    /** The question number */
    number: number;

    /** The question */
    question: string;

    /** The answer */
    answer: string;
};

/**
 * The QnA section component of the About page
 * @param props The props
 * @returns The React.JSX element
 */
export default function QnA({
    number,
    question,
    answer,
}: QnAProps): React.JSX.Element {
    return (
        <section
            className="flex flex-col gap-2"
            aria-label={`שאלה ותשובה מספר ${number}`}
            data-testid="QnA Section"
        >
            <h2
                className="text-center text-xl font-bold text-secondary underline underline-offset-4 antialiased mobile-md:text-2xl mobile-lg:text-3xl tablet-md:text-4xl tablet-lg:text-start tablet-lg:text-3xl laptop-sm:text-4xl laptop-md:text-[2.5rem] laptop-lg:text-[2.75rem]"
                style={{
                    textShadow:
                        '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                }}
                aria-label={`שאלה מספר ${number}`}
                data-testid="QnA Question"
            >
                {question}
            </h2>
            <p
                className="text-justify text-base font-medium text-text [text-align-last:center] mobile-lg:text-lg tablet-md:text-xl tablet-lg:pl-10 tablet-lg:text-start tablet-lg:text-base tablet-lg:[text-align-last:start] laptop-sm:text-lg laptop-md:text-xl"
                aria-label={`תשובה לשאלה מספר ${number}`}
                data-testid="QnA Answer"
            >
                {answer}
            </p>
        </section>
    );
}
