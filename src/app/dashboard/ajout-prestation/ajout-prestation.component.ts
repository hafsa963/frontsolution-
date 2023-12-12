import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Etape } from 'src/app/model/etape';
import { Prestation } from 'src/app/model/prestation';
import { ServicePrestationService } from 'src/app/services/service-prestation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ajout-prestation',
  templateUrl: './ajout-prestation.component.html',
  styleUrls: ['./ajout-prestation.component.css']
})
export class AjoutPrestationComponent {
  ngModelOptions: any = { standalone: true };


  prestation: Prestation = {
    
    namePrestation: '',
    Etat: '',
    etapeDtoList: []
  };
 // idEtape : 0, 

  newEtape: Etape = {
    nomEtape: ''
  };

    element: boolean = false;
  selectedprestation:any;

  isSidebarOpen = false;
  username: any;

  logout() {     
       
    this.router.navigate(["/"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
   }

  ngOnInit() {
    this.sidebarDetail();
    if (history.state.element !== undefined) {
      this.element = history.state.element;
    }
  
    this.selectedprestation = Array.isArray(history.state.selectedprestation)
      ? history.state.selectedprestation[0]
      : history.state.selectedprestation;
  
    // Initialize prestation with an empty object or default values
    this.prestation = this.selectedprestation || { namePrestation: '', etapeDtoList: [] };
  
    console.log(this.selectedprestation);
    // console.log(this.prestation);
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
  
 
  }
  showFixedButton: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
 
    this.showFixedButton = window.scrollY > 100;
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
 
 
  
  constructor(private appService :   ServicePrestationService, private router : Router, private userService: UserService){}

  onSubmit() {
    this.appService.createPrestation(this.prestation).subscribe(
      (res) => {
        console.log('Data has been successfully submitted:', res);
        console.log(this.prestation);
        const Modeldiv = document.getElementById('toastsucces');
        if(Modeldiv != null){
          // Modeldiv.style.display = 'block';
          Modeldiv.classList.add('show');
          setTimeout(() => {
            Modeldiv.classList.remove('show');
          }, 2000);
         
        }
     
      },
      (error) => {
        console.error('Error in submitting data:', error);
         
      }
    );
  }
 


  

 
  addEtape() {
    this.prestation.etapeDtoList.push({ ...this.newEtape });
    this.newEtape.nomEtape = '';
  }  
  removeEtape(index: number,idEtape?: number) {
    const etapeId = idEtape !== undefined ? idEtape : 0;
    if (index >= 0 && index < this.prestation.etapeDtoList.length) {
      this.prestation.etapeDtoList.splice(index, 1);
       
      this.appService.deleteEtape(etapeId).subscribe(
        (res) => {
          console.log('Data has been successfully deleted:', res);
          console.log(etapeId);
          // const Modeldiv = document.getElementById('toastsucces');
          // if(Modeldiv != null){
          //   Modeldiv.classList.add('show');
          //   setTimeout(() => {
          //     Modeldiv.classList.remove('show');
          //   }, 2000);
           
          // }
       
        },
        (error) => {
          console.error('Error in submitting data:', error);
           
        }
      );
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


  

  

// Example usage:
 
OnUpdate(formData: any) {
  if (this.selectedprestation && this.selectedprestation.id) {
    const id = this.selectedprestation.id;
    console.log('ID:', id);
    console.log('Form Data:', formData);
    console.log('Form Data:', this.selectedprestation);

    this.appService.updatePrestation(id, this.selectedprestation ).subscribe(
      (res) => {
        console.log('Data has been successfully modified:', res);
        const Modeldiv = document.getElementById('toastsuccesModify');
        if (Modeldiv != null) {
          Modeldiv.classList.add('show');
          setTimeout(() => {
            Modeldiv.classList.remove('show');
          }, 2000);
        }
      
      },
      (error) => {
        console.error('Error in modified data:', error);
      }
    );
  } else {
    console.error('Invalid selectedprestation or missing id.');
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



}
 
 








