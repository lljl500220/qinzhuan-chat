import { Global, Module } from '@nestjs/common';
import { default as Redis } from 'ioredis/built/Redis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: '127.0.0.1',
          port: 6379,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisClientModule {}
