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

  getEtatActionnairesByEmetteurAndTitre(idEmetteur: string, idTitre: string, selectedDate: Date): Observable<ActionnaireDTO[]> {
    const formattedDate = selectedDate.toISOString();
    return this.httpClient.get<ActionnaireDTO[]>(`${this.baseURL}filterEtat/${idEmetteur}/${idTitre}/${formattedDate}`);
  }

  getEtatActionnairesByEmetteurAndTitreAndTc(idEmetteur: string, idTitre: string, idTC: string, selectedDate: Date): Observable<ActionnaireDTO[]> {
    const formattedDate = selectedDate.toISOString();
    return this.httpClient.get<ActionnaireDTO[]>(`${this.baseURL}filterEtat/${idEmetteur}/${idTitre}/${idTC}/${formattedDate}`);
  }

  getEtatActionnairesByEmetteurAndTitreAndTcAndNc(idEmetteur: string, idTitre: string, idTC: string, idNatureCompte: number, selectedDate: Date): Observable<ActionnaireDTO[]> {
    const formattedDate = selectedDate.toISOString();
    return this.httpClient.get<ActionnaireDTO[]>(`${this.baseURL}filterEtat/${idEmetteur}/${idTitre}/${idTC}/${idNatureCompte}/${formattedDate}`);
  }

  getEtatActionnairesByEmetteurAndTitreAndTcAndNcAndNa(idEmetteur: string, idTitre: string, idTC: string, idNatureCompte: number, idNatureAvoir:number, selectedDate: Date): Observable<ActionnaireDTO[]> {
    const formattedDate = selectedDate.toISOString();
    return this.httpClient.get<ActionnaireDTO[]>(`${this.baseURL}filterEtat/${idEmetteur}/${idTitre}/${idTC}/${idNatureCompte}/${idNatureAvoir}/${formattedDate}`);
  }

}
