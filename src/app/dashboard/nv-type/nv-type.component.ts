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
  
  typesociete: Typesociete = {
    nom: '',
  
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
  
    ;
  
    // console.log(this.selectedprestation);
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
  
    this.checkWindowSize();
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


}
