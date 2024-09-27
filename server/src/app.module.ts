import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { RealEstateModule } from './real-estate/real-estate.module';
import { Request } from 'express';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: seconds(1),
        limit: 3,
        getTracker: (req: Request) => req.ips.length ? req.ips[0] : req.ip,
      },
      {
        name: 'medium',
        ttl: seconds(10),
        limit: 5,
        getTracker: (req: Request) => req.ips.length ? req.ips[0] : req.ip,
      },
      {
        name: 'long',
        ttl: seconds(30),
        limit: 10,
        getTracker: (req: Request) => req.ips.length ? req.ips[0] : req.ip,
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
