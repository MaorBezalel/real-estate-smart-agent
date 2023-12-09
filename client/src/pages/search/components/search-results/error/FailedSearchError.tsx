type FailedSearchErrorProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
>;

export default function FailedSearchError({
    children,
    ...rest
}: FailedSearchErrorProps): React.JSX.Element {
    return (
        <section
            className="flex flex-col gap-4
            tablet-lg:grid tablet-lg:grid-cols-[1fr,1fr]
            laptop-sm:grid-cols-[45%,55%]"
            id="error-message"
            {...rest}
        >
            {children}
        </section>
    );
}
