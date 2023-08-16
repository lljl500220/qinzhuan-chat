import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {UsersService} from "./users.service";

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(
        private readonly usersService:UsersService
    ) {}

    @Get('/findUserAndGroup')
    findUseIdOrName(@Query('data') data:string){
        return this.usersService.findUseIdOrName(data)
    }
}
