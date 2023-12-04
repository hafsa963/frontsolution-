import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Typesociete } from 'src/app/model/TypeSociete';
import { GestionClientService } from 'src/app/services/gestion-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nv-type',
  templateUrl: './nv-type.component.html',
  styleUrls: ['./nv-type.component.css']
})
export class NvTypeComponent {
  isSidebarOpen = false;
  
  typesociete: Typesociete = {
    nom: '',
  
  };

  element: boolean = false;
  selectedprestation:any;

  username: any;


  ngOnInit() {
    this.sidebarDetail();
    if (history.state.element !== undefined) {
      this.element = history.state.element;
    }
  
    this.selectedprestation = Array.isArray(history.state.selectedprestation)
      ? history.state.selectedprestation[0]
      : history.state.selectedprestation;
  
    ;
  
    // console.log(this.selectedprestation);
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
  
    
  }
  


 
 
  
  constructor(private appService : GestionClientService, private router : Router, private userService: UserService){}

  onSubmit() {
    this.appService.createTypeSociete(this.typesociete).subscribe(
      (res) => {
        console.log('Data has been successfully submitted:', res);
        console.log(this.typesociete);
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
 
// OnUpdate(formData: any) {
//   if (this.selectedprestation && this.selectedprestation.id) {
//     const id = this.selectedprestation.id;
//     console.log('ID:', id);
//     console.log('Form Data:', formData);
//     console.log('Form Data:', this.selectedprestation);

//     this.appService.updatePrestation(id, this.selectedprestation ).subscribe(
//       (res) => {
//         console.log('Data has been successfully modified:', res);
//         const Modeldiv = document.getElementById('toastsuccesModify');
//         if (Modeldiv != null) {
//           Modeldiv.classList.add('show');
//           setTimeout(() => {
//             Modeldiv.classList.remove('show');
//           }, 2000);
//         }
      
//       },
//       (error) => {
//         console.error('Error in modified data:', error);
//       }
//     );
//   } else {
//     console.error('Invalid selectedprestation or missing id.');
//   }
// }
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
