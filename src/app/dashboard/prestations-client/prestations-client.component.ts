import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { GestionClientService } from 'src/app/services/gestion-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-prestations-client',
  templateUrl: './prestations-client.component.html',
  styleUrls: ['./prestations-client.component.css']
})
export class PrestationsClientComponent {
  isSidebarOpen = false;
  element: boolean = false;
  selectedData: any; 

 // client: any[] = [];
  rechercheForm: FormGroup = new FormGroup({});
   client: Client[] = [];
  clientrs: string[] = [];
  clientrc: number[] = [];
  clientpropriete: string[] = [];
  username: any;

  constructor(private appService : GestionClientService, private router : Router, private userService :UserService , private fb: FormBuilder){
    
      
    this.rechercheForm = this.fb.group({
      
      propriete: [''],
      rs: [''],
      rc: [''],
    });
  }


  logout() {     
       
    this.router.navigate(["/"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
   }

   
  

 
  ngOnInit(): void {
     
    if (history.state.element !== undefined) {
      this.element = history.state.element;
    }
    this.selectedData = history.state.selectedData;
    console.log(this.selectedData);
       console.log(this.client);
      
    this.appService.getAllClient().subscribe(
      (response: any) => {
          this.client = response as Client[];  
          this.clientrs = this.client.map(client => client.rs); 
          this.clientrc = this.client.map(client => client.rc);
          this.clientpropriete = this.client.map(client => client.propriete);
          console.log(this.client);
      },
      (error) => {
        console.log(this.client);
        console.error('Error fetching rs data:', error);
      }
    );
  
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
  
    this.sidebarDetail();
  }
  
  showFixedButton: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
 
    this.showFixedButton = window.scrollY > 100;
    
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
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
 onMouseEnter(event: any) {
  event.currentTarget.classList.add('table-primary');  
}

onMouseLeave(event: any) {
  event.currentTarget.classList.remove('table-primary');
}

}
