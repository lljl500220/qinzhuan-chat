import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from "../users/entity/user.entity";
import {Repository} from "typeorm";
import {RCode} from "../common/constant/rcode";
import {InjectRepository} from "@nestjs/typeorm";
import {nameVerify, passwordVerify} from "../common/tool/utils";
import Redis from "ioredis";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
        @Inject('REDIS_CLIENT')
        private readonly redisClient:Redis
    ) {
    }


    async login(data: CreateUserDto): Promise<any> {
        try {
            const user = await this.userRepository.findOne({where: {username: data.username, password: data.password}});
            if (!user) {
                return {code: RCode.FAIL, message: '密码错误', data: ''};
            }
            if (!passwordVerify(data.password) || !nameVerify(data.username)) {
                return {code: RCode.FAIL, message: '登录校验不通过！', data: ''};
            }

            const payload = {userId: user.userId, password: user.password};
            const token = this.jwtService.sign(payload)
            this.redisClient.set(user.userId+'_jwt',token,"EX",86400)
            return {
                code:RCode.OK,
                message: '登录成功',
                data: {
                    user: user,
                    token
                },
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: '服务器异常',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async register(data: CreateUserDto): Promise<any> {
        try {
            let user = await this.userRepository.findOne({where: {username: data.username, password: data.password}});
            if (user) {
                return {code: RCode.FAIL, message: '重复用户', data: ''};
            }
            if (!passwordVerify(data.password) || !nameVerify(data.username)) {
                return {code: RCode.FAIL, message: '注册校验不通过！', data: ''};
            }
            const newUser = await this.userRepository.save({username: data.username, password: data.password})
            const payload = {userId: newUser.userId, password: newUser.password};
            const token = this.jwtService.sign(payload)
            this.redisClient.set(newUser.userId+'_jwt',token,"EX",86400)
            return {
                code:RCode.OK,
                user: newUser,
                token
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: '服务器异常',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
