import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const exceptionRes: any = exception.getResponse();
    const error = exceptionRes.error;
    let message = exceptionRes.message;

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    if (status === 500) {
      // 你可以在这里添加额外的逻辑来处理非HTTP异常，例如记录错误详情。
      message = '服务器内部错误';
    }
    if (status === 401) {
      message = '身份过期，请重新登录';
    }
    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error,
      message,
    });
  }
}
