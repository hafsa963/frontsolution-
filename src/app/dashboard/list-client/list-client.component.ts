import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
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
  isSidebarExpanded: boolean = false;
  @ViewChild('sidebar') sidebarElement!: ElementRef;
  username: any;
  constructor(private appService: GestionClientService, private userService: UserService, private router: Router) {
 
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
     
      this.checkWindowSize();
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

@HostListener('window:resize', ['$event'])
onResize(event: any) {
  
  this.checkWindowSize();
}

toggleSidebar(): void {
  this.isSidebarExpanded = !this.isSidebarExpanded;
 
}




 private checkWindowSize(): void {
  
  const windowWidth = window.innerWidth;

   
  this.isSidebarExpanded = windowWidth >= 768;

 
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


closesidebar() {
  this.isSidebarExpanded = true;

}

 

}
