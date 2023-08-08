import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Body() user: any) {
        return this.authService.login(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('/register')
    async register(@Body() user: any) {
        return this.authService.register(user);
    }
}
