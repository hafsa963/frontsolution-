import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-colabs',
  templateUrl: './list-colabs.component.html',
  styleUrls: ['./list-colabs.component.css']
})
export class ListColabsComponent {
  isSidebarOpen =  false;
  colab: any;
  username: any;
  selectedData: any; 
  constructor(private appService: UserService,private router: Router) {
  }
  ngOnInit() {
    this.appService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
    this.LoadColab();
 
      this.sidebarDetail();
  }

  LoadColab(){
    this.appService.getAllUsers()
    .subscribe((response: any) => {  
    this.colab = Array.isArray(response) ? response : [response];
    console.log(this.colab);
    });
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
  openModal(){

    const Modeldiv = document.getElementById('modelarchive');
    if(Modeldiv != null){

      Modeldiv.style.display = 'block';
    }
    
  }
CloseModel(){
  const Modeldiv = document.getElementById('modelarchive');
  if(Modeldiv != null){

    Modeldiv.style.display = 'none';
  }
}

 /* modifier colaborateur */
 passData(colab : user ){
  console.log(colab);
  if (colab && colab.id) {
    this.router.navigate(['/nv-colab'], { state: { selectedData: colab,element: true} });
  } else {
    
    console.error("ID is undefined for the selected colab");
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
onInputChange(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
 
  if (!inputValue.trim()) {
    
    this.LoadColab();
  }
}
 

SearchByNames(searchInput: string){
  debugger;
  const isNumeric = !isNaN(parseFloat(searchInput)) && isFinite(+searchInput);
 
  if (isNumeric) {

    this.LoadColab();
     
  } 
  else {

    this.callApi(this.appService.getUsername,searchInput);
 
   
  }
}
 

private callApi(apiFunction: Function, value: any) {
  apiFunction.call(this.appService, value).subscribe(
    (response: any) => {
      this.colab = Array.isArray(response) ? response : [response];
      console.log(this.colab);
   
    },
    (error: any) => {
      console.error('Error while fetching data:', error);
    }
  );

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
