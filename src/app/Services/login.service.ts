import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private baseURL="http://localhost:8081/bnac/"

  constructor(private httpClient: HttpClient) { }

  login(email: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${this.baseURL}/login`, {
      params: {
        email: email,
        password: password
      }
    });
  }
}
