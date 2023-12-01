import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Typesociete } from '../model/TypeSociete';

@Injectable({
  providedIn: 'root'
})
export class GestionClientService {

  baseUrl = 'http://localhost:8080'
  constructor(private http:HttpClient) { }

  

  getAllClient(){
    return this.http.get(`${this.baseUrl}/Clients/admin/client`)

  }
  
  createClient(client : any){
    return this.http.post(`${this.baseUrl}/Clients/admin/createClient`,client)
  } 
  deleteclient(id : number){
    return this.http.delete(`${this.baseUrl}/Clients/admin/deleteclient/${id}`)
  }
  
  updateClient(id: number, updatedData: any): (Observable<any>){
    return this.http.put(`${this.baseUrl}/Clients/admin/updateSociete/${id}`,updatedData)
  }

  getclientByid(id: number){
    return this.http.get(`${this.baseUrl}/Clients/client/${id}`)
  }

  //type societe
  getAll(): (Observable<any>){
    return this.http.get(`${this.baseUrl}/typesociete/admin/typesociete`)
  }
 
  createTypeSociete(typesociete: Typesociete){
    return this.http.post(`${this.baseUrl}/typesociete/admin/createTypeSociete`,typesociete)
  }
   
 


}
