import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Upload } from '../modeles/upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }



   getAllImage(): Observable<Upload[]> {
    return this.httpClient.get<Upload[]>('http://localhost:8080/upload');
  }

  getImageById(id: number): Observable<Upload> {
    return this.httpClient.get<Upload>('http://localhost:8080/upload/' + id);
  }

}
