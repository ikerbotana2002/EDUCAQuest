import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      console.log('Hola');
      request = request.clone({setHeaders: {Autoritation: `Bearer ${token}`}});
    }
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
  
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
      return throwError( () => new Error("error"));
    }));
  }
}

