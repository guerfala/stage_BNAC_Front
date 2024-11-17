import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Titre } from '../Models/titre';

@Injectable({
  providedIn: 'root'
})
export class TitreService {

  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  getTitresByEmetteur(idEmetteur: string): Observable<Titre[]> {
    return this.httpClient.get<Titre[]>(`${this.baseURL}${idEmetteur}/titres`);
  }

  getIsinByIdTitre(id: string): Observable<string> {
    return this.httpClient.get(`${this.baseURL}getIsinByIdTitre/${id}`, { responseType: 'text' });
  }

  getAllTitres(): Observable<Titre[]> {
    return this.httpClient.get<Titre[]>(`${this.baseURL}getAllTitres`); 
  }
  addTitre(titre: Titre): Observable<Titre> {
    return this.httpClient.post<Titre>(this.baseURL, titre);
  }

  updateTitre(id: string, titre: Titre): Observable<Titre> {
    return this.httpClient.put<Titre>(`${this.baseURL}${id}`, titre);
  }

  deleteTitre(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}${id}`);
  }

 

 searchTitres(criteria: any): Promise<Titre[]> {
    let params = new HttpParams();

    if (criteria.idTitre) {
      params = params.set('idTitre', criteria.idTitre);
    }
    if (criteria.libelleCourt) {
      params = params.set('libelleCourt', criteria.libelleCourt);
    }
    if (criteria.libelleLong) {
      params = params.set('libelleLong', criteria.libelleLong);
    }
    if (criteria.idEmetteur) {
      params = params.set('idEmetteur', criteria.idEmetteur);
    }

    return this.httpClient.get<Titre[]>(`${this.baseURL}searchTitres`, { params })
      .toPromise()
      .then(data => data as Titre[]) // Cast to Titre[] explicitly
      .catch(error => {
        console.error('Error searching titres:', error);
        return []; // Return an empty array in case of error or no results found
      });
  }
}
