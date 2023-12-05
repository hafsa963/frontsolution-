import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { AttachmentService } from 'src/app/services/attachment.service';
import { GestionClientService } from 'src/app/services/gestion-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent {

  client: any;
  selectedclientId: any;
  selectedData: any; 
  isSidebarExpanded: boolean = true;
  
  
  @ViewChild('sidebar') sidebarElement!: ElementRef;
  isSidebarOpen = false;

 
  username: any;
id: any;
  constructor(private appService: GestionClientService, private userService: UserService, private router: Router, private attachment:AttachmentService,private http:HttpClient) {
 
  }
  logout() {     
       
    this.router.navigate(["/"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
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
// this.appService.getSocieteByRc(+searchInput).subscribe((response: any) => {  
    //   this.client = Array.isArray(response) ? response : [response];
    //   console.log(this.client);
       
    // });
    // this.appService.getByIp(+searchInput).subscribe((response: any) => {  
    //   this.client = Array.isArray(response) ? response : [response];
    //   console.log(this.client);
       
    // });
// SearchBy(searchInput: string) {
//   const isNumeric = !isNaN(parseFloat(searchInput)) && isFinite(+searchInput);
//   if (isNumeric) {
     
//     this.appService.getSocieteByIce(+searchInput).subscribe((response: any) => {  
//       this.client = Array.isArray(response) ? response : [response];
//       console.log(this.client);
       
//     });
//     this.appService.getSocieteByRc(+searchInput).subscribe((response: any) => {  
//       this.client = Array.isArray(response) ? response : [response];
//       console.log(this.client);
       
//     });
//     this.appService.getByIp(+searchInput).subscribe((response: any) => {  
//       this.client = Array.isArray(response) ? response : [response];
//       console.log(this.client);
       
//     });
   
//   } 
//   else {
//     this.appService.getSocieteByName(searchInput).subscribe((response: any) => {  
//       this.client = Array.isArray(response) ? response : [response];
//       console.log(this.client);
       
//     });
//     this.appService.getByPropriete(searchInput).subscribe((response: any) => {  
//       this.client = Array.isArray(response) ? response : [response];
//       console.log(this.client);
       
//     });
//     this.appService.getBytypesociete(searchInput).subscribe((response: any) => {  
//       this.client = Array.isArray(response) ? response : [response];
//       console.log(this.client);
       
//     });
//     this.appService.getBycapitale(searchInput).subscribe((response: any) => {  
//       this.client = Array.isArray(response) ? response : [response];
//       console.log(this.client);
       
//     });
//     this.appService.getByforme(searchInput).subscribe((response: any) => {  
//       this.client = Array.isArray(response) ? response : [response];
//       console.log(this.client);
       
//     });
//     this.appService.getBysiege(searchInput).subscribe((response: any) => {  
//       this.client = Array.isArray(response) ? response : [response];
//       console.log(this.client);
       
//     });
//     this.appService.getByCtNum(searchInput).subscribe((response: any) => {  
//       this.client = Array.isArray(response) ? response : [response];
//       console.log(this.client);
       
//     });
    
//   }
  
// }

 
// SearchBy(searchInput: string) {
//   debugger;
//   const isNumeric = !isNaN(parseFloat(searchInput)) && isFinite(+searchInput);

//   if (isNumeric) {
//     this.callApi(this.appService.getSocieteByRc, +searchInput);
//     this.callApi(this.appService.getByIp, +searchInput);
//     this.callApi(this.appService.getSocieteByIce, +searchInput);
//   } else {
//     const lowerCaseInput = searchInput.toLowerCase();

//     switch (lowerCaseInput) {
//       case 'name':
//       case 'NAME':
//         this.callApi(this.appService.getSocieteByName, searchInput);
//         break;
//       case 'propriete':
//       case 'PROPRIETE':
//         this.callApi(this.appService.getByPropriete, searchInput);
//         break;
//       case 'typesociete':
//       case 'TYPESOCIETE':
//         this.callApi(this.appService.getBytypesociete, searchInput);
//         break;
//       case 'capitale':
//       case 'CAPITALE':
//         this.callApi(this.appService.getBycapitale, searchInput);
//         break;
//       case 'forme':
//       case 'FORME':
//         this.callApi(this.appService.getByforme, searchInput);
//         break;
//       case 'siege':
//       case 'SIEGE':
//         this.callApi(this.appService.getBysiege, searchInput);
//         break;
//       case 'ctnum':
//       case 'CTNUM':
//         this.callApi(this.appService.getByCtNum, searchInput);
//         break;
//       default:
//         console.error('Invalid property name:', searchInput);
//         break;
//     }
//   }
// }

// private callApi(apiFunction: Function, value: any) {
//   apiFunction.call(this.appService, value).subscribe(
//     (response: any) => {
//       if (Array.isArray(response) && response.length > 0) {
//         // If data is found, use it
//         this.client = response;
//         console.log(this.client);
//       } else {
//         // If no data is found, proceed to the next case or log an error
//         console.log(`No data found for ${value}. Proceeding to the next case.`);
//       }
//     },
//     (error: any) => {
//       console.error(`Error while fetching data for ${value}:`, error);
//     }
//   );
// }

SearchBy(searchInput: string) {
  debugger;
  const isNumeric = !isNaN(parseFloat(searchInput)) && isFinite(+searchInput);

  if (isNumeric) {
    // Numeric search, execute only the getSocieteByRc API
    this.callApi(this.appService.getSocieteByIce, +searchInput);
    this.callApi(this.appService.getByrc, +searchInput);
    this.callApi(this.appService.getByIp, +searchInput);
    this.callApi(this.appService.getSocieteByCnss, +searchInput);
  } else {
     
    const lowerCaseInput = searchInput.toLowerCase();

    switch (lowerCaseInput) {
      case 'name':
        this.callApi(this.appService.getByPropriete, searchInput);
        break;
      // case 'propriete':
      //   this.callApi(this.appService.getByPropriete, searchInput);
      //   break;
       

      default:
        console.error('Invalid property name:', searchInput);
        break;
    }
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
  console.log(id);
  this.id = id;
  console.log(id);
}


 private checkWindowSize(): void {
  
  const windowWidth = window.innerWidth;

   
  this.isSidebarExpanded = windowWidth >= 768;

 
}
changeUpload(event:any){
 
  const file:File = event.target.files[0];
  if (file) {
  
    this.attachment.uploadFile(file, this.id)

 
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


 

}
