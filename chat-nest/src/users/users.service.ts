import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { RCode } from '../common/constant/rcode';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUseIdOrName(data: string, userId: string) {
    try {
      //查找用户列表-除去自己
      const users = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.username', 'user.userId'])
        .where('user.username LIKE :searchTerm', { searchTerm: `%${data}%` })
        .andWhere('user.userId != :excludeId', { excludeId: userId })
        .getMany();
      return {
        code: RCode.OK,
        data: {
          users,
        },
      };
    } catch (e) {}
  }
}
