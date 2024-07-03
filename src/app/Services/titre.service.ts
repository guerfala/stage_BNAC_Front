import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Titre } from '../Models/titre'; 

@Injectable({
  providedIn: 'root'
})
export class TitreService {
  private baseUrl = 'http://localhost:8081/bnac';
  constructor(private http: HttpClient) { }
  searchTerm: string = '';


  getAllTitres(): Observable<Titre[]> {
    return this.http.get<Titre[]>(`${this.baseUrl}/getAllTitres`); 
  }
  addTitre(titre: Titre): Observable<Titre> {
    return this.http.post<Titre>(this.baseUrl, titre);
  }

  updateTitre(id: string, titre: Titre): Observable<Titre> {
    return this.http.put<Titre>(`${this.baseUrl}/${id}`, titre);
  }

  deleteTitre(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
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

    return this.http.get<Titre[]>(`${this.baseUrl}/searchTitres`, { params })
      .toPromise()
      .then(data => data as Titre[]) // Cast to Titre[] explicitly
      .catch(error => {
        console.error('Error searching titres:', error);
        return []; // Return an empty array in case of error or no results found
      });
  }
  }




