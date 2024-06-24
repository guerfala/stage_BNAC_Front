import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MouvementsDTO } from '../Models/mouvements-dto';
import { HttpClient } from '@angular/common/http';
import { JournalsDTO } from '../Models/journals-dto';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getMouvements(idTitre: string, minDate: Date, maxDate: Date): Observable<MouvementsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<MouvementsDTO[]>(`${this.baseURL}ShowAllMouvements/${idTitre}/${formattedminDate}/${formattedmaxDate}`);
  }

  getMouvementsByTc(idTitre: string, minDate: Date, maxDate: Date, idTC: string): Observable<MouvementsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<MouvementsDTO[]>(`${this.baseURL}ShowAllMouvementsByTc/${idTitre}/${formattedminDate}/${formattedmaxDate}/${idTC}`);
  }

  getMouvementsByMatricule(idTitre: string, minDate: Date, maxDate: Date, matricule: number): Observable<MouvementsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<MouvementsDTO[]>(`${this.baseURL}ShowAllMouvementsByMatricule/${idTitre}/${formattedminDate}/${formattedmaxDate}/${matricule}`);
  }

  getMouvementsByMatriculeAndByTc(idTitre: string, minDate: Date, maxDate: Date, idTC: string, matricule: number): Observable<MouvementsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<MouvementsDTO[]>(`${this.baseURL}ShowAllMouvementsByTc/${idTitre}/${formattedminDate}/${formattedmaxDate}/${idTC}/${matricule}`);
  }

  getJournals(idTitre: string, minDate: Date, maxDate: Date): Observable<JournalsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<JournalsDTO[]>(`${this.baseURL}ShowAllJournals/${idTitre}/${formattedminDate}/${formattedmaxDate}`);
  }

  getJournalsByTc(idTitre: string, minDate: Date, maxDate: Date, idTC: string): Observable<JournalsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<JournalsDTO[]>(`${this.baseURL}ShowAllJournalsByTc/${idTitre}/${formattedminDate}/${formattedmaxDate}/${idTC}`);
  }

  getJournalsByTypeOp(idTitre: string, minDate: Date, maxDate: Date, typeOp: string): Observable<JournalsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<JournalsDTO[]>(`${this.baseURL}ShowAllJournalsByTypeOperation/${idTitre}/${formattedminDate}/${formattedmaxDate}/${typeOp}`);
  }

  getJournalsByTypeOpAndTc(idTitre: string, minDate: Date, maxDate: Date, typeOp: string, tc: string): Observable<JournalsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<JournalsDTO[]>(`${this.baseURL}ShowAllJournalsByTypeOperationAndTc/${idTitre}/${formattedminDate}/${formattedmaxDate}/${typeOp}/${tc}`);
  }
}
