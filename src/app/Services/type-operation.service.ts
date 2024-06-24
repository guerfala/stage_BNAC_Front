import { Injectable } from '@angular/core';
import { TypeOperation } from '../Models/type-operation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeOperationService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getTypeOperation(): Observable<TypeOperation[]> {
    return this.httpClient.get<TypeOperation[]>(`${this.baseURL}ShowAllTypeOperation`);
  }
}
