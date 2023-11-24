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

  prestation: Prestation = {
    namePrestation: '',
    Etat: '',
    etapeDtoList: []
  };

  newEtape: Etape = {
    nomEtape: ''
  };

    element: boolean = false;
  isSidebarExpanded: boolean = true;
  selectedprestation:any;

  @ViewChild('sidebar') sidebarElement!: ElementRef;
  username: any;


  ngOnInit() {
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
  
    this.checkWindowSize();
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
  removeEtape(index: number) {
    if (index >= 0 && index < this.prestation.etapeDtoList.length) {
      this.prestation.etapeDtoList.splice(index, 1);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    
    this.checkWindowSize();
  }
 
  toggleSidebar(): void {
    this.isSidebarExpanded = !this.isSidebarExpanded;

    // const marginLeft = this.isSidebarExpanded ? '0' : '270px';

    // this.renderer.setStyle(this.el.nativeElement, 'marginLeft', marginLeft);
  }




   private checkWindowSize(): void {
    
    const windowWidth = window.innerWidth;

     
    this.isSidebarExpanded = windowWidth >= 768;

     
    // const marginLeft = this.isSidebarExpanded ? '0' : '270px';
    // this.renderer.setStyle(this.sidebarElement.nativeElement, 'marginLeft', marginLeft);
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




}
 
 








