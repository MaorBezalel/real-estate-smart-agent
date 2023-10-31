import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { RealEstateController } from './controllers/real-estate.controller';
import { RealEstateApiService } from './services/real-estate.api.service';
import { RealEstateDbService } from './services/real-estate.db.service';
import { RealEstateDocumentSchema } from './models/real-estate-document.model';

/**
 * The module that handles the real estate feature.
 */
@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            { name: 'RealEstateDocumentSchema', schema: RealEstateDocumentSchema }
        ])
    ],
    controllers: [RealEstateController],
    providers: [RealEstateApiService, RealEstateDbService],
})
export class RealEstateModule {}