type QuestionAnswerProps = {
    number: number;
    question: string;
    answer: string;
};

export default function QuestionAnswer({
    number,
    question,
    answer,
}: QuestionAnswerProps): React.JSX.Element {
    return (
        <section
            className="flex flex-col gap-2"
            aria-label={`שאלה ותשובה מספר ${number}`}
        >
            <h2
                className="text-center text-xl font-bold text-secondary underline underline-offset-4 antialiased mobile-md:text-2xl mobile-lg:text-3xl tablet-md:text-4xl tablet-lg:text-start tablet-lg:text-3xl laptop-sm:text-4xl laptop-md:text-[2.5rem] laptop-lg:text-[2.75rem]"
                style={{
                    textShadow:
                        '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                }}
            >
                {question}
            </h2>
            <p className="text-justify text-base font-medium text-text [text-align-last:center] mobile-lg:text-lg tablet-md:text-xl tablet-lg:pl-10 tablet-lg:text-start tablet-lg:text-base tablet-lg:[text-align-last:start] laptop-sm:text-lg laptop-md:text-xl">
                {answer}
            </p>
        </section>
    );
}
