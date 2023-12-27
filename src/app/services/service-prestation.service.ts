import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
    
    return this.http.get(`${this.baseUrl}/prestations/prestation/nameprestation/${nameprestation}`);
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

associateSocietePrestation(id_client: number,id: number){
  return this.http.put(`${this.baseUrl}/Clients/admin/client/update/${id_client}/${id}`, {})
}
getPrestationsClientByID(id: number){
  return this.http.get(`${this.baseUrl}/prestations/prestation/Client/${id}`)
}

 

findByRcAndRsAndPropriete(rc: number, rs: string, propriete: string): Observable<string[]> {
  const params = new HttpParams()
    .set('rc', rc.toString())
    .set('rs', rs)
    .set('propriete', propriete);

  return this.http.get<string[]>(`${this.baseUrl}/prestations/prestation/Client/presta`, { params });
}
findByUniqueRC(rc: number){
  return this.http.get(`${this.baseUrl}/prestations/prestation/Clientpresta/${rc}`)
}
 
 
findByRS(rs: string) : Observable<any> {
  const params = new HttpParams()
  .set('rs', rs);
  return this.http.get(`${this.baseUrl}/prestations/prestation/Client/RS`,{ params });
}

findByPropriete(propriete: string) {
  const params = new HttpParams()
  .set('propriete' , propriete);
  return this.http.get(`${this.baseUrl}/prestations/prestation/Client/propriete`,{params});

}
findByEtape(id: number){
  const params = new HttpParams()
  .set('id' , id);
  return this.http.get(`${this.baseUrl}/prestations/prestation/Client/Etape`,{params});
}

}
