import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assemblee } from '../Models/assemblee';
import { Emetteur } from '../Models/emetteur';

@Injectable({
  providedIn: 'root'
})
export class AssembleeService {
  private baseUrl = "http://localhost:8081/bnac";

  constructor(private http: HttpClient) { }

  getAllAssemblees(): Observable<Assemblee[]> {
    return this.http.get<Assemblee[]>(`${this.baseUrl}/assemblees`);
  }

  getAssembleeById(id: number): Observable<Assemblee> {
    return this.http.get<Assemblee>(`${this.baseUrl}/assemblees/${id}`);
  }

  createAssemblee(assemblee: Assemblee): Observable<Assemblee> {
    return this.http.post<Assemblee>('http://localhost:8081/bnac/newAssemblee', assemblee);
  }
  updateAssemblee(id: number, assemblee: Assemblee): Observable<Assemblee> {
    return this.http.put<Assemblee>(`${this.baseUrl}/assemblees/${id}`, assemblee);
  }

  deleteAssemblee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/assemblees/${id}`);
  }

  searchEmetteurs(query: string): Observable<Emetteur[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Emetteur[]>(`${this.baseUrl}/emetteurs/search`, { params });
  }
  
  getAllEmetteurs(query: string): Observable<Emetteur[]> {
    return this.http.get<Emetteur[]>(`${this.baseUrl}/emetteur/search?${query}`);
  }
  

}
