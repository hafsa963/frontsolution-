import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-testmenu',
  templateUrl: './testmenu.component.html',
  styleUrls: ['./testmenu.component.css']
})
export class TestmenuComponent {
  isSidebarOpen = false;
  username: string | undefined;


  ngOnInit() {
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
    this.appService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
  }
  
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
   
 
 
  constructor(private appService : UserService, private router : Router) {}
  
  logout() {     
       
    this.router.navigate(["Login"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
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


   
  
}
