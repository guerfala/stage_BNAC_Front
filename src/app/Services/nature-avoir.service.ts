import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NatureAvoir } from '../Models/nature-avoir';

@Injectable({
  providedIn: 'root'
})
export class NatureAvoirService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getNatureAvoir(): Observable<NatureAvoir[]> {
    return this.httpClient.get<NatureAvoir[]>(`${this.baseURL}getAllNatureAvoirs`);
  }

  getAllNatureAvoirs(): Observable<NatureAvoir[]> {
    return this.httpClient.get<NatureAvoir[]>(`${this.baseURL}getAllNatureAvoirs`);
  }

  addNatureAvoir(natureAvoir: NatureAvoir): Observable<NatureAvoir> {
    return this.httpClient.post<NatureAvoir>(`${this.baseURL}addNatureAvoir`, natureAvoir);
  }

  updateNatureAvoir(id: number, natureAvoir: NatureAvoir): Observable<NatureAvoir> {
    return this.httpClient.put<NatureAvoir>(`${this.baseURL}updateNatureAvoir/${id}`, natureAvoir);
  }

  deleteNatureAvoir(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}deleteNatureAvoir/${id}`);
  }
}
