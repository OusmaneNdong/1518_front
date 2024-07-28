import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  // private apiUrl = environment.apiUrl;
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }


  uploadFile(file: File): Observable<number> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl + '/upload', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getUploadProgress(event)),
    );
  }

  // private getUploadProgress(event: any): number {
  //   if (event.type === HttpEventType.UploadProgress) {
  //     const percentDone = Math.round((event.loaded / event.total) * 100);
  //     return percentDone;
  //   }
  //   return null;
  // }

  private getUploadProgress(event: any): number {
    if (event.type === HttpEventType.UploadProgress) {
      const percentDone = Math.round((event.loaded / event.total) * 100);
      return percentDone;
    }
    // return null;
    return 0;
  }
  getFiles(): Observable<any> {
    return this.http.get<File[]>(this.apiUrl + '/file');
  }

  downloadFile(fileId: number): Observable<HttpResponse<Blob>> {
    return this.http.get(this.apiUrl + `/download/${fileId}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }


}
