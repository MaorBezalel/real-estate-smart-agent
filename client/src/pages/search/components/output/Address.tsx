type AddressProps = {
    street: string;
    neighborhood: string;
    city: string;
};

export default function Address({
    street,
    neighborhood,
    city,
}: AddressProps): React.JSX.Element {
    return (
        <div
            className="flex flex-col
            tablet-lg:order-1 tablet-lg:justify-between tablet-lg:gap-2"
        >
            <data
                className="font-semibold text-text
                mobile-lg:text-lg
                tablet-sm:text-xl
                tablet-lg:text-lg
                laptop-sm:text-xl
                laptop-md:text-2xl
                laptop-lg:text-3xl"
                aria-label="רחוב הנכס"
                value={street}
            >
                {street}
            </data>
            <data
                className="text-sm text-text
                mobile-lg:text-base
                tablet-sm:text-lg
                tablet-lg:text-base
                laptop-sm:text-lg
                laptop-md:text-xl"
                aria-label="שכונה ועיר הנכס"
                value={[neighborhood, city]}
            >
                {`${neighborhood}, ${city}`}
            </data>
        </div>
    );
}
