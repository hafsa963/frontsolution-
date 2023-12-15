import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Typesociete } from '../model/TypeSociete';
import { Manager } from '../model/Manager';

@Injectable({
  providedIn: 'root'
})
export class GestionClientService {

  baseUrl = 'http://localhost:8080'
  constructor(private http:HttpClient) { }

  

  getAllClient() : (Observable<any>){
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
  // const apiUrl = `http://localhost:8080/Clients/admin/client/rc/${ice}`;
  // return this.http.get(apiUrl);
  // getSocieteByIce(ice : number){
  //   return this.http.get(`${this.baseUrl}​/Clients​/admin​/client​/ice​/${ice}`)
  // }
  
  
  //type societe
  getAll(): (Observable<any>){
    return this.http.get(`${this.baseUrl}/typesociete/admin/typesociete`)
  }
 
  createTypeSociete(typesociete: Typesociete){
    return this.http.post(`${this.baseUrl}/typesociete/admin/createTypeSociete`,typesociete)
  }
  getSocieteByName(rs : string){

    return this.http.get(`${this.baseUrl}/Clients/admin/client/rs/${rs}`)
  }

  getByrc(rc:number){
    return this.http.get(`${this.baseUrl}/Clients/admin/client/rc/${rc}`)
  }
  getSocieteByIce(ice: number) {
    return this.http.get(`${this.baseUrl}/Clients/admin/client/ice/${ice}`);
  }
  getBycapitale(capitale​ : string){
    return this.http.get(`${this.baseUrl}/Clients/admin/client/capitale/${capitale}`)
  }
  getSocieteByCnss(cnss : string){
    return this.http.get(`${this.baseUrl}/Clients/admin/client/cnss/${cnss}`)
  }

  getByCtNum(ctNum : string){
    return this.http.get(`${this.baseUrl}/Clients/admin/client/ctNum/${ctNum}`)
  }
  getByforme(forme : string){
    return this.http.get(`${this.baseUrl}/Clients/admin/client/forme/${forme}`)
  } 
  
  getByIp(ip : number){
    return this.http.get(`${this.baseUrl}/Clients/admin/client/ip/${ip}`)
  }
  getByPropriete(propriete : string){
    return this.http.get(`${this.baseUrl}/Clients/admin/client/propriete/${propriete}`)
  }
  getBysiege(siege : string){
    return this.http.get(`${this.baseUrl}/Clients/admin/client/siege/${siege}`)

  }
  
  getBytypesociete(typesociete : string){
    return this.http.get(`${this.baseUrl}/Clients/admin/client/typesociete/${typesociete}`)
  }
  
 

  CreateManager(manager: Manager){
    return this.http.post(`${this.baseUrl}/Clients/admin/createManager`,manager)
  }
  
  getAllManager(): (Observable<any>){
    return this.http.get(`${this.baseUrl}/Clients/admin/getall`)
  }

  updatemanager(id: number, updatedData: any){
     
    return this.http.put(`${this.baseUrl}/Clients/admin/updatemanager/${id}`,updatedData)
  }
}
