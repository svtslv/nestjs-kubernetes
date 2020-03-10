import { Module } from '@nestjs/common';
import { S3Module } from 'nestjs-s3';
import { KnexModule } from 'nestjs-knex';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Redis from 'ioredis';

@Module({
  imports: [
    S3Module.forRoot({
      config: {
        accessKeyId: 'minio',
        secretAccessKey: process.env.MINIO_PASSWORD,
        endpoint: 'http://minio-service:9000',
        s3ForcePathStyle: true,
        signatureVersion: 'v4'
      }
    }),
    KnexModule.forRoot({
      config: {
        client: "pg",
        useNullAsDefault: true,
        connection: process.env.POSTGRES_URL,
      }
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'redis',
      useValue: new Redis(process.env.REDIS_URL),
    }
  ],
})
export class AppModule {}
