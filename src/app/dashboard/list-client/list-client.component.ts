import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { AttachmentService } from 'src/app/services/attachment.service';
import { GestionClientService } from 'src/app/services/gestion-client.service';
import { UserService } from 'src/app/services/user.service';
import { Attachment } from 'src/app/model/attachment';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {

  client: any;
  attachmentId: any;
  selectedclientId: any;
  selectedData: any; 
  isSidebarExpanded: boolean = true;
  attachments: Attachment[] = [];

  
  
  @ViewChild('sidebar') sidebarElement!: ElementRef;
  isSidebarOpen = false;

 
  username: any;
   id: any;
  idInterval: any;
  constructor(private appService: GestionClientService, private userService: UserService, private router: Router, private attachment:AttachmentService,private http:HttpClient) {
 
  }
  logout() {     
       
    this.router.navigate(["/"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
   }
 
     
   openModalfiles(client:any){
    const Modeldiv = document.getElementById('modelfiles');
    if(Modeldiv != null){
       
      Modeldiv.style.display = 'block';
    }
    this.getAttachments(client.attachment);

    
  }

  CloseModelfiles(){
    const Modeldiv = document.getElementById('modelfiles');
    if(Modeldiv != null){
    
      Modeldiv.style.display = 'none';
    }
    }
  ngOnInit() {
    this.appService.getAllClient()
      .subscribe((response: any) => {  
      this.client = Array.isArray(response) ? response : [response];

      });
      this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
        if (response && response.username) {
          this.username = response.username;
          console.log('Username:', this.username);
        }
      });
     
      this.sidebarDetail();
      this.loadData(25)

  }
  onDelete(id:any) {
  
     
    this.appService.deleteclient(id).subscribe(
      (response: any) => {
        // console.log('Data has been successfully deleted:', response);
        const responseObject = { message: response };
        console.log('Data has been successfully deleted:', responseObject);
        
        this.appService.getAllClient()
        .subscribe((responseData: any) => {  
         this.client = responseData;
        });
        this.CloseModel();
        const Modeldiv = document.getElementById('toastsucces');
        if(Modeldiv != null){
          // Modeldiv.style.display = 'block';
          Modeldiv.classList.add('show');
          setTimeout(() => {
            Modeldiv.classList.remove('show');
          }, 2000);
         
        }
      },
      (error:any) => {
        console.error('An error occurred:', error);
        this.appService.getAllClient().subscribe((response: any) => {  
          this.client = response;
        });
        this.CloseModel();
      }
      
    );
   
}

SearchBy(searchInput: string) {
  debugger;
  const isNumeric = !isNaN(parseFloat(searchInput)) && isFinite(+searchInput);

  if (isNumeric) {

    this.callApi(this.appService.getSocieteByIce,+searchInput);
    this.callApi(this.appService.getByrc,+searchInput);
    this.callApi(this.appService.getByIp,+searchInput); 
    this.callApi(this.appService.getSocieteByCnss,+searchInput);
    this.callApi(this.appService.getBycapitale,+searchInput);
    this.callApi(this.appService.getByCtNum,+searchInput);
  } 
  else {

    this.callApi(this.appService.getSocieteByName,searchInput);
    this.callApi(this.appService.getByPropriete,searchInput);
    this.callApi(this.appService.getBytypesociete,searchInput); 
    this.callApi(this.appService.getByforme,searchInput);
    this.callApi(this.appService.getByforme,searchInput);
    this.callApi(this.appService.getBysiege,searchInput);
    // const lowerCaseInput = searchInput.toLowerCase();
    // const upperCaseInput = searchInput.toUpperCase();

    // switch (searchInput) {
    //   case 'name':
    //     this.callApi(this.appService.getSocieteByName, searchInput);
    //     break;
    //   case 'propriete':
    //     this.callApi(this.appService.getByPropriete, searchInput);
    //     break;
    //   case 'typesociete':
    //     this.callApi(this.appService.getBytypesociete, searchInput);
    //     break;
      
    //   case 'forme':
    //     this.callApi(this.appService.getByforme, searchInput);
    //     break;
    //   case 'siege':
    //     this.callApi(this.appService.getBysiege, searchInput);
    //     break;
     
    //   default:
    //     console.error('Invalid property name:', searchInput);
    //     break;
    // }
  }
}
 

private callApi(apiFunction: Function, value: any) {
  apiFunction.call(this.appService, value).subscribe(
    (response: any) => {
      this.client = Array.isArray(response) ? response : [response];
      console.log(this.client);
   
    },
    (error: any) => {
      console.error('Error while fetching data:', error);
    }
  );
}


 
 
onInputChange(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
 
  if (!inputValue.trim()) {
    this.appService.getAllClient().subscribe((response: any) => {  
      this.client = Array.isArray(response) ? response : [response];
    });
  }
}

passData(client: Client){
  console.log(client);
  if (client && client.id) {
    this.router.navigate(['/dataclient'], { state: { selectedData: client} });
  } else {
    
    console.error("ID is undefined for the selected societe");
  }  

}

passDataModifier(client: Client){
  console.log(client);
  if (client && client.id) {  
    this.router.navigate(['/nv-client'], { state: { selectedData: client,element: true } });
  } else {
    console.error("ID is undefined for the selected societe");
  }  
}
 



onMouseEnter(event: any) {
  event.currentTarget.classList.add('table-primary');  
}

onMouseLeave(event: any) {
  event.currentTarget.classList.remove('table-primary');
}
  
isDropdownOpen: boolean = false;
isDropdownOpen1: boolean = false;

toggleDropdown() {
  this.isDropdownOpen = !this.isDropdownOpen;
   
}
toggleDropdown1() {
  this.isDropdownOpen1 = !this.isDropdownOpen1;
  
}

openModal(clientId: any){
  this.selectedclientId = clientId;
  const Modeldiv = document.getElementById('modelarchive');
  if(Modeldiv != null){
    console.log(this.client);
   console.log(clientId);
    Modeldiv.style.display = 'block';
  }
  
}

CloseModel(){
const Modeldiv = document.getElementById('modelarchive');
if(Modeldiv != null){

  Modeldiv.style.display = 'none';
}
}
getAttachments(attachment:any[]): void {
  this.attachments= [];
  if(attachment && attachment.length) {
      this.attachments = attachment;
  }
  }


viseualiseModel(){
const Modeldivview = document.getElementById('exampleModal');
if(Modeldivview != null){

  Modeldivview.style.display = 'block';
}

}
viseualiseModelclose(){
const Modeldivview = document.getElementById('exampleModal');
if(Modeldivview != null){

  Modeldivview.style.display = 'none';
}
}


// visualiser model prestation details
viseualiseModelPrestation(){
const Modeldivview = document.getElementById('modeldetail');
if(Modeldivview != null){

  Modeldivview.style.display = 'block';
}

}

 
showFixedButton: boolean = false;

@HostListener('window:scroll', ['$event'])
onScroll(event: Event): void {

  this.showFixedButton = window.scrollY > 100;
}

listclick(id: any) {
  this.id = id;
}

 
changeUpload(event:any){
 
  const file:File = event.target.files[0];
  if (file) {
  
    this.attachment.uploadFile(file, this.id);
    this.idInterval= setInterval(() => {
      if(this.attachment.uploaded){
      clearInterval(this.idInterval);
      this.ngOnInit();
      this.id=null;
      }
      

    }, 1000);

}    
}

downloadFileById(attachment: Attachment): void {
  if (attachment.id !== undefined && attachment.id !== null) {
    this.attachment.downloadFile(attachment.id).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = attachment.name || 'downloaded_file'; // Provide a default name if 'name' is undefined
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error downloading file', error);
      }
    );
  } else {
    console.error('Invalid attachment ID');
  }
}




