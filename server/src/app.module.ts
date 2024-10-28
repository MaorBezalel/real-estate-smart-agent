import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RealEstateModule } from './real-estate/real-estate.module';
import { BlockIpMiddleware } from './middlewares/block-ip.middleware';
import { Request } from 'express';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1,
        limit: 3,
        getTracker: (req: Request) => (req.ips.length ? req.ips[0] : req.ip),
      },
      {
        name: 'medium',
        ttl: 10,
        limit: 5,
        getTracker: (req: Request) => (req.ips.length ? req.ips[0] : req.ip),
      },
      {
        name: 'long',
        ttl: 30,
        limit: 10,
        getTracker: (req: Request) => (req.ips.length ? req.ips[0] : req.ip),
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RealEstateModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BlockIpMiddleware).forRoutes('*'); // Apply to all routes, or specify specific routes
  }
}
