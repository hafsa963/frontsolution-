import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Typesociete } from 'src/app/model/TypeSociete';
import { GestionClientService } from 'src/app/services/gestion-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nv-client',
  templateUrl: './nv-client.component.html',
  styleUrls: ['./nv-client.component.css']
})
export class NvClientComponent {
   
  element: boolean = false;
  selectedData: any; 

  client: any[] = [];
  ClientForm: FormGroup = new FormGroup({});
  typesociete: Typesociete[] = [];
  typesocieteNames: string[] = [];
  username: any;
  isSidebarExpanded: boolean = true;
 

  @ViewChild('sidebar') sidebarElement!: ElementRef;
  constructor(private appService : GestionClientService, private router : Router, private userService :UserService){
   
    this.ClientForm = new FormGroup({
      propriete: new FormControl('' ),
      rs: new FormControl(''),
      forme: new FormControl(''),
      capitale: new FormControl(''),
      siege: new FormControl(''),
      rc: new FormControl(''),
      i_f: new FormControl(''),
      ice: new FormControl(''),
      ip: new FormControl(''),
      cnss: new FormControl(''),

      ctNum: new FormControl(''),
      qualite: new FormControl(''),
      adresse: new FormControl(''),
      complement: new FormControl(''),
      codepostal: new FormControl(''),
      ville: new FormControl(''),
      coderegion: new FormControl(''),
      pays: new FormControl(''),

      tel: new FormControl(''),
      telcopie: new FormControl(''),
      email: new FormControl(''),
    
      cmt: new FormControl(''),
      etat: new FormControl(''),
      typesociete: new FormControl(''),
 
      // cnss: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      // managerVoList: new FormArray([
      //   new FormGroup({
      //     nameManager: new FormControl('', Validators.required),
      //     Datedebut: new FormControl(''),
      //     dateFin: new FormControl('')
      //   }),
     
      //  ])
     
      
    });
    
  }

 
  logout() {     
       
    this.router.navigate(["Login"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
   }

   
  

 
  ngOnInit(): void {
    this.checkWindowSize();
    this.selectedData = history.state.selectedData;
    console.log(this.selectedData);
      console.log(this.client);
      
    this.appService.getAll().subscribe(
      (response: any) => {
        this.typesociete = response as Typesociete[];  
        this.typesocieteNames = this.typesociete.map(typesociete => typesociete.nom);
      },
      (error) => {
        console.error('Error fetching typesociete data:', error);
      }
    );
  
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
  
    
  }
  
  
  


  OnSubmit() {
    // if (this.registerForm.valid) {
      
      const client = {
        propriete: this.ClientForm.value.propriete,
        rs: this.ClientForm.value.rs,
        forme: this.ClientForm.value.forme,
        capitale: this.ClientForm.value.capitale,
        siege: this.ClientForm.value.siege,
        rc: this.ClientForm.value.rc,
        i_f: this.ClientForm.value.i_f,
        ice: this.ClientForm.value.ice,
        ip: this.ClientForm.value.ip,
        cnss: this.ClientForm.value.cnss,
        etat: 'en cours de traitement',

        ctNum: this.ClientForm.value.ctNum,
        qualite: this.ClientForm.value.qualite,
        adresse: this.ClientForm.value.adresse,
        complement: this.ClientForm.value.complement,
        codepostal: this.ClientForm.value.codepostal,
        ville: this.ClientForm.value.ville,
        coderegion: this.ClientForm.value.coderegion,
        pays: this.ClientForm.value.pays,
        tel: this.ClientForm.value.tel,
        telcopie: this.ClientForm.value.telcopie,

        email: this.ClientForm.value.email,
        cmt: this.ClientForm.value.cmt,
        typesociete: this.ClientForm.value.typesociete,
       
        // managerVoList: this.registerForm.value.managerVoList.map((manager: any) => {
        //   return {
        //     nameManager: manager.nameManager,
        //     Datedebut: manager.Datedebut,
        //     dateFin: manager.dateFin
        //   };
        // })
        
      };

      
      
      this.appService.createClient(client).subscribe(
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
 
            console.error('An error occurred:', error.error.message);
          } else {
 
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
      console.log('Form submitted:', client);
    // }
    //  else {
    //   Object.keys(this.registerForm.controls).forEach((field) => {
    //     const control = this.registerForm.get(field);
    //     control?.markAsTouched({ onlySelf: true });
    //   });
    //   console.log('Form is invalid');
    // }
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



//update Client 
OnUpdate(clientupdate: any) {
  if (this.selectedData && this.selectedData.id) {
    const client = {
      id: this.selectedData.id,   
      propriete: this.selectedData.propriete,
      rs: this.selectedData.rs,
      forme: this.selectedData.forme,
      capitale: this.selectedData.capitale,
      siege: this.selectedData.siege,
      rc: this.selectedData.rc,
      i_f: this.selectedData.i_f,
      ice: this.selectedData.ice,
      ip: this.selectedData.ip,
      cnss: this.selectedData.cnss,
      etat: 'en cours de traitement',

      ctNum: this.selectedData.ctNum,
      qualite: this.selectedData.qualite,
      adresse:this.selectedData.adresse,
      complement: this.selectedData.complement,
      codepostal: this.selectedData.codepostal,
      ville: this.selectedData.ville,
      coderegion: this.selectedData.coderegion,
      pays: this.selectedData.pays,
      tel: this.selectedData.tel,
      telcopie: this.selectedData.telcopie,

      email: this.selectedData.email,
      cmt: this.selectedData.cmt,
      typesociete: this.selectedData.typesociete,
    };
    console.log('Form submitted:', client);
    this.appService.updateClient(this.selectedData.id, client).subscribe(
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
