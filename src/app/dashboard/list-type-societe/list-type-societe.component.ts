import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Typesociete } from 'src/app/model/TypeSociete';
import { GestionClientService } from 'src/app/services/gestion-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-type-societe',
  templateUrl: './list-type-societe.component.html',
  styleUrls: ['./list-type-societe.component.css']
})
export class ListTypeSocieteComponent {
  isDropdownOpen1: boolean = false;
  selectedprestationId: any;
  isSidebarOpen = false;
  typesociete: Typesociete[] = [];
  username: any;

  ngOnInit(): void {
    this.sidebarDetail();
    this.getAll();
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
  }

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
    
  }
 

  onMouseEnter(event: any) {
    event.currentTarget.classList.add('table-primary');  
  }

  onMouseLeave(event: any) {
    event.currentTarget.classList.remove('table-primary');
  }

 
 

  constructor(private appService: GestionClientService, private router: Router , private userService : UserService ){}

 

  getAll() {
    return this.appService.getAll().subscribe(
      (results: any) => {
        this.typesociete = results;
        console.log(results)
      },
      (error) => {
        console.error('ERROR : ', error);
      })
  }

  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
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

 
CloseModel(){
  const Modeldiv = document.getElementById('modelarchive');
  if(Modeldiv != null){

    Modeldiv.style.display = 'none';
  }
}

showFixedButton: boolean = false;

@HostListener('window:scroll', ['$event'])
onScroll(event: Event): void {

  this.showFixedButton = window.scrollY > 100;
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


logout() {     
       
  this.router.navigate(["/"]); 
  console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
   window.sessionStorage.clear();  
 }


}
