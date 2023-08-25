import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import Redis from "ioredis";
import {RCode} from "../common/constant/rcode";
import {Inject, Injectable, Logger} from "@nestjs/common";

@Injectable()
@WebSocketGateway({namespace: 'events', cors: true})
export class WsGateway implements OnGatewayInit, OnGatewayDisconnect ,OnGatewayConnection{
    @WebSocketServer()
    public server: Server;
    private readonly logger = new Logger(WsGateway.name)

    constructor(@Inject("REDIS_CLIENT") private readonly redisClient: Redis) {}

    afterInit(server: any): any {
       this.logger.log('Socket.io 的服务端已经启动！')
    }

    async handleConnection(client:Socket,...arg:any[]): Promise<string|boolean> {
        // console.log(client.conn.transport.name) 查看由polling发起的还是由websocket发起的
        this.logger.log(`userId为${client.handshake.query.userId}申请建立socket连接`)
        const jwt = await this.redisClient.get(client.handshake.query.userId + '_jwt')
        if (jwt) {
            this.logger.log(`userId为${client.handshake.query.userId}建立socket连接`)
            this.redisClient.set(client.handshake.query.userId + '_ws', client.id, "EX", 86400)
            return JSON.stringify({code: RCode.OK, message: '成功在服务端建立socket缓存', id: client.id});
        } else {
            this.logger.warn(`userId为${client.handshake.query.userId}建立socket连接失败`)
            client.emit('disconnectMessage',JSON.stringify({code: RCode.FAIL, message: '尚未登录或登录过期，无法建立连接'}))
            client.disconnect()
        }
    }

    handleDisconnect(client: any): any {
        this.logger.log(`id为 ${client.id} 的Socket.io 的服务已经关闭`)
    }


    //创建一个私聊
    @SubscribeMessage('joinFriendSocket')
    joinFriend(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
        return data;
    }

    //加入一个群聊
    @SubscribeMessage('joinGroupSocket')
    joinGroup(@MessageBody() data: string, @ConnectedSocket() client: Socket): string {
        return data;
    }

    //在网关之外发送给房间
    broadcastToRoom(room: string, emit: string, message: string) {
        this.server.to(room).emit(emit, message);
    }

    //在网关之外发送给个人
    async broadcastToUser(user: string, emit: string, message: any) {
        const id = await this.redisClient.get(user+'_ws')
        console.log(id)
        this.server.to(id).emit(emit, message);
    }
}

