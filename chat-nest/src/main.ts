import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middleware/logger.middleware';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { HttpResponseInterceptor } from './common/interceptor/http-response';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.enableCors(); //允许跨域
  app.use(logger); //全局中间件
  app.useGlobalInterceptors(new HttpResponseInterceptor()); //全局响应拦截器
  app.useGlobalFilters(new HttpExceptionFilter()); //全局异常过滤器
  await app.listen(3000);
}

bootstrap();
