import {CallHandler, Injectable, NestInterceptor} from '@nestjs/common'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import {RCode} from "../constant/rcode";

interface data<T> {
    data: T
}

@Injectable()
export class HttpResponseInterceptor<T = any> implements NestInterceptor {
    intercept(context, next: CallHandler): Observable<data<T>> {
        return next.handle().pipe(map(data => {
            return {
                data,
                code: RCode.OK,
                message: "成功"
            }
        }))
    }
}