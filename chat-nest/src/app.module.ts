import {Module} from '@nestjs/common';
import {WsGateway} from './ws-gateway/ws-gateway.gateway';
import {AuthModule} from './auth/auth.module';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            port: 3306,
            username: 'root',
            password: 'qinzhuan',
            database: 'qzchat',
            charset: "utf8mb4", // 设置chatset编码为utf8mb4
            autoLoadEntities: true,
            synchronize: true
        }),
        AuthModule,
        UsersModule],
    providers: [WsGateway],
})
export class AppModule {
}
