import {UploadResult} from '../models/result';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  public token: string | undefined;
  constructor(private readonly http: HttpClient) {

  }
  executeTransfer(result: UploadResult) {
    return new Observable<string>(observer => {
      fetch(`/api/pdf2html/execute/${result.fileName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: null
      }).then(response => {
        if (!response.ok) {
          observer.error()
          return ;
        }
        const reader = response.body?.getReader();
        const pump = (): Promise<void> => reader!.read().then(({value, done}) => {
          if (done) {
            observer.complete();
            return;
          }
          // 处理接收到的数据
          if (value) {
            const chunk = new TextDecoder().decode(value);
            observer.next(chunk);
          }
          // 继续读取下一个数据块
          return pump();
        }).catch(error => {
          observer.error(error);
          return;
        });

        return pump();
      }).catch(error => {
        observer.error(error);
      });
    });
  }


uploadPdf(file: File)
{
  const formData = new FormData();
  formData.append("lastName", file.name);
  formData.append('file', file, file.name);
  return new Promise<UploadResult>((resolve, reject) => {
    this.http.post<UploadResult>("/api/pdf2html/upload", formData)
      .subscribe({
        next: (result: UploadResult) => {
          resolve(result);
        },
        error: error => {
          reject(error);
        },
      });
  })
}
}
