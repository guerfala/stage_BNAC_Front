import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presents, PresentsId } from '../Models/presents';

@Injectable({
  providedIn: 'root'
})
export class PresentsService {

  private baseUrl = 'http://localhost:8081/bnac';

  constructor(private http: HttpClient) { }

  getAllPresents(): Observable<Presents[]> {
    return this.http.get<Presents[]>(`${this.baseUrl}/ShowAllPresents`);
  }

  getPresentsById(id: PresentsId): Observable<Presents> {
    const url = `${this.baseUrl}/${id.idEmetteur}/${id.IdTypeAssemblee}/${id.Matricule}/${id.IdPresent}`;
    return this.http.get<Presents>(url);
  }

  createPresents(presents: Presents): Observable<Presents> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Presents>(`${this.baseUrl}/NewPresents`, presents, { headers });
  }

  updatePresents(id: PresentsId, presents: Presents): Observable<Presents> {
    const url = `${this.baseUrl}/${id.idEmetteur}/${id.IdTypeAssemblee}/${id.Matricule}/${id.IdPresent}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Presents>(url, presents, { headers });
  }

  deletePresents(id: PresentsId): Observable<void> {
    const url = `${this.baseUrl}/${id.idEmetteur}/${id.IdTypeAssemblee}/${id.Matricule}/${id.IdPresent}`;
    return this.http.delete<void>(url);
  }
}