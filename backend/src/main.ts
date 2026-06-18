import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const origins = config.get<string>('app.corsOrigins');
  if (origins === '*' || !origins) {
    app.enableCors();
  } else {
    app.enableCors({ origin: origins.split(',').map((o) => o.trim()) });
  }

  const doc = new DocumentBuilder()
    .setTitle('Brotar API')
    .setDescription('Árvores frutíferas, sensores de solo e avaliação por espécie')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, doc));

  const port = config.get<number>('app.port') ?? 3000;
  await app.listen(port, '0.0.0.0');
}
bootstrap();
