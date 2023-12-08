import { RealEstateApiService } from '../services/real-estate.api.service';

import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

import { createMock, DeepMocked } from '@golevelup/ts-jest';

import { RealEstate } from "../utils/dtos/real-estate.dto";
import { RealEstateDocumentModel } from "../models/real-estate-document.model";

import {
    ApiServiceInitialRequestParams,
    ApiServiceUpdatedRequestParams,
    ApiServiceResponse,
    Yad2RealEstateResponse,
    Yad2CityCodeResponse,
    Yad2RealEstateRequestParams,
} from '../utils/types';

import * as helpers from '../utils/helpers';


describe('RealEstateApiService', () => {
    let apiService: RealEstateApiService;
    let httpService: DeepMocked<HttpService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RealEstateApiService],
        })
            .useMocker(createMock)
            .compile();

        apiService = module.get<RealEstateApiService>(RealEstateApiService);
        httpService = module.get(HttpService);
    });

    it('should be defined', () => {
        expect(apiService).toBeDefined();
    });
});