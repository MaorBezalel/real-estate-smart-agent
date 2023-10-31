import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { HttpService } from '@nestjs/axios';
import { RealEstateApiService } from '../services/real-estate.api.service';

import { FinalSearchFilter } from '../types/search-filter.objects';

import { dummyInitialYad2RealEstateResponse, dummyFinalYad2RealEstateResponse } from './dummy/yad2.response.dummy';
import { dummyInitialSearchFilter, dummyFinalSearchFilter } from './dummy/search-filter.dummy';

describe('RealEstateApiService', () => {
    let apiService: RealEstateApiService;
    let httpService: HttpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RealEstateApiService,
                {
                    provide: HttpService,
                    useValue: {
                        get: jest.fn().mockReturnValue(of(dummyInitialYad2RealEstateResponse())),
                    }
                },
            ],
        }).compile();

        apiService = module.get<RealEstateApiService>(RealEstateApiService);
        httpService = module.get<HttpService>(HttpService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should be defined', () => {
        expect(apiService).toBeDefined();
    });

    describe('#fetchInitialSearchResults', () => {
        let finalSearchFilter: FinalSearchFilter;
        let url: string;

        beforeEach(() => {
            finalSearchFilter = dummyFinalSearchFilter();
            url = 'dummyUrl';

            jest.spyOn(apiService, 'fetchCityCodeFromYad2').mockImplementationOnce(async () => finalSearchFilter.city_code);
            jest.spyOn(apiService, 'generateRequestUrlForYad2').mockImplementationOnce(() => url);
            jest.spyOn(apiService, 'fetchDataFromYad2').mockImplementationOnce(async () => dummyFinalYad2RealEstateResponse());

        });

        it('should return the initial search results', async () => {
            const response = await apiService.fetchInitialSearchResults(dummyInitialSearchFilter());
            expect(response).toEqual(dummyFinalYad2RealEstateResponse());
        });

        it('should call `generateRequestUrlForYad2` once and with the correct arguments', async () => {
            await apiService.fetchInitialSearchResults(dummyInitialSearchFilter());

            expect(apiService.generateRequestUrlForYad2).toHaveBeenCalledTimes(1);
            expect(apiService.generateRequestUrlForYad2).toHaveBeenCalledWith(finalSearchFilter);
        });

        it('should call `fetchDataFromYad2` oce and with the correct arguments', async () => {
            await apiService.fetchInitialSearchResults(dummyInitialSearchFilter());

            expect(apiService.fetchDataFromYad2).toHaveBeenCalledTimes(1);
            expect(apiService.fetchDataFromYad2).toHaveBeenCalledWith(url, finalSearchFilter);
        });
    });

    describe('#fetchUpdatedSearchResults', () => {
        let finalSearchFilter: FinalSearchFilter;
        let url: string;

        beforeEach(() => {
            finalSearchFilter = dummyFinalSearchFilter();
            url = 'dummyUrl';

            jest.spyOn(apiService, 'generateRequestUrlForYad2').mockImplementationOnce(() => url);
            jest.spyOn(apiService, 'fetchDataFromYad2').mockImplementationOnce(async () => dummyFinalYad2RealEstateResponse());
        });

        it('should return the updated search results', async () => {
            const response = await apiService.fetchUpdatedSearchResults(finalSearchFilter);
            expect(response).toEqual(dummyFinalYad2RealEstateResponse());
        });

        it('should call `generateRequestUrlForYad2` once and with the correct arguments', async () => {
            await apiService.fetchUpdatedSearchResults(finalSearchFilter);

            expect(apiService.generateRequestUrlForYad2).toHaveBeenCalledTimes(1);
            expect(apiService.generateRequestUrlForYad2).toHaveBeenCalledWith(finalSearchFilter);
        });

        it('should call `fetchDataFromYad2` once and with the correct arguments', async () => {
            await apiService.fetchUpdatedSearchResults(finalSearchFilter);

            expect(apiService.fetchDataFromYad2).toHaveBeenCalledTimes(1);
            expect(apiService.fetchDataFromYad2).toHaveBeenCalledWith(url, finalSearchFilter);
        });
    });
});