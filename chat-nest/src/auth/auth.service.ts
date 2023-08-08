import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {User} from "../users/entity/user.entity";
import {Repository} from "typeorm";
import {RCode} from "../common/constant/rcode";
import {InjectRepository} from "@nestjs/typeorm";
import {nameVerify, passwordVerify} from "../common/tool/utils";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {
    }


    async login(data: User): Promise<any> {
        try {
            const user = await this.userRepository.findOne({where: {username: data.username, password: data.password}});
            if (!user) {
                return {code: 1, msg: '密码错误', data: ''};
            }
            if (!passwordVerify(data.password) || !nameVerify(data.username)) {
                return {code: RCode.FAIL, msg: '登录校验不通过！', data: ''};
            }

            const payload = {userId: user.userId, password: user.password};
            return {
                msg: '登录成功',
                data: {
                    user: user,
                    token: this.jwtService.sign(payload)
                },
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: '服务器异常',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async register(data: User): Promise<any> {
        try {
            let user = await this.userRepository.findOne({where: {username: data.username, password: data.password}});
            if (user) {
                return {code: RCode.FAIL, msg: '重复用户', data: ''};
            }
            if (!passwordVerify(data.password) || !nameVerify(data.username)) {
                return {code: RCode.FAIL, msg: '注册校验不通过！', data: ''};
            }
            const newUser = await this.userRepository.save({username: data.username, password: data.password})
            const payload = {userId: newUser.userId, password: newUser.password};
            return {
                user: newUser,
                token: this.jwtService.sign(payload)
            };
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: '服务器异常',
            }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
