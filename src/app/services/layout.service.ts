import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HtmlLayout} from '../models';

@Injectable({
  providedIn: 'root',
})
export class LayoutService{
  constructor(private http: HttpClient,){

  }
  getLayout(guid: string){
    return new Promise<HtmlLayout[]>((resolve, reject) => {
      this.http.post<HtmlLayout[]>(`/api/command/html2layout/${guid}`, null)
        .subscribe({
          next: (result: HtmlLayout[]) => {
            resolve(result);
          },
          error: error => {
            reject(error);
          },
        });
    })
  }
}
