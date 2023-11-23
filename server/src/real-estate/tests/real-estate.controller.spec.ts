import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

import { RealEstateController } from '../controllers/real-estate.controller'
import { RealEstateApiService } from '../services/real-estate.api.service';
import { RealEstateDbService } from '../services/real-estate.db.service';
import { RealEstateDocumentModel } from '../models/real-estate-document.model';

import { GetInitialSearchResultsResponse, GetUpdatedSearchResultsResponse } from '../dtos/real-estate.responses.dto';
import { InitialSearchFilter, FinalSearchFilter } from '../types/search-filter.objects';

import { dummyFinalYad2RealEstateResponse } from './dummy/yad2.response.dummy';
import { dummyInitialSearchFilter } from './dummy/search-filter.dummy';
import { dummyDocument, dummyId } from './dummy/document.dummy';
import { dummyRealEstateDocumentModel } from './dummy/real-estate.model.dummy';
import { dummyInitialSearchResultsResponse, dummyUpdatedSearchResultsResponse } from './dummy/search-results.dummy';

describe('RealEstateController', () => {
    let controller: RealEstateController;
    let apiService: RealEstateApiService;
    let dbService: RealEstateDbService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RealEstateController],
            providers: [
                {
                    provide: RealEstateApiService,
                    useValue: {
                        fetchInitialSearchResults: jest.fn().mockResolvedValue(dummyFinalYad2RealEstateResponse()),
                        fetchUpdatedSearchResults: jest.fn().mockResolvedValue(dummyFinalYad2RealEstateResponse()),
                    },
                },
                {
                    provide: RealEstateDbService,
                    useValue: {
                        insertNewDocument: jest.fn().mockResolvedValue(dummyDocument()),
                        getDocumentById: jest.fn().mockResolvedValue(dummyDocument()),
                        updateDocumentById: jest.fn().mockResolvedValue(dummyDocument()),
                        deleteDocumentById: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<RealEstateController>(RealEstateController);
        apiService = module.get<RealEstateApiService>(RealEstateApiService);
        dbService = module.get<RealEstateDbService>(RealEstateDbService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('#getInitialSearchResults', () => {
        let initialSearchFilter: InitialSearchFilter;
        let response: GetInitialSearchResultsResponse;

        beforeAll(() => {
            initialSearchFilter = dummyInitialSearchFilter();
        });

        beforeEach(async () => {
            response = await controller.getInitialSearchResults(
                initialSearchFilter.type,
                initialSearchFilter.city,
                initialSearchFilter.min_price,
                initialSearchFilter.max_price,
                initialSearchFilter.page
            );
        });

        it('should call `fetchInitialSearchResults` once and with the correct arguments', async () => {
            expect(apiService.fetchInitialSearchResults).toBeCalledTimes(1);
            expect(apiService.fetchInitialSearchResults).toBeCalledWith(initialSearchFilter);
        });

        it('should call `insertNewDocument` once and with the correct arguments', async () => {
            const realEstateDocumentModel: RealEstateDocumentModel = dummyRealEstateDocumentModel();

            expect(dbService.insertNewDocument).toBeCalledTimes(1);
            expect(dbService.insertNewDocument).toBeCalledWith(realEstateDocumentModel);
        });

        it('should return the correct response', async () => {
            expect(response).toEqual(dummyInitialSearchResultsResponse());
        });
    });

    describe('#getUpdatedSearchResults', () => {
        let searchId: string;
        let page: number;
        let response: GetUpdatedSearchResultsResponse;

        beforeAll(async () => {
            searchId = dummyId;
            page = 1;
        });

        beforeEach(async () => {
            response = await controller.getUpdatedSearchResults(searchId, page);
        });

        it('should call `getDocumentById` once and with the correct arguments', async () => {
            expect(dbService.getDocumentById).toBeCalledTimes(1);
            expect(dbService.getDocumentById).toBeCalledWith(searchId);
        });

        it('should call `fetchUpdatedSearchResults` once and with the correct arguments', async () => {
            const document = dummyDocument();
            const finalSearchFilter: FinalSearchFilter = {
                ...document.search_filter,
                page
            }

            expect(apiService.fetchUpdatedSearchResults).toBeCalledTimes(1);
            expect(apiService.fetchUpdatedSearchResults).toBeCalledWith(finalSearchFilter);
        });

        it('should call `updateDocumentById` once and with the correct arguments', async () => {
            const realEstateDocumentModel: RealEstateDocumentModel = dummyRealEstateDocumentModel();

            expect(dbService.updateDocumentById).toBeCalledTimes(1);
            expect(dbService.updateDocumentById).toBeCalledWith(searchId, realEstateDocumentModel);
        });

        it('should return the correct response', async () => {
            expect(response).toEqual(dummyUpdatedSearchResultsResponse());
        });

        it('should throw `NotFoundException` if the page number is larger than the total number of pages', async () => {
            const document = dummyDocument();
            const page = document.total_pages + 1;

            await expect(controller.getUpdatedSearchResults(searchId, page)).rejects.toThrow(new NotFoundException(
                `Page ${page} not found (total pages: ${document.total_pages})`
            ));
        });
    });

    describe('#cancelSearch', () => {
        it('should call `deleteDocumentById` once and with the correct arguments', async () => {
            const serachId: string = dummyId;

            await controller.cancelSearch(serachId);

            expect(dbService.deleteDocumentById).toBeCalledTimes(1);
            expect(dbService.deleteDocumentById).toBeCalledWith(serachId);
        });
    });
});