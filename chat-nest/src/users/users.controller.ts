import {Controller, Get, Request, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UsersService} from "./users.service";

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(
        private readonly usersService:UsersService
    ) {}

    @Get('/findUserAndGroup')
    findUseIdOrName(@Query('data') data:string,@Request() req:any){
        return this.usersService.findUseIdOrName(data,req.user?.userId)
    }
}
