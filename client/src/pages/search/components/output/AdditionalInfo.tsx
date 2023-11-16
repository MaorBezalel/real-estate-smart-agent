type AdditionalInfoProps = {
    estateType: string;
    rooms: number;
    floor: number | 'קרקע';
    area: number;
};

export default function AdditionalInfo({
    estateType,
    rooms,
    floor,
    area,
}: AdditionalInfoProps): React.JSX.Element {
    const labelIds = ['estate-type', 'rooms', 'floor', 'area'];
    const labels = ['סוג נכס', 'חדרים', 'קומה', 'מ"ר'];
    const values = [estateType, rooms, floor, area];

    return (
        <div
            className="flex justify-between
            tablet-lg:order-2 tablet-lg:gap-8"
        >
            {labels.map((label, index) => (
                <div
                    className="flex flex-col items-center justify-between
                    tablet-lg:gap-2"
                >
                    <data
                        className="font-semibold text-text
                        mobile-lg:text-lg
                        tablet-sm:text-xl
                        tablet-lg:text-lg
                        laptop-sm:text-xl
                        laptop-md:text-2xl"
                        key={labelIds[index]}
                        aria-labelledby={labelIds[index]}
                        value={values[index]}
                    >
                        {values[index]}
                    </data>
                    <label
                        className="text-sm text-text opacity-80
                        mobile-lg:text-base
                        tablet-sm:text-lg
                        tablet-lg:text-base
                        laptop-sm:text-lg
                        laptop-md:text-xl"
                        id={labelIds[index]}
                    >
                        {label}
                    </label>
                </div>
            ))}
        </div>
    );
}
