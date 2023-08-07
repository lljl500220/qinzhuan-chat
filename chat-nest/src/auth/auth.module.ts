import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {LocalStrategy} from "./local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constants";
@Module({

    imports: [
        UsersModule, PassportModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '3d' },
        }),
        PassportModule,
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {
}
