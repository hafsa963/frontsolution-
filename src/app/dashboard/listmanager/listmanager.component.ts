import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Manager } from 'src/app/model/Manager';
import { GestionClientService } from 'src/app/services/gestion-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-listmanager',
  templateUrl: './listmanager.component.html',
  styleUrls: ['./listmanager.component.css']
})
export class ListmanagerComponent {
  isSidebarOpen =  false;
  manager: any;
  username: any;
  selectedData: any; 
  constructor(private appService: UserService,private router: Router,private gestionclient: GestionClientService,) {
  }
  ngOnInit() {
    this.appService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
    this.gestionclient.getAllManager()
      .subscribe((response: any) => {  
      this.manager = Array.isArray(response) ? response : [response];
      console.log(this.manager);
      });
 
      this.sidebarDetail();
  }
  logout() {     
       
    this.router.navigate(["/"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
   }
  onMouseEnter(event: any) {
    event.currentTarget.classList.add('table-primary');  
  }

  onMouseLeave(event: any) {
    event.currentTarget.classList.remove('table-primary');
  }
  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
 
 /* modifier*/
 passData(manager :  Manager){

  console.log(manager);
  if (manager && manager.id) {
    this.router.navigate(['/nvmanager'], { state: { selectedData: manager,element: true} });
  } else {
    
    console.error("ID is undefined for the selected nvmanager");
  } 
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
 

showFixedButton: boolean = false;

@HostListener('window:scroll', ['$event'])
onScroll(event: Event): void {

  this.showFixedButton = window.scrollY > 100;
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
