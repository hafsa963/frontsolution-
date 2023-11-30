import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GestionClientService } from 'src/app/services/gestion-client.service';
import { SocieteService } from 'src/app/services/societe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dataclient',
  templateUrl: './dataclient.component.html',
  styleUrls: ['./dataclient.component.css']
})
export class DataclientComponent {
 
  client: any;
  selectedclientteId: any;
  selectedData: any; 
  isSidebarExpanded: boolean = true;
  username: string | undefined;
  @ViewChild('sidebar') sidebarElement!: ElementRef;
 
  constructor(private appService: GestionClientService, private userService: UserService, private router: Router) {
 
  }
 
 
 
  ngOnInit() {
    this.checkWindowSize();

    this.selectedData = history.state.selectedData;
    console.log(this.selectedData);
      console.log(this.client);
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
    
  }
  logout() {     
       
    this.router.navigate(["Login"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
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