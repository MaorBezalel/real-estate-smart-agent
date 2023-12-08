import { Injectable, NotFoundException, ServiceUnavailableException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { map, catchError, lastValueFrom } from "rxjs";

import { RealEstate } from "../utils/dtos/real-estate.dto";
import { RealEstateDocumentModel } from "../models/real-estate-document.model";

import {
    ApiServiceInitialRequestParams,
    ApiServiceUpdatedRequestParams,
    ApiServiceResponse,
    Yad2RealEstateResponse,
    Yad2CityCodeResponse,
    Yad2RealEstateRequestParams,
} from "../utils/types";

import {
    yad2RealEstateRequestURL,
    extractOnlyRealEstateData,
    detectChanges,
    removeDuplicates
} from "../utils/helpers";

import { YAD2_REQUEST_HEADERS } from "../utils/constants/request-headers.constants";

/**
 * Service for fetching real estate data from Yad2 API.
*/
@Injectable()
export class RealEstateApiService {
    /**
     * Constructor for RealEstateApiService.
     * @param {HttpService} httpService HttpService instance for making HTTP requests.
    */
    constructor(private readonly httpService: HttpService) { }

    /**
     * Fetches the initial real estate data based on the provided request parameters.
     * @param {ApiServiceInitialRequestParams} requestParams The request parameters for fetching the data.
     * @returns {Promise<ApiServiceResponse>} A promise that resolves to the fetched data.
     * @throws NotFoundException if the settlement is not found.
     * @throws NotFoundException if the page is not found.
     * @throws ServiceUnavailableException if the Yad2 API is not available.
    */
    async fetchInitialRealEstateData(
        requestParams: ApiServiceInitialRequestParams
    ): Promise<ApiServiceResponse> {
        const { settlement, ...commonSearchParams } = requestParams;
        const yad2RequestSearchParams: Yad2RealEstateRequestParams = {
            ...commonSearchParams,
            cityCode: await this.fetchcityCodeFromYad2(requestParams.settlement)
        };
        const url = yad2RealEstateRequestURL(process.env.YAD2_REAL_ESTATE_REQUEST_URL, yad2RequestSearchParams);

        const yad2Data: Yad2RealEstateResponse = await this.fetchYad2RealEstateData(url);
        const realEstateData: RealEstate[] = extractOnlyRealEstateData(yad2Data);
        const uniqueRealEstateData: RealEstate[] = removeDuplicates(realEstateData);

        return {
            feed_items: uniqueRealEstateData,
            search_params: {
                ...requestParams,
                cityCode: yad2RequestSearchParams.cityCode
            },
            total_pages: yad2Data.data.feed.total_pages
        }
    }

    /**
     * Fetches the updated real estate data based on the provided request parameters.
     * @param {ApiServiceUpdatedRequestParams} requestParams The request parameters for fetching the data.
     * @param {RealEstateDocumentModel} previousData The previous data fetched from the database.
     * @returns {Promise<ApiServiceResponse>} A promise that resolves to the fetched data.
     * @throws NotFoundException if the page is not found.
     * @throws ServiceUnavailableException if the Yad2 API is not available.
    */
    async fetchUpdatedRealEstateData(
        requestParams: ApiServiceUpdatedRequestParams,
        previousData: RealEstateDocumentModel
    ): Promise<ApiServiceResponse> {
        const url = yad2RealEstateRequestURL(process.env.YAD2_REAL_ESTATE_REQUEST_URL, requestParams);

        const yad2Data = await this.fetchYad2RealEstateData(url);
        const realEstateData: RealEstate[] = extractOnlyRealEstateData(yad2Data);
        const uniqueRealEstateData: RealEstate[] = removeDuplicates(realEstateData);
        const changedRealEstateData: RealEstate[] = detectChanges(previousData.items, uniqueRealEstateData);

        return {
            feed_items: changedRealEstateData,
            search_params: previousData.search_params,
            total_pages: yad2Data.data.feed.total_pages
        }
    }

    /**
     * Fetches Yad2 real estate data from the specified URL.
     * @param url - The URL to fetch the data from.
     * @returns A promise that resolves to a Yad2RealEstateResponse object.
     * @throws NotFoundException if the page is not found.
     * @throws ServiceUnavailableException if the Yad2 API is not available.
     */
    async fetchYad2RealEstateData(url: string): Promise<Yad2RealEstateResponse> {
        return await lastValueFrom(this.httpService.get<Yad2RealEstateResponse>(url, {
            headers: YAD2_REQUEST_HEADERS
        })
            .pipe(
                map(res => {
                    if (res.data.data.feed.current_page > res.data.data.feed.total_pages) {
                        throw new NotFoundException(`Page ${res.data.data.feed.current_page} not found (total pages: ${res.data.data.feed.total_pages})`);
                    }
                    return res.data;
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
     * Fetches the settlement code from Yad2 API.
     * @param settlement The settlement to fetch the code for.
     * @returns The settlement code.
     * @throws NotFoundException if the settlement is not found.
     * @throws ServiceUnavailableException if the Yad2 API is not available.
    */
    async fetchcityCodeFromYad2(settlement: string): Promise<string> {
        return await lastValueFrom(this.httpService.get<Yad2CityCodeResponse[]>(
            `${process.env.YAD2_SETTLEMENT_CODE_REQUEST_URL}?text=${encodeURIComponent(settlement)}`, {
            headers: YAD2_REQUEST_HEADERS
        })
            .pipe(
                map(res => {
                    if (!res.data?.length) throw new NotFoundException(`Settlement ${settlement} not found`);
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
}
