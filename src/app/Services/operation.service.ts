import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private baseUrl = 'http://localhost:8081/bnac'; 

  constructor(private http: HttpClient) { }

  filterOperations(filterCriteria: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/operations/filter`, filterCriteria);
  }

  getActionnaireDetails(matricule: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/operations/actionnaire/${matricule}`);
  }
}
