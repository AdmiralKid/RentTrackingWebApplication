import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {
  catchError,
  finalize,
  from,
  map,
  mergeMap,
  Observable,
  of,
  take,
} from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenHeaderInterceptor implements HttpInterceptor {
  constructor(private afa: AngularFireAuth) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.afa.idToken.pipe(
      take(1),
      map((token) => {
        if (token && request.url.includes(environment.apiBaseURL)) {
          const newRequest = request.clone({
            setHeaders: { token: token },
          });
          return newRequest;
        }
        return request;
      }),
      mergeMap((request) => {
        return next.handle(request).pipe(
          catchError((err) => {
            console.log(err);
            return of();
          })
        );
      })
    );
  }
}
