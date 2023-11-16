import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8080'
  constructor(private http:HttpClient) {  }

  authenticateUser(username: string, password: string) {
  
    return this.http.post(`${this.baseUrl}/auth/signin`, { username, password });
  }

   


  
}
