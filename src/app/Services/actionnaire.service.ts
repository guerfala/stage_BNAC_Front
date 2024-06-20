import { Injectable } from '@angular/core';
import { Actionnaire } from '../Models/actionnaire';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActionnaireDTO } from '../Models/actionnaire-dto';

@Injectable({
  providedIn: 'root'
})
export class ActionnaireService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getActionnaireList(): Observable<Actionnaire[]>{
    return this.httpClient.get<Actionnaire[]>(`${this.baseURL+"getAllActionnaires"}`);
  }

  getFilteredActionnaires(idEmetteur: string, idTitre: string): Observable<ActionnaireDTO[]> {
    return this.httpClient.get<ActionnaireDTO[]>(`${this.baseURL}filter/${idEmetteur}/${idTitre}`);
  }

}
