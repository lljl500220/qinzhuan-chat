import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from "./users/users.service";

@Controller()
export class AppController {
    constructor(private userService:UsersService) {
    }
    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req: any) {
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('auth/getOne')
    async getOne(@Body() data:any) {
        return await this.userService.findUserByIdAndUsername(data.id,data.username);
    }
}
