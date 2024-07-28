import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MouvementsDTO } from '../Models/mouvements-dto';
import { HttpClient } from '@angular/common/http';
import { JournalsDTO } from '../Models/journals-dto';
import { SoldeDTO } from '../Models/solde-dto';

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
    return this.httpClient.get<MouvementsDTO[]>(`${this.baseURL}ShowAllMouvementsByMatriculeAndTc/${idTitre}/${formattedminDate}/${formattedmaxDate}/${matricule}/${idTC}`);
  }

  getActionnaireMouvement(idTitre: string, maxDate: Date, matricule: number): Observable<SoldeDTO[]> {
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<SoldeDTO[]>(`${this.baseURL}GetActionnaireMouvement/${idTitre}/${formattedmaxDate}/${matricule}`);
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

  getJournalsByMatricule(idTitre: string, minDate: Date, maxDate: Date, matricule: number): Observable<JournalsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<JournalsDTO[]>(`${this.baseURL}ShowAllJournalsByMatricule/${idTitre}/${formattedminDate}/${formattedmaxDate}/${matricule}`);
  }

  getJournalsByMatriculeAndTc(idTitre: string, minDate: Date, maxDate: Date, matricule: number, tc: string): Observable<JournalsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<JournalsDTO[]>(`${this.baseURL}ShowAllJournalsByMatriculeAndTc/${idTitre}/${formattedminDate}/${formattedmaxDate}/${matricule}/${tc}`);
  }

  getJournalsByMatriculeAndTypeOp(idTitre: string, minDate: Date, maxDate: Date, matricule: number, typeOp: string): Observable<JournalsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<JournalsDTO[]>(`${this.baseURL}ShowAllJournalsByMatriculeAndTypeOp/${idTitre}/${formattedminDate}/${formattedmaxDate}/${matricule}/${typeOp}`);
  }

  getJournalsByMatriculeAndByTcAndByTypeOp(idTitre: string, minDate: Date, maxDate: Date, matricule: number, tc: string, typeOp: string): Observable<JournalsDTO[]> {
    const formattedminDate = minDate.toISOString();
    const formattedmaxDate = maxDate.toISOString();
    return this.httpClient.get<JournalsDTO[]>(`${this.baseURL}ShowAllJournalsByMatriculeAndByTcAndByTypeOp/${idTitre}/${formattedminDate}/${formattedmaxDate}/${matricule}/${tc}/${typeOp}`);
  }
}