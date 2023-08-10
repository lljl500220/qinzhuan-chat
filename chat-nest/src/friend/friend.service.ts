import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {CreateFriendDto} from './dto/create-friend.dto';
import {UpdateFriendDto} from './dto/update-friend.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {FriendMap} from "./entities/friend.entity";
import {Repository} from "typeorm";
import {FriendMessage} from "./entities/friendMessage.entity";
import {RCode} from "../common/constant/rcode";
import Redis from "ioredis";
import {WsGateway} from "../ws-gateway/ws-gateway.gateway";

@Injectable()
export class FriendService {
    constructor(
        @InjectRepository(FriendMap)
        private readonly friendRepository: Repository<FriendMap>,
        @InjectRepository(FriendMessage)
        private readonly friendMessageRepository: Repository<FriendMessage>,
        @Inject('REDIS_CLIENT')
        private readonly redisClient: Redis,
        private readonly wsGateway:WsGateway
    ) {}

    //发送一个添加好友的通知给对方
    async create(createFriendDto: CreateFriendDto) {
        try {
            await this.wsGateway.broadcastToUser(createFriendDto.friendId, 'addFriend', createFriendDto)
            return {
                code: RCode.OK,
                message: '添加请求已经发送给对方'
            }
        } catch (err) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: '服务器异常',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    findAll() {
        return `This action returns all friend`;
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
