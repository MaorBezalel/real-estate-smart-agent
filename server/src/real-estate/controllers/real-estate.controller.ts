import { Controller, Get, Delete, Param, Query, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiNotFoundResponse, ApiServiceUnavailableResponse, ApiInternalServerErrorResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

import { RealEstateApiService } from '../services/real-estate.api.service';
import { RealEstateDbService } from '../services/real-estate.db.service';

import { InitialSearchFilter, FinalSearchFilter } from '../types/search-filter.objects';
import { FinalYad2RealEstateResponse } from '../types/yad2.responses';

import { GetInitialSearchResultsResponse, GetUpdatedSearchResultsResponse } from '../dtos/real-estate.responses.dto';

/**
 * Controller for the real estate API.
*/
@ApiTags('real-estate')
@Controller('real-estate')
export class RealEstateController {
    /**
     * Constructor for RealEstateController.
     * @param realEstateApiService RealEstateApiService instance for fetching data from Yad2 API.
     * @param realEstateDbService RealEstateDbService instance for fetching data from the database.
    */
    constructor(
        private readonly realEstateApiService: RealEstateApiService,
        private readonly realEstateDbService: RealEstateDbService
    ) { }

    /**
     * Fetches the initial search results from Yad2 API and saves them in the database.
     * @param type The type of the real estate (forsale or rent).
     * @param city The city of the real estate.
     * @param min_price The minimum price of the real estate.
     * @param max_price The maximum price of the real estate.
     * @throws NotFoundException if the data for the requested city was not found.
     * @throws ServiceUnavailableException if the Yad2 API is not available.
     * @throws InternalServerErrorException if an error occurred while inserting the document to the database.
     * @returns The initial search results.
    */
    @Get('search/:type')
    @HttpCode(HttpStatus.OK)
    @ApiTags('real-estate')
    @ApiOperation({ summary: 'Fetches the initial search results from Yad2 API and saves them in the database.' })
    @ApiParam({ name: 'type', description: 'The type of the real estate (forsale or rent).', required: true })
    @ApiQuery({ name: 'city', description: 'The city of the real estate.', required: true })
    @ApiQuery({ name: 'minPrice', description: 'The minimum price of the real estate.', required: true })
    @ApiQuery({ name: 'maxPrice', description: 'The maximum price of the real estate.', required: true })
    @ApiQuery({ name: 'page', description: 'The page number to fetch data from.', required: false })
    @ApiResponse({ status: HttpStatus.OK, description: 'The initial search results.', type: GetInitialSearchResultsResponse })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'The data for the requested city was not found.' })
    @ApiServiceUnavailableResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'The Yad2 API is not available.' })
    @ApiInternalServerErrorResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'An error occurred while inserting the document to the database.' })
    async getInitialSearchResults(
        @Param('type') type: 'forsale' | 'rent',
        @Query('city') city: string,
        @Query('minPrice') min_price: number,
        @Query('maxPrice') max_price: number,
        @Query('page') page?: number
    ): Promise<GetInitialSearchResultsResponse> {
        const searchFilter: InitialSearchFilter = {
            type,
            city,
            min_price,
            max_price,
            page: page || 1
        };
        const response: FinalYad2RealEstateResponse = await this.realEstateApiService.fetchInitialSearchResults(searchFilter);
        const searchId: string = (await this.realEstateDbService.insertNewDocument({
            items: response.data.feed_items,
            total_pages: response.data.total_pages,
            search_filter: response.data.searchFilter
        }))._id.toString();

        return {
            search_id: searchId,
            items: response.data.feed_items,
            total_pages: response.data.total_pages
        }
    }

    /**
     * Fetches the updated search results from Yad2 API and updates them in the database.
     * @param searchId The ID of the search.
     * @param page The page number to fetch data from.
     * @throws NotFoundException if the page number is larger than the total number of pages, resulting in a non-existent page.
     * @throws NotFoundException if a MongoDB document with the given ID was not found.
     * @throws ServiceUnavailableException if the Yad2 API is not available.
     * @returns The updated search results.
    */
    @Get('up-to-date')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Fetches the updated search results from Yad2 API and updates them in the database.' })
    @ApiQuery({ name: 'searchId', description: 'The ID of the search which serves as the _id of the MongoDB document to update.' })
    @ApiQuery({ name: 'page', description: 'The page number in Yad2 to fetch data from.' })
    @ApiResponse({ status: 200, description: 'OK', type: GetUpdatedSearchResultsResponse })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'A MongoDB document with the given ID was not found.' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'The page number is larger than the total number of pages, resulting in a non-existent page.' })
    @ApiServiceUnavailableResponse({ status: HttpStatus.SERVICE_UNAVAILABLE, description: 'The Yad2 API is not available.' })
    async getUpdatedSearchResults(
        @Query('searchId') searchId: string,
        @Query('page') page: number
    ): Promise<GetUpdatedSearchResultsResponse> {
        const document = await this.realEstateDbService.getDocumentById(searchId);

        if (page > document.total_pages) {
            throw new NotFoundException(`Page ${page} not found (total pages: ${document.total_pages})`);
        }

        const searchFilter: FinalSearchFilter = {
            ...document.search_filter,
            page
        };
        const response = await this.realEstateApiService.fetchUpdatedSearchResults(searchFilter);
        await this.realEstateDbService.updateDocumentById(searchId, {
            items: response.data.feed_items,
            total_pages: response.data.total_pages,
            search_filter: response.data.searchFilter
        });

        return {
            items: response.data.feed_items,
            search_filter: response.data.searchFilter,
            total_pages: response.data.total_pages
        }
    }

    /**
     * Cancels the search and deletes it from the database.
     * @param searchId The ID of the search.
     * @throws NotFoundException if a MongoDB document with the given ID was not found.
    */
    @Delete('cancel')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Cancels the Smart Agent search and deletes the latest search results from the database.' })
    @ApiQuery({ name: 'searchId', description: 'The ID of the search which serves as the _id of the MongoDB document to delete.' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The search has been cancelled and the latest search results have been deleted from the database successfully.' })
    @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'A MongoDB document with the given ID was not found.' })
    async cancelSearch(@Query('searchId') searchId: string): Promise<void> {
        await this.realEstateDbService.deleteDocumentById(searchId);
    }
}