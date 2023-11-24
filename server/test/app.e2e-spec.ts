import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import * as request from 'supertest';
import mongoose from 'mongoose';

import { AppModule } from '../src/app.module';
import { RealEstateModule } from '../src/real-estate/real-estate.module';
import { RealEstateDocumentSchema } from '../src/real-estate/models/real-estate-document.model';

describe('RealEstateModule (e2e)', () => {
    let app: INestApplication;
    let searchId: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    beforeAll(() => {
        mongoose.connect(process.env.MONGO_URI);
    });

    afterAll(async () => {
        await mongoose.connection.close();
        await app.close();
    });

    describe('/real-estate/search/:type (GET)', () => {
        it('should return initial search results', async () => {
            const response = await request(app.getHttpServer())
                .get('/real-estate/search/forsale')
                .query({
                    city: 'חולון',
                    minPrice: 1_000_000,
                    maxPrice: 2_000_000,
                })
                .expect(200);

            expect(response.body.search_id).toBeDefined();
            expect(response.body.items).toBeDefined();
            expect(response.body.total_pages).toBeDefined();

            searchId = response.body.search_id;
        });

        it('should throw `NotFoundException` for non-existent city', async () => {
            const nonExistentCity = 'NON_EXISTENT_CITY';
            const response = await request(app.getHttpServer())
                .get('/real-estate/search/forsale')
                .query({
                    city: nonExistentCity,
                    minPrice: 1_000_000,
                    maxPrice: 2_000_000,
                })
                .expect(404);

            expect(response.body.message).toBe(`City ${nonExistentCity} not found`);
        });
    });

    describe('/real-estate/up-to-date (GET)', () => {
        it('should return updated search results', async () => {
            const response = await request(app.getHttpServer())
                .get('/real-estate/up-to-date')
                .query({
                    searchId,
                    page: 2,
                })
                .expect(200);

            expect(response.body.items).toBeDefined();
            expect(response.body.search_filter).toBeDefined();
            expect(response.body.total_pages).toBeDefined();
        });
    });

    describe('/real-estate/cancel (DELETE)', () => {
        it('should delete the search document', async () => {
            await request(app.getHttpServer())
                .delete('/real-estate/cancel')
                .query({
                    searchId,
                })
                .expect(204);
        });
    });
});