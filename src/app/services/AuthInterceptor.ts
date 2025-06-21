import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PdfService} from './pdf.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private pdfService: PdfService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.pdfService.token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.pdfService.token}`
        }
      });
      return next.handle(authReq);
    }

    // 如果没有token，直接放行请求
    return next.handle(req);
  }
}
