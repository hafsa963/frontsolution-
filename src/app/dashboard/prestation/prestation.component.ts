import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Prestation } from 'src/app/model/prestation';
import { ServicePrestationService } from 'src/app/services/service-prestation.service';
import { UserService } from 'src/app/services/user.service';
 


@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent  {
      
  isSidebarOpen = false;
  isDropdownOpen1: boolean = false;
  selectedprestationId: any;
 
  username: any;
 
 
  // toggleDropdown1() {
  //   this.isDropdownOpen1 = !this.isDropdownOpen1;
    
  // }
 

  onMouseEnter(event: any) {
    event.currentTarget.classList.add('table-primary');  
  }

  onMouseLeave(event: any) {
    event.currentTarget.classList.remove('table-primary');
  }

  ngOnInit(): void {
    this.sidebarDetail();
    this.getAllPrestations();
 
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
  }
 

  constructor(private appService: ServicePrestationService, private router: Router , private userService : UserService ){}

  prestation: Prestation[] = [
   {
    namePrestation: '',
    etapeDtoList: [],
     Etat : '',
  } 
  ];

  getAllPrestations() {
    return this.appService.getAll().subscribe(
      (results: any) => {
        this.prestation = results;
        console.log(results)
      },
      (error) => {
        console.error('ERROR : ', error);
      })
  }

  

  showSteps: { [key: string]: boolean } = {}; // Objet pour suivre la visibilité des étapes

  toggleSteps(prestation: Prestation) {
    this.showSteps[prestation.namePrestation] = !this.showSteps[prestation.namePrestation];
  }

 
  // toggleDropdown() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
  // }


  SearchBynameprestation(nameManager: string) {
    this.appService.getbymission(nameManager).subscribe(
      (response: any) => {
        this.prestation = Array.isArray(response) ? response : [response];
        console.log(this.prestation);
      },
    
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
  }
  onInputChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
   
    if (!inputValue.trim()) {
      
      this.getAllPrestations();
    }
  }
  



  openModal(prestationid: any){
    this.selectedprestationId = prestationid;
    const Modeldiv = document.getElementById('modelarchive');
    if(Modeldiv != null){
      console.log(this.prestation);
     console.log(prestationid);
      Modeldiv.style.display = 'block';
    }
    
  }


CloseModel(){
  const Modeldiv = document.getElementById('modelarchive');
  if(Modeldiv != null){

    Modeldiv.style.display = 'none';
  }
}

onDelete(selectedprestationId : any){
  console.log(selectedprestationId)
  this.appService.deletePrestation(selectedprestationId).subscribe(
    (response: any) => {
     
      console.log("prestation deleted succefuly:", response);
      const Modeldiv = document.getElementById('toastsucces');
      if(Modeldiv != null){
        // Modeldiv.style.display = 'block';
        Modeldiv.classList.add('show');
        setTimeout(() => {
          Modeldiv.classList.remove('show');
        }, 2000);
        this.getAllPrestations();
      }

  
    },
    (error: any) => {
      console.error('An error occurred:', error);
    }
  );
 
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

 

modifypresta(presta : Prestation){
  if (presta && presta.id){
    console.log(presta);
    this.router.navigate(['/ajout-prestation'], {state: {element: true , selectedprestation :presta } });
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