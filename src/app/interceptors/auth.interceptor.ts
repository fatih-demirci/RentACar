import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService,) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenModel = this.localStorageService.getItem("token")
    let token
    if (tokenModel != null) {
      token = tokenModel.token
    } else {
      token = ""
    }
    let newRequest: HttpRequest<any> = request.clone({
      headers: request.headers.set("Authorization", "bearer " + token)
    })
    return next.handle(newRequest);
  }
}
