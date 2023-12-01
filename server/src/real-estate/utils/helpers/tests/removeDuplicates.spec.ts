import { removeDuplicates } from "../removeDuplicates";
import { RealEstate } from "../../dtos/real-estate.dto";

describe("removeDuplicates", () => {
    it("should only remove duplicate items", () => {
        // Setup
        const realEstateItems: RealEstate[] = fakeRealEstateItemsWithDuplicates();
        const duplicateIndex: number = 1;

        // Expect
        const expectedRealEstateItems: RealEstate[] = realEstateItems.filter((_, index) => index !== duplicateIndex);

        // Action
        const filteredItems = removeDuplicates(realEstateItems);

        // Assert
        expect(filteredItems).toStrictEqual(expectedRealEstateItems);
    });

    it("should not remove any items if there are no duplicates", () => {
        // Setup
        const realEstateItems: RealEstate[] = fakeRealEstateItemsWithoutDuplicates();

        // Expect
        const expectedRealEstateItems: RealEstate[] = realEstateItems;

        // Action
        const filteredItems = removeDuplicates(realEstateItems);

        // Assert
        expect(filteredItems).toStrictEqual(expectedRealEstateItems);
    });

    it("should handle empty array and return an empty array", () => {
        // Setup
        const realEstateItems: RealEstate[] = [];

        // Expect
        const expectedRealEstateItems: RealEstate[] = []

        // Action
        const filteredItems = removeDuplicates(realEstateItems);

        // Assert
        expect(filteredItems).toStrictEqual(expectedRealEstateItems);
    });
});

const fakeRealEstateItemsWithDuplicates = (): RealEstate[] => [
    {
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
        updatedAt: '2021-08-01 12:00:01'
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
    }
];

const fakeRealEstateItemsWithoutDuplicates = (): RealEstate[] => [
    {
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
    }
];