import {
    Controller,
    Get,
    Delete,
    Param,
    Query,
    HttpCode,
    HttpStatus,
    NotFoundException,
    ServiceUnavailableException,
    InternalServerErrorException,

} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiNotFoundResponse,
    ApiServiceUnavailableResponse,
    ApiInternalServerErrorResponse,
    ApiParam,
    ApiQuery,
    ApiOkResponse,
    ApiNoContentResponse,
} from '@nestjs/swagger';

import { RealEstateApiService } from '../services/real-estate.api.service';
import { RealEstateDbService } from '../services/real-estate.db.service';

import {
    ApiServiceInitialRequestParams,
    ApiServiceUpdatedRequestParams,
    ApiServiceResponse,
} from '../services/types';

import {
    GetInitialSearchResultsResponse,
    GetUpdatedSearchResultsResponse,
} from '../dtos/responses.dto';

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
        private readonly realEstateDbService: RealEstateDbService,
    ) { }

    /**
     * Fetches the initial search results from Yad2 API and saves them in the database.
     * @param {'forsale' | 'rent'} dealType The deal type of the real estate (forsale or rent).
     * @param {string} city The name of the city of the real estate.
     * @param {number} minPrice The minimum price of the real estate.
     * @param {number} maxPrice The maximum price of the real estate.
     * @throws NotFoundException if the data for the requested city was not found.
     * @throws NotFoundException if the page is not found.
     * @throws ServiceUnavailableException if the Yad2 API is not available.
     * @throws InternalServerErrorException if an error occurred while inserting the document to the database.
     * @returns {Promise<GetInitialSearchResultsResponse>} A promise that resolves to the fetched data.
     */
    @Get('search/:dealType')
    @HttpCode(HttpStatus.OK)
    @ApiTags('real-estate')
    @ApiOperation({
        summary:
            'Fetches the initial search results from Yad2 API and saves them in the database.',
    })
    @ApiParam({
        name: 'dealType',
        description: 'The type of the real estate (forsale or rent).',
        required: true,
    })
    @ApiQuery({
        name: 'city',
        description: 'The city of the real estate.',
        required: true,
    })
    @ApiQuery({
        name: 'minPrice',
        description: 'The minimum price of the real estate.',
        required: true,
    })
    @ApiQuery({
        name: 'maxPrice',
        description: 'The maximum price of the real estate.',
        required: true,
    })
    @ApiQuery({
        name: 'page',
        description: 'The page number to fetch data from.',
        required: false,
    })
    @ApiOkResponse({
        description: 'The initial search results were fetched and saved in the database successfully.',
        type: GetInitialSearchResultsResponse,
    })
    @ApiNotFoundResponse({
        description: 'The data for the requested city was not found.',
    })
    @ApiServiceUnavailableResponse({
        description: 'The Yad2 API is not available.',
    })
    @ApiInternalServerErrorResponse({
        description: 'An error occurred while inserting the document to the database.',
    })
    async getInitialSearchResults(
        @Param('dealType') dealType: 'forsale' | 'rent',
        @Query('city') city: string,
        @Query('minPrice') minPrice: number,
        @Query('maxPrice') maxPrice: number,
        @Query('page') page?: number,
    ): Promise<GetInitialSearchResultsResponse> {
        console.log(dealType, city, minPrice, maxPrice, page);
        const requestParams: ApiServiceInitialRequestParams = {
            dealType,
            city,
            minPrice,
            maxPrice,
            page: page || 1,
        };
        const response: ApiServiceResponse = await this.realEstateApiService.fetchInitialRealEstateData(requestParams);
        const document = await this.realEstateDbService.insertNewDocument({
            items: response.feed_items,
            search_params: response.search_params,
            total_pages: response.total_pages,
        });
        const searchId: string = document._id.toString();

        return {
            search_id: searchId,
            items: response.feed_items,
            total_pages: response.total_pages,
        };
    }

    /**
     * Fetches the updated search results from Yad2 API and updates them in the database.
     * @param {string} searchId The ID of the search.
     * @throws NotFoundException if a MongoDB document with the given ID was not found.
     * @throws ServiceUnavailableException if the Yad2 API is not available.
     * @returns {Promise<GetUpdatedSearchResultsResponse>} A promise that resolves to the fetched data.
     */
    @Get('update')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Fetches the updated search results from Yad2 API and updates them in the database.',
    })
    @ApiQuery({
        name: 'searchId',
        description:
            'The ID of the search which serves as the _id of the MongoDB document to update.',
        required: true,
    })
    @ApiOkResponse({
        description: 'The updated search results were fetched and updated in the database successfully.',
        type: GetUpdatedSearchResultsResponse,
    })
    @ApiNotFoundResponse({
        description: 'A MongoDB document with the given ID was not found.',
    })
    @ApiServiceUnavailableResponse({
        description: 'The Yad2 API is not available.',
    })
    async getUpdatedSearchResults(@Query('searchId') searchId: string): Promise<GetUpdatedSearchResultsResponse> {
        const document = await this.realEstateDbService.getDocumentById(searchId);
        const response = await this.realEstateApiService.fetchUpdatedRealEstateData(
            document.search_params as ApiServiceUpdatedRequestParams,
            document
        );

        await this.realEstateDbService.updateDocumentById(searchId, {
            items: response.feed_items,
            search_params: response.search_params,
            total_pages: response.total_pages,
        });

        return {
            items: response.feed_items,
            search_params: response.search_params,
            total_pages: response.total_pages,
        };
    }

    /**
     * Cancels the search and deletes it from the database.
     * @param {string} searchId The ID of the search.
     * @throws NotFoundException if a MongoDB document with the given ID was not found.
     */
    @Delete('cancel')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary:
            'Cancels the Smart Agent search and deletes the latest search results from the database.',
    })
    @ApiQuery({
        name: 'searchId',
        description:
            'The ID of the search which serves as the _id of the MongoDB document to delete.',
    })
    @ApiNoContentResponse({
        description: 'The search was cancelled and the document was deleted from the database successfully.',
    })
    @ApiNotFoundResponse({
        description: 'A MongoDB document with the given ID was not found.',
    })
    async cancelSearch(@Query('searchId') searchId: string): Promise<void> {
        await this.realEstateDbService.deleteDocumentById(searchId);
    }
}