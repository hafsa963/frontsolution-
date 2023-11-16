import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Societe } from '../model/societe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocieteService {

  baseUrl = 'http://localhost:8080'
  constructor(private http:HttpClient) { }

  getAllsociete(): Observable<any>{

    return this.http.get(`${this.baseUrl}/societes/admin/societe`)
   
    
  }
  
  
   
  saveSociete(societe : any) {
 
    return this.http.post(`${this.baseUrl}/societes/admin/createSociete`, societe);
  }
  deleteSociete(id:number) : Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/societes/admin/deleteSociete/${id}`)
  }
  updateSociete(id: number, updatedData: any): Observable<any>{
    return this.http.put(`${this.baseUrl}/societes/admin/updateSociete/${id}`,updatedData)
  }
  getSocieteById(id:number) {
    return this.http.get(`${this.baseUrl}/societes/societe/${id}`)
  }

  getSocieteByName(nom : string){

    return this.http.get(`${this.baseUrl}/societes/admin/societe/name/${nom}`)
  }

  getSocieteByRc(rc:number){
    return this.http.get(`${this.baseUrl}/societes/admin/societe/rc/${rc}`)
  }
  deleteManager(id:number){ 
  return this.http.delete(`${this.baseUrl}/societes/admin/deleteManager/${id}`)
  }
  sortByName(propriete : string){
    return this.http.delete(`${this.baseUrl}/societes/admin/societe/sort/${propriete}`)
  }
}
