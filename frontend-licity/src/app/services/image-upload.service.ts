import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FileResponse } from '../interfaces/file-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  private apiUrl = `${environment.apiUrl}/images/upload`;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<FileResponse> {
    const formData = new FormData();
    formData.append('image', file);

    return this.http.post<FileResponse>(this.apiUrl, formData);
  }
}
