import {
    Controller,
    Get,
    Post,
    Delete,
    Query,
    Req,
    RawBodyRequest,
    HttpCode,
    HttpStatus,
    NotFoundException,
    ServiceUnavailableException,
    InternalServerErrorException,
} from '@nestjs/common';
import * as rawbody from 'raw-body';
import { Request } from 'express';
import {
    ApiTags,
    ApiOperation,
    ApiNotFoundResponse,
    ApiServiceUnavailableResponse,
    ApiInternalServerErrorResponse,
    ApiQuery,
    ApiBody,
    ApiOkResponse,
    ApiNoContentResponse,
} from '@nestjs/swagger';

import { RealEstateApiService } from '../services/real-estate.api.service';
import { RealEstateDbService } from '../services/real-estate.db.service';

import {
    ApiServiceInitialRequestParams,
    ApiServiceUpdatedRequestParams,
    ApiServiceResponse,
} from '../utils/types';

import { getTodayDateTime } from '../utils/helpers';

import {
    GetInitialSearchResultsResponse,
    GetUpdatedSearchResultsResponse,
} from '../utils/dtos/responses.dto';

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
     * @param {string} settlement The name of the settlement of the real estate.
     * @param {number} minPrice The minimum price of the real estate.
     * @param {number} maxPrice The maximum price of the real estate.
     * @throws {NotFoundException} NotFoundException if the data for the requested settlement was not found.
     * @throws {NotFoundException} NotFoundException if the page is not found.
     * @throws {ServiceUnavailableException} ServiceUnavailableException if the Yad2 API is not available.
     * @throws {InternalServerErrorException} InternalServerErrorException if an error occurred while inserting the document to the database.
     * @returns {Promise<GetInitialSearchResultsResponse>} A promise that resolves to the fetched data.
     */
    @Get('search')
    @HttpCode(HttpStatus.OK)
    @ApiTags('real-estate')
    @ApiOperation({
        summary:
            'Fetches the initial search results from Yad2 API and saves them in the database.',
    })
    @ApiQuery({
        name: 'dealType',
        description: 'The type of the real estate (forsale or rent).',
        required: true,
    })
    @ApiQuery({
        name: 'settlement',
        description: 'The settlement of the real estate.',
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
        description: 'The data for the requested settlement or page was not found.',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 404,
                },
                message: {
                    type: 'string',
                    example: 'Not Found',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                },
            },
        }
    })
    @ApiServiceUnavailableResponse({
        description: 'The Yad2 API is not available.',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 503,
                },
                message: {
                    type: 'string',
                    example: 'Service Unavailable',
                },
                error: {
                    type: 'string',
                    example: 'Service Unavailable',
                },
            },
        }
    })
    @ApiInternalServerErrorResponse({
        description: 'An error occurred while trying to insert a new document to the database.',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 500,
                },
                message: {
                    type: 'string',
                    example: 'Internal Server Error',
                },
                error: {
                    type: 'string',
                    example: 'Internal Server Error',
                },
            },
        }
    })
    async getInitialSearchResults(
        @Query('dealType') dealType: 'forsale' | 'rent',
        @Query('settlement') settlement: string,
        @Query('minPrice') minPrice: number,
        @Query('maxPrice') maxPrice: number,
        @Query('page') page?: number,
    ): Promise<GetInitialSearchResultsResponse> {
        const requestParams: ApiServiceInitialRequestParams = {
            dealType,
            settlement,
            minPrice,
            maxPrice,
            page: page || 1,
        };
        console.log(requestParams);
        const response: ApiServiceResponse = await this.realEstateApiService.fetchInitialRealEstateData(requestParams);
        const document = await this.realEstateDbService.insertNewDocument({
            items: response.feed_items,
            search_params: response.search_params,
            total_pages: response.total_pages,
            last_updated: getTodayDateTime(),
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
     * @throws {NotFoundException} NotFoundException if a MongoDB document with the given ID was not found.
     * @throws {ServiceUnavailableException} ServiceUnavailableException if the Yad2 API is not available.
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
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 404,
                },
                message: {
                    type: 'string',
                    example: 'Not Found',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                },
            },
        }
    })
    @ApiServiceUnavailableResponse({
        description: 'The Yad2 API is not available.',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 503,
                },
                message: {
                    type: 'string',
                    example: 'Service Unavailable',
                },
                error: {
                    type: 'string',
                    example: 'Service Unavailable',
                },
            },
        }
    })
    @ApiInternalServerErrorResponse({
        description: 'An error occurred while trying to update the document in the database.',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 500,
                },
                message: {
                    type: 'string',
                    example: 'Internal Server Error',
                },
                error: {
                    type: 'string',
                    example: 'Internal Server Error',
                },
            },
        }
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
            last_updated: getTodayDateTime(),
        });

        return {
            items: response.feed_items,
            search_params: response.search_params,
            total_pages: response.total_pages,
        };
    }

    /**
     * Deletes the latest search results from the database. Only used when the client cancels the search explicitly.
     * @param {string} searchId The ID of the search.
     * @throws {NotFoundException} NotFoundException if a MongoDB document with the given ID was not found.
     * @throws {InternalServerErrorException} InternalServerErrorException if an error occurred while deleting the document from the database.
     */
    @Delete('cancel')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Deletes the latest search results from the database when the client cancels the search explicitly.',
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
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 404,
                },
                message: {
                    type: 'string',
                    example: 'Not Found',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                },
            },
        }
    })
    @ApiInternalServerErrorResponse({
        description: 'An error occurred while trying to delete the document in the database.',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 500,
                },
                message: {
                    type: 'string',
                    example: 'Internal Server Error',
                },
                error: {
                    type: 'string',
                    example: 'Internal Server Error',
                },
            },
        }
    })
    async cancelSearch(@Query('searchId') searchId: string): Promise<void> {
        await this.realEstateDbService.deleteDocumentById(searchId);
    }

    /**
     * Deletes the latest search results from the database. Only used for sendBeacon requests (during client page unload)
     * @param {string} searchId The ID of the search.
     * @throws {NotFoundException} NotFoundException if a MongoDB document with the given ID was not found.
     * @throws {InternalServerErrorException} InternalServerErrorException if an error occurred while deleting the document from the database.
     */
    @Post('cancel-upon-send-beacon')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Deletes the latest search results from the database upon client page unload.',
    })
    @ApiBody({
        description: 'The search ID to delete.',
        schema: {
            type: 'object',
            properties: {
                searchId: {
                    type: 'string',
                    example: '5f7a8c7b3d9d5c3e2c3e2c3e',
                },
            },
        },
    })
    @ApiNoContentResponse({
        description: 'The document was deleted from the database successfully.',
    })
    @ApiNotFoundResponse({
        description: 'A MongoDB document with the given ID was not found.',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 404,
                },
                message: {
                    type: 'string',
                    example: 'Not Found',
                },
                error: {
                    type: 'string',
                    example: 'Not Found',
                },
            },
        }
    })
    @ApiInternalServerErrorResponse({
        description: 'An error occurred while trying to delete the document in the database.',
        schema: {
            type: 'object',
            properties: {
                statusCode: {
                    type: 'number',
                    example: 500,
                },
                message: {
                    type: 'string',
                    example: 'Internal Server Error',
                },
                error: {
                    type: 'string',
                    example: 'Internal Server Error',
                },
            },
        }
    })
    async cancelSearchUponSendBeacon(@Req() req: RawBodyRequest<Request>): Promise<void> {
        const raw = await rawbody(req);
        const text = raw.toString().trim();
        const json = JSON.parse(text);
        await this.realEstateDbService.deleteDocumentById(json.searchId);
    }
}