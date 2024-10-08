import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true });

  const config = new DocumentBuilder()
    .setTitle('Real Estate Smart Agent API')
    .setDescription('API for fetching real estate data from Yad2 API endpoints')
    .setVersion('1.0')
    .addTag('real-estate')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  app.set('trust proxy', true);

  await app.listen(3000);
}
bootstrap();
