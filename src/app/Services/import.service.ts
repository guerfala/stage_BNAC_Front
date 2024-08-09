import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Import } from '../Models/import';
import { FGO } from '../Models/fgo';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private baseUrl = 'http://localhost:8081/bnac'; 

  constructor(private http: HttpClient) {}

  getEmetteurLibelleCourts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/libelleCourt`);
  }

  getTitreLibelleCourtsByEmetteurId(emetteurId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/titres/${emetteurId}`);
  }

  importData(data: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/import`, data);
  } 

  uploadFile(formData: any, emetteurId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload/${emetteurId}`, formData);
  }

  saveFCRA(importData: Import[], emetteurId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/savefcra/${emetteurId}`, importData);
  }

  saveImportDataFCRA(importData: Import, emetteurId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/importfcra/${emetteurId}`, importData);
  }

  saveImportDataFGO(importData: Import, emetteurId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/importfgo/${emetteurId}`, importData);
  }

  getFGO(emetteurId: string, titreId: string): Observable<Import[]> {
    return this.http.get<Import[]>(`${this.baseUrl}/getFGO/${emetteurId}/${titreId}`);
  }

  getFCRA(emetteurId: string, titreId: string): Observable<Import[]> {
    return this.http.get<Import[]>(`${this.baseUrl}/getFCRA/${emetteurId}/${titreId}`);
  }

  traiterFCRA(emetteurId: string, titreId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/traiterFCRA/${emetteurId}/${titreId}`, null);
  }

  traiterFGO(emetteurId: string, titreId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/traiterFGO/${emetteurId}/${titreId}`, null);
  }

  exportFGO(emetteurId: string, titreId: string, minDate: Date, maxDate: Date): Observable<any> {
    const formattedMinDate = minDate.toISOString();
    const formattedMaxDate = maxDate.toISOString();
    return this.http.get(`${this.baseUrl}/download/${emetteurId}/${titreId}/${formattedMinDate}/${formattedMaxDate}`, {
        responseType: 'blob' as 'json' // Ensure it handles the binary data
    });
  }


}
 