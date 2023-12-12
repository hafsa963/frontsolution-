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

  // createPrestation(prestation:Prestation){
  //   return this.http.post(`${this.baseUrl}/prestations/prestation`,prestation)
  // }

  createPrestation(prestation: Prestation) {
    return this.http.post(`${this.baseUrl}/prestations/prestation`, prestation)
       
  }

   getAll(){
    return this.http.get(`${this.baseUrl}/prestations/getAll`)
  }
  getNamePrestations(){
    return this.http.get(`${this.baseUrl}/prestations/getAllNamePrestations`)
  }
 

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

  deleteEtape(id : number){
    return this.http.delete(`${this.baseUrl}/prestations/admin/deleteEtape/${id}`);
  }
  

  getalletapeByPrestation(id: number){
    return this.http.get(`${this.baseUrl}/prestations/prestationbyetape/id/${id}`)
  }

associateSocietePrestation(id: number ,id_client: number){
  return this.http.put(`${this.baseUrl}/Clients/admin/client/update/${id_client}/${id}`, {})
}
  

}