// uploadFile(event: any) {
//   const file = event.target.files[0];
//   const formData = new FormData();
//   formData.append('file', file);
//   // Perform the HTTP request
//   this.http.post('http://localhost:8080/client/upload/1', formData).subscribe((response) => {
//   console.log('File uploaded successfully');
//   },(error) => {
//   console.error('Error uploading file:', error);
//   });
//   }
onSubmit(event?: Event) {
  if (event) {
    event.preventDefault();
  }
  // Your form handling logic here
}

displaydatauser() {
  const Modeldivview = document.getElementById('dropmenuuser');
  if (Modeldivview != null) {
    if (Modeldivview.style.display === 'block') {
      Modeldivview.style.display = 'none';
    } else {
      Modeldivview.style.display = 'block';
    }
  }
}


toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
}
 


 

sidebarDetail(){ 
window.onload = () => {
  const sidebar = document.querySelector(".sidebar") as HTMLElement;
  const closeBtn = document.querySelector("#btn") as HTMLElement;
  const searchBtn = document.querySelector(".bx-search") as HTMLElement;

  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  searchBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }
};
}

loadData(attachmentId: number): void {
  this.attachment.getAttachmentById(attachmentId).subscribe(
    (data) => {
      this.attachment = data;
      console.log('Attachment:', this.attachment);
    },
    (error) => {
      console.error('Error:', error);
    }
  );
}
 

}
