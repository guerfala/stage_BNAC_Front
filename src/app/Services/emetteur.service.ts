import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Emetteur } from '../Models/emetteur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmetteurService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getEmetteurList(): Observable<Emetteur[]>{
    return this.httpClient.get<Emetteur[]>(`${this.baseURL+"ShowAllEmetteur"}`);
  }

  getAllEmetteurLibelleCourt(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.baseURL}/libelleCourt`);
  }

  getAllEmetteurs(query: string): Observable<Emetteur[]> {
    const url = `http://localhost:8081/bnac/emetteurs/search?query=${encodeURIComponent(query)}`;
    return this.httpClient.get<Emetteur[]>(url);
  }


    searchEmetteurs(query: string): Observable<Emetteur[]> {
      return this.getAllEmetteurs(query);
    }
}
