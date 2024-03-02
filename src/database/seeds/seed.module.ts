import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configsList } from 'src/config';
import { DataSource } from 'typeorm';

import { TypeOrmConfigService } from '../typeorm-config.service';

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
  ],
})
export class SeedModule {}
