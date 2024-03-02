import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { configsList } from './config';
import { LogRequestsMiddleware } from './utils/middlewares/log-requests.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DataSource } from 'typeorm';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
} from 'nestjs-i18n';
import * as path from 'path';
import { PurchaseModule } from './modules/purchase/purchase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configsList,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: (options) => new DataSource(options).initialize(),
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('app.fallbackLanguage'),
        fallbacks: {
          'en-*': 'en',
        },
        loaderOptions: {
          path: path.join(__dirname, '/i18n/'),
          watch: true,
        },
        typesOutputPath: path.join(
          __dirname,
          '../src/generated/i18n.generated.ts',
        ),
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService) =>
            configService.get('app.headerLanguage'),
          inject: [ConfigService],
        },
        AcceptLanguageResolver,
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    PurchaseModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LogRequestsMiddleware).forRoutes('*');
  }
}
