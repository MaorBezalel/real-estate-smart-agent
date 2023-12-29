import { formatDate } from '../helpers';

type PriceUpdateInfoProps = {
    price: string;
    lastUpdated: Date;
};

export default function PriceUpdateInfo({
    price,
    lastUpdated,
}: PriceUpdateInfoProps): React.JSX.Element {
    return (
        <div
            className="flex items-center justify-between
            tablet-lg:order-3 tablet-lg:flex-col tablet-lg:items-end tablet-lg:gap-2"
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
                value={price}
            >
                {price}
            </data>
            <time
                className="flex flex-col text-base font-medium text-secondary
                mobile-lg:hidden"
                style={{
                    textShadow:
                        '1px 1px 0 #001f24, -1px -1px 1px #001f24, 1px -1px 1px #001f24, -1px 1px 1px #001f24, 1px 1px 1px #001f24',
                }}
                aria-label="תאריך עדכון אחרון"
                dateTime={lastUpdated.toISOString()}
            >
                <span>{formatDate(lastUpdated).split(' ')[0]}</span>
                <span>{formatDate(lastUpdated).split(' ')[1]}</span>
            </time>
            <time
                className="hidden
                mobile-lg:flex mobile-lg:flex-col mobile-lg:text-base mobile-lg:font-medium mobile-lg:text-secondary
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
                {formatDate(lastUpdated)}
            </time>
        </div>
    );
}
