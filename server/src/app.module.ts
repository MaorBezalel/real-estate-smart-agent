import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ThrottlerModule } from '@nestjs/throttler';
import { RealEstateModule } from './real-estate/real-estate.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 1000 * 10, // 10 seconds
      limit: 5, // allow only 5 requests per 10 seconds
      blockDuration: 1000 * 60 * 60 * 24, // block for 1 day
    }]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RealEstateModule
  ],
})
export class AppModule { }
