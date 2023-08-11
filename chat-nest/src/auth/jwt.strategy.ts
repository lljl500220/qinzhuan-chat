import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UsersService} from "../users/users.service";
import {jwtConstants} from "./constants"
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entity/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
        const { userId } = payload;
        const user = await this.userRepository.findOne({where: {userId}});  // 你需要实现这个方法

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
