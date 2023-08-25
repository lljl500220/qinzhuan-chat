import {PassportStrategy} from '@nestjs/passport';
import {Inject, Injectable, UnauthorizedException} from '@nestjs/common';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {jwtConstants} from "./constants"
import Redis from "ioredis";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redisClient:Redis) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        const { userId } = payload;
        const token = await  this.redisClient.get(userId+'_jwt')
        if (!token) {
            throw new UnauthorizedException();
        }

        return {userId:userId};
    }
}
