import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Presents, PresentsId } from '../Models/presents';

@Injectable({
  providedIn: 'root'
})
export class PresentsService {
  private baseURL = 'http://localhost:8081/bnac/presents';

  constructor(private http: HttpClient) { }

  addPresents(presents: Presents): Observable<Presents> {
    return this.http.post<Presents>(`${this.baseURL}/add`, presents);
  }

  deletePresents(presentsId: PresentsId): Observable<void> {
    return this.http.post<void>(`${this.baseURL}/delete`, presentsId);
  }
  getAllPresents(): Observable<Presents[]> {
    return this.http.get<Presents[]>(`${this.baseURL}/all`);
  }

}
