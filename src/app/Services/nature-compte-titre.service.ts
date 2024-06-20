import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NatureCompteTitreService {
  apiUrl = 'http://localhost:8081/bnac'; 

  constructor(private http: HttpClient) { }

  getAllNatureCompteTitres() {
    return this.http.get(`${this.apiUrl}/getAllNatureCompteTitres`);
  }

  createNatureCompteTitre(natureCompteTitre: any) {
    return this.http.post(`${this.apiUrl}/createNatureCompteTitre`, natureCompteTitre);
  }

  updateNatureCompteTitre(id: number, natureCompteTitre: any) {
    return this.http.put(`${this.apiUrl}/updateNatureCompteTitre/${id}`, natureCompteTitre);
  }

  deleteNatureCompteTitre(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteNatureCompteTitre/${id}`);
  }
}
