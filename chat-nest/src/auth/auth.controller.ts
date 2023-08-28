import {
  Body,
  Controller,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import Redis from 'ioredis';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {}

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

  @UseGuards(AuthGuard('jwt'))
  @Post('/getUserInfo')
  async getUserInfo(@Request() req: any) {
    return this.authService.getUserInfo(req.user?.userId);
  }
}
