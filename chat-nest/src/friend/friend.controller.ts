import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {FriendService} from './friend.service';
import {CreateFriendDto} from './dto/create-friend.dto';
import {AuthGuard} from "@nestjs/passport";

@Controller('friend')
@UseGuards(AuthGuard('jwt'))
export class FriendController {
    constructor(
        private readonly friendService: FriendService,
    ) {}

    //添加好友
    @Post()
    create(@Body() createFriendDto: CreateFriendDto) {
        return this.friendService.create(createFriendDto);
    }

    //获取好友列表
    @Get()
    findAll() {
        return this.friendService.findAll();
    }

    //查找指定好友
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.friendService.findOne(+id);
    }

    //删除好友关系
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.friendService.remove(+id);
    }
}
