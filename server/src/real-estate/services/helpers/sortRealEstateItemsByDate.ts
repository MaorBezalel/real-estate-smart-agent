import { RealEstate } from '../../dtos/real-estate.dto';

export const sortRealEstateItemsByDate = (realEstateItems: RealEstate[]): RealEstate[] => {
    return realEstateItems.sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
}