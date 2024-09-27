
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let mod=request.clone(
      {
         //method:'post',
         body:{name:"hello"},
         headers:new HttpHeaders({
           Autherization:'bearer'
         })
      }
    )
    return next.handle(mod);
  }
}

