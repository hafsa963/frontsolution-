import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8080';
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }
 
  authenticateUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signin`, { username, password })
      .pipe(
        map((userInfo: { username: string; jwttoken: string; role: string }) => {
          console.log('API Response:', userInfo);
          localStorage.setItem('token', userInfo.jwttoken);
          this.currentUserSubject.next(userInfo);
          console.log('Token Stored:', userInfo.jwttoken);
          console.log('User Data Stored:', userInfo);
          return userInfo;
        }) as OperatorFunction<Object, any>
      );
  }

  getCurrentUserResponseEntity(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  logoutPage() : Observable<any>{ 

    return this.http.post(`${this.baseUrl}/auth/logout`, {})
  

  }




}

 