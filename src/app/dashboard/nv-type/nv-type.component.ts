import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selectedData: any;
  TypesocieteForm: FormGroup = new FormGroup({});
 

  ngOnInit() {
    this.sidebarDetail();

    if (history.state.element !== undefined) {
      this.element = history.state.element;
    }
    this.selectedData = history.state.selectedData;
    console.log(this.selectedData);
      console.log(this.typesociete);
 
  
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
  
    
  }
  


 
 
  
  constructor(private appService : GestionClientService, private router : Router, private userService: UserService, private fb: FormBuilder){
    this.TypesocieteForm = this.fb.group({
      typesociete: ['', [Validators.required]],
    });
   
  }

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
 

 //update Client 
 OnUpdate(typeUpdate: any) {
  if (this.selectedData && this.selectedData.id) {
    console.log('Form submitted:', this.selectedData);   
    this.appService.updateTypeSociete(this.selectedData.id, this.selectedData).subscribe(
      (res) => {
        console.log('Data has been successfully submitted:', res);
        const Modeldiv = document.getElementById('toastsuccesModify');
        if (Modeldiv != null) {
          Modeldiv.classList.add('show');
          setTimeout(() => {
            Modeldiv.classList.remove('show');
          }, 2000);
        }
      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
    console.log('Data has been sent for saving');
  } else {
    console.error("ID is undefined for the selected Societeupdat");
  }
}

}
