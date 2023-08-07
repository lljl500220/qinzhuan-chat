import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {UsersService} from "../users/users.service";
import {jwtConstants} from "./constants"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        const { sub, username } = payload;
        const user = await this.usersService.findUserByIdAndUsername(sub, username);  // 你需要实现这个方法

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
