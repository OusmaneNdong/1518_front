import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
    if (!request.url.includes('/authentication') || !request.url.includes('/register') || !request.url.includes('/reset-password') || !request.url.includes('/forget-password')) {
      const token = localStorage.getItem("token") 
      if (token) {
       const authReq  = request.clone({
        headers: new HttpHeaders({
         Authorization: 'Bearer ' + token
        })
       });
       return next.handle(authReq)
      }
    }
   
    return next.handle(request);
}
}
