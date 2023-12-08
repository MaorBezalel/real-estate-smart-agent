import { extractOnlyRealEstateData } from "..";
import { RealEstate } from "../../dtos/real-estate.dto";
import { Yad2RealEstateResponse, Yad2RealEstateItem } from "../../types";

describe("extractOnlyRealEstateData", () => {
    it("should filter out non-real estate items and items sold by real estate agents", () => {
        // Setup
        const yad2Data: Yad2RealEstateResponse = fakeYad2Data1();

        // Expect
        const expectedRealEstateData: RealEstate[] = expectedRealEstateData1();

        // Action
        const result = extractOnlyRealEstateData(yad2Data);

        // Assert
        expect(result).toStrictEqual(expectedRealEstateData);
    });

    it("should return an empty array if there are only non-real estate items and items sold by real estate agents", () => {
        const yad2Data: Yad2RealEstateResponse = fakeYad2Data2();

        const expectedRealEstateData: RealEstate[] = expectedRealEstateData2();

        const result = extractOnlyRealEstateData(yad2Data);

        expect(result).toStrictEqual(expectedRealEstateData);
    });
});


const fakeYad2Data1 = (): Yad2RealEstateResponse => {
    return {
        data: {
            feed: {
                feed_items: [
                    {
                        id: "1",
                        title_2: "Apartment",
                        title_1: "123 Main St",
                        neighborhood: "Example Neighborhood",
                        city: "Example City",
                        row_4: [
                            { value: "2" },
                            { value: 1 },
                            { value: 80 }
                        ],
                        price: '200,000 ₪',
                        date: "2022-01-01",
                        highlight_text: ""
                    },
                    {
                        id: "2",
                        title_2: "House",
                        title_1: "456 Elm St",
                        neighborhood: "Example Neighborhood",
                        city: "Example City",
                        row_4: [
                            { value: "3" },
                            { value: 2 },
                            { value: 120 }
                        ],
                        price: '300,000 ₪',
                        date: "2022-01-02",
                        highlight_text: "תיווך"
                    },
                    {
                        type: 'ad',
                    }
                ],
                current_page: 1,
                total_pages: 7,
            }
        }
    };
}
const expectedRealEstateData1 = (): RealEstate[] => {
    const fakeYad2DataItem: Yad2RealEstateItem = fakeYad2Data1().data.feed.feed_items[0] as Yad2RealEstateItem;
    return [
        {
            status: 'default',
            linkToken: fakeYad2DataItem.id,
            estateType: fakeYad2DataItem.title_2,
            street: fakeYad2DataItem.title_1,
            neighborhood: fakeYad2DataItem.neighborhood,
            settlement: fakeYad2DataItem.city,
            rooms: fakeYad2DataItem.row_4[0].value,
            floor: fakeYad2DataItem.row_4[1].value as number | 'קרקע',
            squareMeters: fakeYad2DataItem.row_4[2].value,
            price: fakeYad2DataItem.price,
            updatedAt: fakeYad2DataItem.date
        }
    ]
}

const fakeYad2Data2 = (): Yad2RealEstateResponse => {
    return {
        data: {
            feed: {
                feed_items: [
                    {
                        id: "3",
                        title_2: "Apartment",
                        title_1: "789 Main St",
                        neighborhood: "Example Neighborhood",
                        city: "Example City",
                        row_4: [
                            { value: "2" },
                            { value: 1 },
                            { value: 80 }
                        ],
                        price: '200,000 ₪',
                        date: "2022-01-01",
                        highlight_text: "תיווך"
                    },
                    {
                        id: "4",
                        title_2: "House",
                        title_1: "012 Elm St",
                        neighborhood: "Example Neighborhood",
                        city: "Example City",
                        row_4: [
                            { value: "3" },
                            { value: 2 },
                            { value: 120 }
                        ],
                        price: '300,000 ₪',
                        date: "2022-01-02",
                        highlight_text: "תיווך"
                    },
                    {
                        type: 'ad',
                    }
                ],
                current_page: 2,
                total_pages: 7,
            }
        }
    };
}
const expectedRealEstateData2 = (): RealEstate[] => [];