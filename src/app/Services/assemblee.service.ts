import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assemblee } from '../Models/assemblee';
import { TypeAssemblee } from '../Models/type-assemblee';
@Injectable({
  providedIn: 'root'
})
export class AssembleeService {
  private baseURL="http://localhost:8081/bnac"

  constructor(private http: HttpClient) { }

  getAllAssemblees(): Observable<Assemblee[]> {
    return this.http.get<Assemblee[]>(`${this.baseURL}/getAllAssemblees`);
  } 

  createAssemblee(assemblee: Assemblee): Observable<Assemblee> {
    return this.http.post<Assemblee>(`${this.baseURL}/newAssemblee`, assemblee);
  }

  updateAssemblee(id: number, assemblee: Assemblee): Observable<Assemblee> {
    return this.http.put<Assemblee>(`${this.baseURL}/${id}`, assemblee);
  }

  getAssembleeById(id: number): Observable<Assemblee> {
    return this.http.get<Assemblee>(`${this.baseURL}/GetById/${id}`);
  }

  deleteAssemblee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/Delete/${id}`);
  }

  getAllTypeAssemblees(): Observable<TypeAssemblee[]> {
    return this.http.get<TypeAssemblee[]>(`${this.baseURL}/getAllTypeAssemblees`);
  }
  
}
