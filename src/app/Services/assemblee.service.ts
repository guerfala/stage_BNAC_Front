import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assemblee } from '../Models/assemblee';

@Injectable({
  providedIn: 'root'
})
export class AssembleeService {
  private baseURL="http://localhost:8081/bnac/"

  constructor(private http: HttpClient) { }

  createAssemblee(assemblee: Assemblee): Observable<Assemblee> {
    return this.http.post<Assemblee>(`${this.baseURL}/newAssemblee`, assemblee);
  }

  updateAssemblee(id: number, assemblee: Assemblee): Observable<Assemblee> {
    return this.http.put<Assemblee>(`${this.baseURL}/${id}`, assemblee);
  }

  getAllAssemblees(): Observable<Assemblee[]> {
    return this.http.get<Assemblee[]>(`${this.baseURL}/getAllAssemblees`);
  }

  getAssembleeById(id: number): Observable<Assemblee> {
    return this.http.get<Assemblee>(`${this.baseURL}/GetById/${id}`);
  }

  deleteAssemblee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/Delete/${id}`);
  }
}
