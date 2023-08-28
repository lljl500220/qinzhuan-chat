import { Inject, Injectable } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendMap } from './entities/friend.entity';
import { Repository } from 'typeorm';
import { FriendMessage } from './entities/friendMessage.entity';
import { RCode } from '../common/constant/rcode';
import Redis from 'ioredis';
import { WsGateway } from '../ws-gateway/ws-gateway.gateway';
import { User } from '../users/entity/user.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendMap)
    private readonly friendRepository: Repository<FriendMap>,
    @InjectRepository(FriendMessage)
    private readonly friendMessageRepository: Repository<FriendMessage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {}

  //发送一个添加好友的通知给对方
  async create(createFriendDto: CreateFriendDto) {
    try {
      const friend = await this.friendRepository.findOne({
        where: {
          userId: createFriendDto.userId,
          friendId: createFriendDto.friendId,
        },
      });
      if (friend) {
        return {
          code: RCode.FAIL,
          message: '已经是好友了，无需添加',
        };
      }
      await this.friendRepository.save(createFriendDto);
      await this.friendRepository.save({
        userId: createFriendDto.friendId,
        friendId: createFriendDto.userId,
      });
      return {
        code: RCode.OK,
        message: '添加成功',
      };
    } catch (err) {}
  }

  async findAll(userId: string) {
    try {
      const friendMaps = await this.friendRepository.find({
        where: {
          userId: userId,
        },
      });
      const users: User[] = [];
      if (friendMaps && friendMaps.length > 0) {
        for (const item of friendMaps) {
          users.push(
            await this.userRepository.findOne({
              where: {
                userId: item.friendId,
              },
            }),
          );
        }
      }
      return {
        code: RCode.OK,
        message: '成功',
        friends: users,
      };
    } catch (err) {}
  }

  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
