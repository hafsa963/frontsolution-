import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { SocieteService } from 'src/app/services/societe.service';
import { UserService } from 'src/app/services/user.service';
 

@Component({
  selector: 'app-ajout-societe',
  templateUrl: './ajout-societe.component.html',
  styleUrls: ['./ajout-societe.component.css']
})
export class AjoutSocieteComponent  implements OnInit{
  societe: any[] = [];
  element: boolean = false;
  selectedData: any; 
  registerForm: FormGroup = new FormGroup({});
  // managerVoList: FormArray  = new FormArray<any>([]);
 
 
  isSidebarExpanded: boolean = true;
  username: any;
 
 
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


  @ViewChild('sidebar') sidebarElement!: ElementRef;
  ngOnInit() {
    if (history.state.element !== undefined) {
      this.element = history.state.element;
    }
  this.selectedData = history.state.selectedData;
  console.log(this.selectedData);
    console.log(this.societe);
    
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
    this.checkWindowSize();
   
  }
 
  constructor(private appService : SocieteService, private router : Router, private userService :UserService){
   
    this.registerForm = new FormGroup({
      propriete: new FormControl('', Validators.required),
      nom: new FormControl('', Validators.required),
      forme: new FormControl('', Validators.required),
      capitale: new FormControl('', Validators.required),
      siege: new FormControl('', Validators.required),
      rc: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(4)]),
      i_f: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      ice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      ip: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      cnss: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      // managerVoList: new FormArray([
      //   new FormGroup({
      //     nameManager: new FormControl('', Validators.required),
      //     Datedebut: new FormControl(''),
      //     dateFin: new FormControl('')
      //   }),
     
      //  ])
     
      
    });
    
  }
  
  // Ajouter un manager à la liste
  // addManager() {
  // const manager = new FormGroup({
  //   nameManager: new FormControl('', Validators.required),
  //   Datedebut: new FormControl(''),
  //   dateFin: new FormControl('')
  // });
 
  // }

  // addManager() {
  //   this.managerVoList.push({
  //     nameManager: '',
  //     Datedebut: '',
  //     DateFin: ''
  //   });
  // }
  

 
  
  // removeManager(index: number) {
  //   this.managerVoList.removeAt(index);
  // }
  
 

  //  ajout societe

  


  OnSubmit() {
     if (this.registerForm.valid) {
      
      const societe = {
        propriete: this.registerForm.value.propriete,
        nom: this.registerForm.value.nom,
        forme: this.registerForm.value.forme,
        capitale: this.registerForm.value.capitale,
        siege: this.registerForm.value.siege,
        rc: this.registerForm.value.rc,
        i_f: this.registerForm.value.i_f,
        ice: this.registerForm.value.ice,
        ip: this.registerForm.value.ip,
        cnss: this.registerForm.value.cnss,
        etat: 'en cours de traitement',
    
        // managerVoList: this.registerForm.value.managerVoList.map((manager: any) => {
        //   return {
        //     nameManager: manager.nameManager,
        //     Datedebut: manager.Datedebut,
        //     dateFin: manager.dateFin
        //   };
        // })
        
      };

      
      
      this.appService.saveSociete(societe).subscribe(
        (res) => {
          
          console.log('Data has been successfully submitted:', res);
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
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            console.error('An error occurred:', error.error.message);
          } else {
            // Server-side error
            console.error(
              `Backend returned code ${error.status}, ` +
              `body was: ${JSON.stringify(error.error)}`
              
            );
            const Modeldiv = document.getElementById('toastsucces');
            if(Modeldiv != null){
              // Modeldiv.style.display = 'block';
              Modeldiv.classList.add('show');
              setTimeout(() => {
                Modeldiv.classList.remove('show');
              }, 2000);
             
            }
          }
        }
      );
      console.log('Form submitted:', societe);
     }
      else {
      Object.keys(this.registerForm.controls).forEach((field) => {
        const control = this.registerForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      console.log('Form is invalid');
    }
  }
    

  
   
  
  

     
        














 

   


  get managerVoListControls() {
    return (this.registerForm.get('managerVoList') as FormArray).controls;
  }



  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

OnUpdate(Societeupdat: any) {
  if (this.selectedData && this.selectedData.id) {
    const societe = {
      id: this.selectedData.id,   
      propriete: this.selectedData.propriete,
      nom: this.selectedData.nom,
      forme: this.selectedData.forme,
      capitale: this.selectedData.capitale,
      siege: this.selectedData.siege,
      rc: this.selectedData.rc,
      i_f: this.selectedData.i_f,
      ice: this.selectedData.ice,
      ip: this.selectedData.ip,
      cnss: this.selectedData.cnss,
      etat: 'en cours de traitement',
    };
    console.log('Form submitted:', societe);
    this.appService.updateSociete(this.selectedData.id, societe).subscribe(
      (res) => {
        console.log('Data has been successfully submitted:', res);
        const Modeldiv = document.getElementById('toastsuccesModify');
        if(Modeldiv != null){
          // Modeldiv.style.display = 'block';
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

 