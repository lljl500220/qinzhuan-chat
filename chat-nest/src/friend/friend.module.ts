import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { FriendMessage } from './entities/friendMessage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendMap } from './entities/friend.entity';
import { User } from '../users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FriendMap, FriendMessage, User])],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
