import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prestation } from '../model/prestation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicePrestationService {

  baseUrl = 'http://localhost:8080'

  constructor(private http:HttpClient) { }

  createPrestation(prestation:Prestation){
    return this.http.post(`${this.baseUrl}/prestations/prestation`,prestation)
  }

  getAllPrestations(){
    return this.http.get(`${this.baseUrl}/prestations/getAll`)
  }
  getNamePrestations(){
    return this.http.get(`${this.baseUrl}/prestations/getAllNamePrestations`)
  }
  
  
  // updatePrestationById(id: number, selectedprestation: any): Observable<any> {
  //   return this.http.put(`${this.baseUrl}/prestations/admin/updatePrestation/${id}`, selectedprestation);
  // }

  updatePrestation(id: number, selectedprestation : any): Observable<any> {
    return this.http.put(`${this.baseUrl}/prestations/admin/updatePrestation/${id}`, selectedprestation );
  }

  // getbymission(namePrestation : string) : Observable<any>{
  //   return this.http.get(`${this.baseUrl}/prestation/nameprestation/${namePrestation}`);
  // }

  getbymission(nameprestation: string): Observable<any> {
    
    return this.http.get(`${this.baseUrl}/prestation/nameprestation/${nameprestation}`);
  }

  
  deletePrestation(id : number){
    return this.http.delete(`${this.baseUrl}/prestations/prestation/${id}`);
  }

  

}
