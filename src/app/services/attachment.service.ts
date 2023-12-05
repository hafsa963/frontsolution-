import { HttpClient, HttpEvent, HttpHeaders,HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Attachment } from '../model/attachment';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  baseUrl = 'http://localhost:8080'


  constructor(private http:HttpClient) { }
   
  uploadFile(file: File , id:number){
    const formData: FormData = new FormData();
    formData.append('file', file);
    const url = `${this.baseUrl}/attachment/upload/${id}`
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = (e) => {

      if (xhr.status === 200) {
        console.log('SUCCESS', xhr.responseText);
      } else {
        console.warn('request_error');
      }
    };

    xhr.open('POST', url, true);
    xhr.send(formData);

   }

  downloadFile(fileName:string) {
    return this.http.get(`${this.baseUrl}/client/download/${fileName}`)
  }
}
