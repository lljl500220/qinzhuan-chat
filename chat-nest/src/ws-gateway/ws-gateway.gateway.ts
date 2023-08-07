import {MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';

@WebSocketGateway({namespace: 'events', cors: true})
export class WsGateway implements OnGatewayInit {
    afterInit(server: any): any {
        console.log('Socket.io 的服务端已经启动！')
    }

    @SubscribeMessage('message')
    handleEvent(@MessageBody() data: string): string {
        console.log(data)
        return data;
    }
}
