import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpHandler, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    DataService.pendingReq.emit(++DataService.pendingReqCount);

    const customReq = req.clone({
      headers: req.headers.set('x-auth', this.auth.token)
    });

    return next.handle(customReq).pipe(tap(event => {
      if (event instanceof HttpResponse) {
        DataService.pendingReq.emit(--DataService.pendingReqCount);
      }
    }));
  }
}
