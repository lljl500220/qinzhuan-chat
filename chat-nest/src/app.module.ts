import { Module } from '@nestjs/common';
import { WsGateway } from './ws-gateway/ws-gateway.gateway';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendModule } from './friend/friend.module';
import { RedisClientModule } from './redis_client/redis_client.module';
import { FriendMessage } from './friend/entities/friendMessage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FriendMessage]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
      password: 'qinzhuan',
      database: 'qzchat',
      charset: 'utf8mb4', // 设置chatset编码为utf8mb4
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    FriendModule,
    RedisClientModule,
    FriendMessage,
  ],
  providers: [WsGateway],
})
export class AppModule {}
