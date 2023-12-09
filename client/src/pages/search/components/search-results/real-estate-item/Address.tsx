type AddressProps = {
    street: string;
    neighborhood: string | undefined;
    settlement: string;
};

export default function Address({
    street,
    neighborhood,
    settlement,
}: AddressProps): React.JSX.Element {
    return (
        <address
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
                aria-label={!!neighborhood ? 'שכונה ועיר הנכס' : 'עיר הנכס'}
                value={!!neighborhood ? [neighborhood, settlement] : settlement}
            >
                {!!neighborhood ? `${neighborhood}, ${settlement}` : settlement}
            </data>
        </address>
    );
}
