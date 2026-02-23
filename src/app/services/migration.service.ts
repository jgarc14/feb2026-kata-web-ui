import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MigrateResponse } from '../models/migrate-response';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MigrationService {

  private apiUrl = `${environment.apiUrl}migrate`;

  constructor(private http: HttpClient) {}

  migrate(sourceLanguage: string, targetLanguage: string, code: string): Observable<MigrateResponse> {
    console.log('Attempting migration:', this.apiUrl, sourceLanguage, targetLanguage, code);
    return this.http.post<MigrateResponse>(this.apiUrl, {
      sourceLanguage,
      targetLanguage,
      code
    });
  }
}