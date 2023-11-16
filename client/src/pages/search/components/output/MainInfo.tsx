import { unformatPrice, shortenDate } from '../../utils/helpers';

type MainInfoProps = {
    price: string; // comes with a shekel sign
    lastUpdated: Date;
};

export default function MainInfo({
    price,
    lastUpdated,
}: MainInfoProps): React.JSX.Element {
    return (
        <div
            className="flex items-center justify-between
            tablet-lg:order-3 tablet-lg:flex-col tablet-lg:gap-2"
        >
            <data
                className="text-xl font-bold text-primary
                mobile-lg:text-2xl
                tablet-sm:text-3xl
                tablet-lg:text-2xl
                laptop-md:text-3xl
                laptop-lg:text-4xl"
                style={{
                    textShadow:
                        '1px 1px 0 #001f24, -1px -1px 0 #001f24, 1px -1px 0 #001f24, -1px 1px 0 #001f24, 1px 1px 0 #001f24',
                }}
                aria-label="מחיר הנכס"
                value={unformatPrice(price)}
            >
                {price}
            </data>
            <time
                className="text-lg font-medium text-secondary
                mobile-lg:text-xl
                tablet-sm:text-2xl
                tablet-lg:text-xl
                laptop-md:text-2xl"
                style={{
                    textShadow:
                        '1px 1px 0 #001f24, -1px -1px 1px #001f24, 1px -1px 1px #001f24, -1px 1px 1px #001f24, 1px 1px 1px #001f24',
                }}
                aria-label="תאריך עדכון אחרון"
                dateTime={lastUpdated.toISOString()}
            >
                {shortenDate(lastUpdated)}
            </time>
        </div>
    );
}
