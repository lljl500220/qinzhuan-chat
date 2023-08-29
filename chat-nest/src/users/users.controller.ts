import {Controller, Get, Request, Query, UseGuards, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import {multerConfig} from "../common/tool/multer-confing";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/findUser')
  findUseIdOrName(@Query('data') data: string, @Request() req: any) {
    return this.usersService.findUseIdOrName(data, req.user?.userId);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  upload(@UploadedFile() file:any){
    return {
      url: `http://localhost:3000/${file.filename}`,
    };
  }
}
