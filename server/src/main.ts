import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { generateSpecYaml } from './app/libs/helpers';
import { ConfigEnvironment } from './config';
import { ConfigEnum } from './config/config.schema';

const GLOBAL_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Устанавливаем глобальный префикс для API
  app.setGlobalPrefix(GLOBAL_PREFIX);

  // Генерация Swagger-документации
  const swaggerConfig = new DocumentBuilder() // Настраиваем Swagger для формирования документации
  .setTitle('The "Fit-Friends" service')
  .setDescription('"FIt-Friends" service API')
  .setVersion('1.0')
  .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('spec', app, swaggerDocument);

  // Генерация Spec.yml файла в директории /specification
  generateSpecYaml(swaggerDocument);

  // Подключаем валидацию DTO на основе class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // + трансформация типов данных на основе DTO
    }),
  );

  // Включаем работу с CORS
  app.enableCors();

  // Запуск сервера
  const host = configService.get(`${ConfigEnvironment.APP}.${ConfigEnum.HOST}`);
  const port = configService.get(`${ConfigEnvironment.APP}.${ConfigEnum.PORT}`);

  await app.listen(port, host);

  Logger.log(`🚀 Application is running on: http://${host}:${port}/${GLOBAL_PREFIX}`);
  Logger.log(`📝 Swagger OperAPI documentation is available by link: http://${host}:${port}/spec`);
  Logger.log(`⏬ Swagger OperAPI's YAML-format is available by link: http://${host}:${port}/spec-yaml`);
}
bootstrap();
