import { sortRealEstateItemsByDate } from "..";
import { RealEstate } from "../../dtos/real-estate.dto";

describe("sortRealEstateItemsByDate", () => {
    it("should sort real estate items by date in descending order", () => {
        // Setup
        const realEstateItems: RealEstate[] = fakeRealEstateItems();

        // Expect
        const expectedRealEstateItems: RealEstate[] = [
            realEstateItems[2],
            realEstateItems[1],
            realEstateItems[0],
        ]

        // Action
        const sortedItems = sortRealEstateItemsByDate(realEstateItems);

        // Assert
        expect(sortedItems).toStrictEqual(expectedRealEstateItems);
    });

    it("should handle empty array and return an empty array", () => {
        // Setup
        const realEstateItems: RealEstate[] = [];

        // Expect
        const expectedRealEstateItems: RealEstate[] = []

        // Action
        const sortedItems = sortRealEstateItemsByDate(realEstateItems);

        // Assert
        expect(sortedItems).toStrictEqual(expectedRealEstateItems);
    });

    it("should handle array with one item and return the same array", () => {
        // Setup
        const realEstateItems: RealEstate[] = [fakeRealEstateItems()[0]];

        // Expect
        const expectedRealEstateItems: RealEstate[] = [fakeRealEstateItems()[0]];

        // Action
        const sortedItems = sortRealEstateItemsByDate(realEstateItems);

        // Assert
        expect(sortedItems).toStrictEqual(expectedRealEstateItems);
    });
});

const fakeRealEstateItems = (): RealEstate[] => [{
    status: 'new',
    linkToken: 'vmurovih',
    estateType: 'דירה',
    street: 'הרצל 1',
    neighborhood: 'רמת יוסף',
    city: 'רמת גן',
    rooms: 3,
    floor: 2,
    squareMeters: 80,
    price: '1,000,000 ₪',
    updatedAt: '2021-08-01 12:00:00'
},
{
    status: 'updated',
    linkToken: 'ewfjwef',
    estateType: 'דירה',
    street: 'סוקולוב 40',
    neighborhood: 'אגרובנק',
    city: 'חולון',
    rooms: 4,
    floor: 3,
    squareMeters: 110,
    price: '2,500,000 ₪',
    updatedAt: '2021-08-01 12:05:00'
},
{
    status: 'default',
    linkToken: 'qk0s7rss',
    estateType: 'דירה',
    street: 'שדרות הבעש"ט 9',
    neighborhood: 'רמת אביב',
    city: 'תל אביב יפו',
    rooms: 1.5,
    floor: 'קרקע',
    squareMeters: 27,
    updatedAt: '2021-08-02 11:30:55',
    price: '1,750,000 ₪'
}]