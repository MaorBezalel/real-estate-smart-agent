import ExternalLink from './ExternalLink';
import MainInfo from './MainInfo';
import Address from './Address';
import AdditionalInfo from './AdditionalInfo';

type RealEstateItemProps = {
    linkToken: string;
    price: string;
    lastUpdated: Date;
    estateType: string;
    rooms: number;
    floor: number | 'קרקע';
    area: number;
    street: string;
    neighborhood: string;
    city: string;
};

export default function RealEstateItem({
    linkToken,
    price,
    lastUpdated,
    estateType,
    rooms,
    floor,
    area,
    street,
    neighborhood,
    city,
}: RealEstateItemProps): React.JSX.Element {
    return (
        <li className="relative">
            <article
                className="group flex h-full w-full flex-col gap-2 rounded-md border border-solid border-text bg-white p-4 shadow-lg transition-transform duration-200 ease-in-out
                hover:scale-105 hover:brightness-110 hover:drop-shadow-2xl
                mobile-md:gap-3 tablet-lg:flex-row tablet-lg:items-baseline tablet-lg:justify-between tablet-lg:px-6 tablet-lg:py-10"
            >
                <ExternalLink linkToken={linkToken} />
                <MainInfo price={price} lastUpdated={lastUpdated} />
                <Address
                    street={street}
                    neighborhood={neighborhood}
                    city={city}
                />
                <hr
                    className="-mx-4 my-0 block h-[1px] w-[calc(100%+1rem)] self-center border-none bg-accent
                    tablet-lg:hidden"
                />
                <AdditionalInfo
                    estateType={estateType}
                    rooms={rooms}
                    floor={floor}
                    area={area}
                />
            </article>
        </li>
    );
}
