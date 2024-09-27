import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { RealEstateController } from './controllers/real-estate.controller';
import { RealEstateApiService } from './services/real-estate.api.service';
import { RealEstateDbService } from './services/real-estate.db.service';
import { RealEstateDocumentSchema } from './models/real-estate-document.model';
import { LoggingMiddleware } from './middlewares/logger.middleware';

/**
 * The module that handles the real estate feature.
 */
@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([
            { name: 'RealEstateDocumentSchema', schema: RealEstateDocumentSchema }
        ]),
    ],
    controllers: [RealEstateController],
    providers: [RealEstateApiService, RealEstateDbService],
})
export class RealEstateModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}