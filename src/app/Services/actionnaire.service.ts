import { Injectable } from '@angular/core';
import { Actionnaire } from '../Models/actionnaire';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionnaireService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getActionnaireList(): Observable<Actionnaire[]>{
    return this.httpClient.get<Actionnaire[]>(`${this.baseURL+"getAllActionnaires"}`);
  }

}
