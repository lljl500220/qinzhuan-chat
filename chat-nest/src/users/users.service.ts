import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Like, Repository} from "typeorm";
import {User} from "./entity/user.entity";
import {RCode} from "../common/constant/rcode";


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async findUseIdOrName(data: string) {
        console.log(data)
        try {
            const users = await this.userRepository.find({
                select: ['username', "userId"],
                where: {username: Like(data), userId: Like(data)}
            })
            return {
                code:RCode.OK,
                data:users,
            }   
        }catch (e) {
            
        }
    }
}
