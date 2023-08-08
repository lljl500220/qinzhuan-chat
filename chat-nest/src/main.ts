import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {logger} from "./common/middleware/logger.middleware";
import {HttpExceptionFilter} from "./common/filters/http-exception.filter";
import {HttpResponseInterceptor} from "./common/interceptor/http-response";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.use(cors) //允许跨域
    app.enableCors() //允许跨域
    app.use(logger) //全局中间件
    app.useGlobalInterceptors(new HttpResponseInterceptor()) //全局响应拦截器
    app.useGlobalFilters(new HttpExceptionFilter()) //全局异常过滤器
    await app.listen(3000);
}

bootstrap();
