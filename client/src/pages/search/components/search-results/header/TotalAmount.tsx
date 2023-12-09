type TotalAmountProps = {
    totalAmount: number;
};

export default function TotalAmount({
    totalAmount,
}: TotalAmountProps): React.JSX.Element {
    return (
        <div className="flex items-baseline gap-2 self-center tablet-lg:self-auto">
            <label
                className="inline-block min-w-max text-2xl font-extrabold text-secondary underline underline-offset-4 antialiased
                mobile-md:text-3xl
                mobile-lg:text-[2rem]
                tablet-md:text-4xl
                tablet-lg:text-[2.5rem]"
                style={{
                    textShadow:
                        '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                }}
            >
                כמות הנכסים:{' '}
            </label>
            <data
                className="text-2xl text-primary
                mobile-md:text-3xl
                mobile-lg:text-[2rem]
                tablet-md:text-4xl
                tablet-lg:text-[2.5rem]"
                style={{
                    textShadow:
                        '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                }}
                value={totalAmount}
            >
                {totalAmount}
            </data>
        </div>
    );
}
