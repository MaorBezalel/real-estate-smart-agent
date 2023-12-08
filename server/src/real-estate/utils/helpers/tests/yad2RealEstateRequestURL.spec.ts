import { yad2RealEstateRequestURL } from "..";
import { Yad2RealEstateRequestParams } from "../../types";

describe("yad2RealEstateRequestURL", () => {
    it("should generate the correct request URL", () => {
        // Setup
        const baseURL = fakeBaseURL();
        const searchParams = fakeSearchParams1();

        // Expect
        const expectedURL = expectedURL1();

        // Action
        const result = yad2RealEstateRequestURL(baseURL, searchParams);

        // Assert
        expect(result).toBe(expectedURL);
    });

    it("should handle negative page numbers and default to page 1", () => {
        // Setup
        const baseURL = fakeBaseURL();
        const searchParamsWithNegativePage: Yad2RealEstateRequestParams = fakeSearchParams2();

        // Expect
        const expectedURL = expectedURL2();

        // Action
        const result = yad2RealEstateRequestURL(baseURL, searchParamsWithNegativePage);

        // Assert
        expect(result).toBe(expectedURL);
    });
});


const fakeBaseURL = (): string => 'https://example.com';

const fakeSearchParams1 = (): Yad2RealEstateRequestParams => ({
    dealType: 'rent',
    cityCode: '5000',
    minPrice: 1000,
    maxPrice: 2000,
    page: 10
});
const expectedURL1 = (): string => 'https://example.com/rent?city=5000&propertyGroup=apartments,houses&price=1000-2000&page=10&forceLdLoad=true';

const fakeSearchParams2 = (): Yad2RealEstateRequestParams => ({
    dealType: 'rent',
    cityCode: '5000',
    minPrice: 1000,
    maxPrice: 2000,
    page: -1
});
const expectedURL2 = (): string => 'https://example.com/rent?city=5000&propertyGroup=apartments,houses&price=1000-2000&page=1&forceLdLoad=true';
