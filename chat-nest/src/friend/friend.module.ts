import {Module} from '@nestjs/common';
import {FriendService} from './friend.service';
import {FriendController} from './friend.controller';
import {FriendMessage} from "./entities/friendMessage.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FriendMap} from "./entities/friend.entity";
import {WsGateway} from "../ws-gateway/ws-gateway.gateway";

@Module({
    imports: [
        TypeOrmModule.forFeature([FriendMap, FriendMessage]),
    ],
    controllers: [FriendController],
    providers: [FriendService,WsGateway],
})
export class FriendModule {
}
