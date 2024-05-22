import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaylistService } from '../services/playlist.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  private userId: string = "1";

  constructor(private playlistService: PlaylistService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const requestWithHeaders = request.clone({
      headers: request.headers.set("userId", this.userId)
    })

    return next.handle(requestWithHeaders);
  }
}
