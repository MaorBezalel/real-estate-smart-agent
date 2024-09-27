import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { RealEstateModule } from './real-estate/real-estate.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: seconds(1),
        limit: 3,
      },
      {
        name: 'medium',
        ttl: seconds(10),
        limit: 5,
      },
      {
        name: 'long',
        ttl: seconds(30),
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RealEstateModule
  ],
})
export class AppModule { }
