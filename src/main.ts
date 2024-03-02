import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import corsOptions from './config/cors-config';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import {
  I18nMiddleware,
  I18nValidationExceptionFilter,
  I18nValidationPipe,
} from 'nestjs-i18n';
import { i18nValidationErrorFormatter } from './utils/i18n-validation-error-formatter';
import { VersioningType } from '@nestjs/common';
import validationOptions from './utils/validators/validation-options';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const configService = app.get(ConfigService);
  app.use(helmet());
  app.use(I18nMiddleware);
  app.enableShutdownHooks();
  app.setGlobalPrefix(configService.get('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new I18nValidationPipe(validationOptions));
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      errorFormatter: i18nValidationErrorFormatter,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
void bootstrap();
