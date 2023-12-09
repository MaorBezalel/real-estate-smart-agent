type SearchResultsHeaderProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
>;

export default function SearchResultsHeader({
    children,
    ...rest
}: SearchResultsHeaderProps): React.JSX.Element {
    return (
        <header
            className="flex flex-col justify-center gap-2
            tablet-lg:flex-row tablet-lg:items-start tablet-lg:justify-between tablet-lg:gap-2"
            {...rest}
        >
            {children}
        </header>
    );
}
