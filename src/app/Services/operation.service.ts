import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operation } from '../Models/operation';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private baseURL = "http://localhost:8081/bnac/";

  constructor(private httpClient: HttpClient) { }

  getOperationList(): Observable<Operation[]> {
    return this.httpClient.get<Operation[]>(`${this.baseURL}ShowAllOperation`);
  }
}
