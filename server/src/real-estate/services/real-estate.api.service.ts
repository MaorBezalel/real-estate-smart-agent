import { Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map, catchError, lastValueFrom } from "rxjs";

import { InitialYad2RealEstateResponse, FinalYad2RealEstateResponse, Yad2CityCodeResponse, Yad2RealEstateItem, Yad2AdvertisementItem } from "../types/yad2.responses";
import { InitialSearchFilter, FinalSearchFilter } from "../types/search-filter.objects";
import { RealEstate } from "../dtos/real-estate.item.dto";
import { YAD2_REQUEST_HEADERS } from "./constants/request-headers.constants";

/**
 * Service for fetching real estate data from Yad2 API.
*/
@Injectable()
export class RealEstateApiService {
    /**
     * Constructor for RealEstateApiService.
     * @param httpService HttpService instance for making HTTP requests.
    */
    constructor(private readonly httpService: HttpService) { }

    /**
     * Fetches the initial search results from Yad2 API.
     * @param initialSearchFilter The initial search filter.
     * @returns The initial search results.
    */
    async fetchInitialSearchResults(initialSearchFilter: InitialSearchFilter): Promise<FinalYad2RealEstateResponse> {
        const finalSearchFilter: FinalSearchFilter = {
            type: initialSearchFilter.type,
            city: initialSearchFilter.city,
            city_code: await this.fetchCityCodeFromYad2(initialSearchFilter.city),
            min_price: initialSearchFilter.min_price,
            max_price: initialSearchFilter.max_price,
            page: 1
        }
        const url: string = this.generateRequestUrlForYad2(finalSearchFilter);

        return await this.fetchDataFromYad2(url, finalSearchFilter);
    }

    /**
     * Fetches the updated search results from Yad2 API.
     * @param updatedSearchFilter The updated search filter.
     * @returns The updated search results.
    */
    async fetchUpdatedSearchResults(updatedSearchFilter: FinalSearchFilter): Promise<FinalYad2RealEstateResponse> {
        const url: string = this.generateRequestUrlForYad2(updatedSearchFilter);
        return await this.fetchDataFromYad2(url, updatedSearchFilter);
    }

    /**
     * Fetches the data from Yad2 API.
     * @param url The URL to fetch the data from.
     * @param searchFilter The search filter used to fetch the data.
     * @returns The data fetched from Yad2 API.
     * @throws ServiceUnavailableException if the Yad2 API is not available.
    */
    async fetchDataFromYad2(url: string, searchFilter: FinalSearchFilter): Promise<FinalYad2RealEstateResponse> {
        return await lastValueFrom(this.httpService.get<InitialYad2RealEstateResponse>(url, {
            headers: YAD2_REQUEST_HEADERS
        })
            .pipe(
                map(res => res.data?.data.feed),
                map(feed => {
                    return {
                        data: {
                            feed_items: feed.feed_items.map(item => this.extractOnlyRealEstateData(item)).filter(item => item),
                            searchFilter,
                            total_pages: feed.total_pages
                        },
                        message: 'OK'
                    }
                })
            )
            .pipe(
                catchError(_ => {
                    throw new ServiceUnavailableException('Yad2 API not available, please try again later');
                })
            ));
    }

    /**
     * Generates a request URL for Yad2 API.
     * @param searchFilter The search filter to generate the URL from.
     * @returns The request URL for Yad2 API.
    */
    generateRequestUrlForYad2(searchFilter: FinalSearchFilter): string {
        const baseUrl = process.env.YAD2_REAL_ESTATE_REQUEST_URL;
        const typeField = searchFilter.type;
        const cityField = `city=${searchFilter.city_code}`;
        const propertyGroupField = 'propertyGroup=apartments,houses';
        const priceField = `price=${searchFilter.min_price}-${searchFilter.max_price}`;
        const pageField = `page=${(searchFilter.page >= 0) ? searchFilter.page : 1}`;
        const forceLdLoadField = 'forceLdLoad=true';

        return `${baseUrl}/${typeField}?${cityField}&${propertyGroupField}&${priceField}&${pageField}&${forceLdLoadField}`;
    }

    /**
     * Fetches the city code from Yad2 API.
     * @param city The city to fetch the code for.
     * @returns The city code.
     * @throws NotFoundException if the city is not found.
     * @throws ServiceUnavailableException if the Yad2 API is not available.
    */
    async fetchCityCodeFromYad2(city: string): Promise<string> {
        return await lastValueFrom(this.httpService.get<Yad2CityCodeResponse[]>(
            `${process.env.YAD2_CITY_CODE_REQUEST_URL}?text=${encodeURIComponent(city)}`, {
            headers: YAD2_REQUEST_HEADERS
        })
            .pipe(
                map(res => {
                    if (!res.data?.length) throw new NotFoundException(`City ${city} not found`);
                    return res.data[0].value.city;
                })
            )
            .pipe(
                catchError(error => {
                    if (error instanceof NotFoundException) throw error;
                    throw new ServiceUnavailableException('Yad2 API not available, please try again later');
                })
            ));
    }

    /**
     * Extracts only the necessary real estate data from the item.
     * @param item The item to extract the real estate data from.
     * @returns The real estate data of the item.
    */
    extractOnlyRealEstateData(item: Yad2RealEstateItem | Yad2AdvertisementItem): RealEstate {
        // Some items serve as ads and don't have any 
        // real estate data so we want to filter them out
        if (!this.isYad2RealEstateItem(item)) return;

        // We don't want items that are being sold by a real estate agent because they are randomly placed in the feed
        // with little regard to what page they are on (i.e. they are not sorted by date and thus aren't affected by it)
        if (item.highlight_text === 'תיווך') return;

        return {
            id: item.id,
            type: item.title_2,
            street: item.title_1,
            neighborhood: item.neighborhood,
            city: item.city,
            rooms: item.row_4[0].value,
            floor: item.row_4[1].value,
            squareMeters: item.row_4[2].value,
            updatedAt: item.date,
            price: item.price
        }
    }

    /**
     * Determines if the given item is a Yad2RealEstateItem.
     * @param item The item to check.
     * @returns True if the item is a RealEstateItemDto, false otherwise.
    */
    isYad2RealEstateItem(item: Yad2RealEstateItem | Yad2AdvertisementItem): item is Yad2RealEstateItem {
        return 'id' in item
    }
}
