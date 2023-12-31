import { forwardRef } from 'react';
import { useBoolean } from '@common/hooks';

import { StatusIcon, InfoTooltip, PriceUpdateInfo, Address, AdditionalInfo } from '@features/real-estate-item/components';
import Separator from '@common/components/separator/RealEstateItemSeparator';

import { RealEstateDto } from '@common/data/dtos/real-estate.dto';
import { TEST_ID } from '@common/data/constants/testIds';

type RealEstateItemProps = RealEstateDto;

const RealEstateItem = forwardRef<HTMLLIElement, RealEstateItemProps>(
    (
        {
            status,
            linkToken,
            price,
            updatedAt: lastUpdated,
            estateType,
            rooms,
            floor,
            squareMeters: area,
            street,
            neighborhood,
            settlement,
        },
        ref
    ): React.JSX.Element => {
        const { value: isHovered, setTrue: setIsHoveredToTrue } = useBoolean(false);

        return (
            <li className="w-full" ref={ref}>
                <a
                    className="group relative flex h-full w-full flex-col gap-2 rounded-md border border-solid border-text bg-white p-4 shadow-lg transition-all duration-200 ease-in-out
                    hover:z-10 hover:scale-105 hover:border-[3px] hover:border-accent hover:brightness-110 hover:drop-shadow-2xl
                    data-[status=new]:border-[3px] data-[status=updated]:border-[3px]
                    data-[status=new]:border-green-400 data-[status=updated]:border-blue-400
                    mobile-md:gap-3
                    tablet-lg:grid tablet-lg:items-baseline tablet-lg:justify-between tablet-lg:px-6 tablet-lg:py-10 tablet-lg:[grid-template-columns:1fr_1fr_1fr]"
                    href={`https://www.yad2.co.il/item/${linkToken}`}
                    target="_blank"
                    rel="noreferrer"
                    role="article"
                    data-status={isHovered ? 'default' : status}
                    data-testid={TEST_ID.FEATURE.REAL_ESTATE_ITEM}
                    onMouseEnter={() => setIsHoveredToTrue()}
                >
                    <StatusIcon status={status} />
                    <InfoTooltip />
                    <PriceUpdateInfo price={price} lastUpdated={new Date(lastUpdated)} />
                    <Address street={street} neighborhood={neighborhood} settlement={settlement} />
                    <Separator />
                    <AdditionalInfo estateType={estateType} rooms={rooms} floor={floor as number | 'קרקע'} area={area} />
                </a>
            </li>
        );
    }
);

export default RealEstateItem;
