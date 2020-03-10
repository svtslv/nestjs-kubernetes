import { Controller, Get, Inject } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { InjectKnex, Knex } from 'nestjs-knex';
import { AppService } from './app.service';
import * as Redis from 'ioredis'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('redis') private readonly redis: Redis.Redis,
    @InjectS3() private readonly s3: S3,
    @InjectKnex() private readonly knex: Knex,
  ) {}

  @Get()
  async getHello() {
    /* Redis */
    await this.redis.set('redisData', 'Redis data!');
    const redisData = await this.redis.get("redisData");

    /* S3 */
    let s3Buckets = null;
    try {
      await this.s3.createBucket({ Bucket: 'bucket' }).promise();
    } catch (e) {}
    try {
      const list = await this.s3.listBuckets().promise();
      s3Buckets = list.Buckets;
    } catch (e) {
      console.log(e);
    }

    /* Knex */
    if (!await this.knex.schema.hasTable('users')) {
      await this.knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name');
      });
    }
    await this.knex.table('users').insert({ name: 'Name' });
    const knexUsers = await this.knex.table('users').limit(2).orderBy('id', 'desc');


    /* Service */
    const service = this.appService.getHello();

    return { service, redisData, knexUsers, s3Buckets }
  }
}
