import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NatureAvoir } from '../Models/nature-avoir';

@Injectable({
  providedIn: 'root'
})
export class NatureAvoirService {
  private baseUrl = 'http://localhost:8081/bnac';

  constructor(private http: HttpClient) { }

  getAllNatureAvoirs(): Observable<NatureAvoir[]> {
    return this.http.get<NatureAvoir[]>(`${this.baseUrl}/getAllNatureAvoirs`);
  }

  addNatureAvoir(natureAvoir: NatureAvoir): Observable<NatureAvoir> {
    return this.http.post<NatureAvoir>(`${this.baseUrl}/addNatureAvoir`, natureAvoir);
  }

  updateNatureAvoir(id: number, natureAvoir: NatureAvoir): Observable<NatureAvoir> {
    return this.http.put<NatureAvoir>(`${this.baseUrl}/updateNatureAvoir/${id}`, natureAvoir);
  }

  deleteNatureAvoir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteNatureAvoir/${id}`);
  }
  getNatureAvoir(): Observable<NatureAvoir[]> {
    return this.http.get<NatureAvoir[]>(`${this.baseUrl}getAllNatureAvoirs`);
  }
}
