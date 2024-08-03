import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeAssemblee } from '../Models/type-assemblee';

@Injectable({
  providedIn: 'root'
})
export class TypeAssembleeService {
  private baseURL = 'http://localhost:8081/bnac'; // Ensure this URL is correct

  constructor(private http: HttpClient) { }

  getAllTypeAssemblees(): Observable<TypeAssemblee[]> {
    return this.http.get<TypeAssemblee[]>(`${this.baseURL}/getAllTypeAssemblees`);
  }
}
