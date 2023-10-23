import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import Redis from 'ioredis';
import { RCode } from '../common/constant/rcode';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendMessage } from '../friend/entities/friendMessage.entity';
import { Repository } from 'typeorm';

@Injectable()
@WebSocketGateway({ namespace: 'events', cors: true })
export class WsGateway
  implements OnGatewayInit, OnGatewayDisconnect, OnGatewayConnection
{
  private readonly logger = new Logger(WsGateway.name);
  @InjectRepository(FriendMessage)
  private readonly friendMessageRepository: Repository<FriendMessage>;

  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  @WebSocketServer()
  server: Server;

  afterInit(): any {
    this.logger.log('Socket.io 的服务端已经启动！');
  }

  async handleConnection(
    client: Socket,
    ...arg: any[]
  ): Promise<string | boolean> {
    // console.log(client.conn.transport.name) //查看由polling发起的还是由websocket发起的
    this.logger.log(
      `userId为${client.handshake.query.userId}申请建立socket连接`,
    );
    const jwt = await this.redisClient.get(
      client.handshake.query.userId + '_jwt',
    );
    if (jwt) {
      this.logger.log(`userId为${client.handshake.query.userId}建立socket连接`);
      this.redisClient.set(
        client.handshake.query.userId + '_ws',
        client.id,
        'EX',
        86400,
      );
      return JSON.stringify({
        code: RCode.OK,
        message: '成功在服务端建立socket缓存',
        id: client.id,
      });
    } else {
      this.logger.warn(
        `userId为${client.handshake.query.userId}建立socket连接失败`,
      );
      client.emit(
        'disconnectMessage',
        JSON.stringify({
          code: RCode.FAIL,
          message: '尚未登录或登录过期，无法建立连接',
        }),
      );
      client.disconnect();
    }
  }

  handleDisconnect(client: any): any {
    this.logger.log(`id为 ${client.id} 的Socket.io 的服务已经关闭`);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    client.join(data);
  }

  @SubscribeMessage('sendFriendMsg')
  async sendFriendMsg(
    @MessageBody()
    data: {
      room: string;
      content: string;
      userId: string;
      username: string;
      messageType: string;
    },
    @ConnectedSocket() client: Socket,
  ) {
    await this.friendMessageRepository.save({
      room: data.room,
      userId: data.userId,
      username: data.username,
      content: data.content,
      messageType: data.messageType,
      time: new Date().getHours().toString() + ':' + new Date().getMinutes(),
    });
    this.server.to(data.room).emit('sendFriendMsg', {
      room: data.room,
      userId: data.userId,
      userName: data.username,
      content: data.content,
      messageType: data.messageType,
      time: new Date().getHours().toString() + ':' + new Date().getMinutes(),
    });
  }
}
