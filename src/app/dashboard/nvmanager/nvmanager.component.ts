import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { Manager } from 'src/app/model/Manager';
import { GestionClientService } from 'src/app/services/gestion-client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nvmanager',
  templateUrl: './nvmanager.component.html',
  styleUrls: ['./nvmanager.component.css']
})
export class NvmanagerComponent {

  ManagerForm :  FormGroup =  new FormGroup({});
  isSidebarOpen = false;
  username: any;
  element: boolean = false;
  selectedData: any; 
  manager:any;
  selectedSociete : any;
  clients: Client[] = [];
   
  //  client: any[] = [];
  societeNames: string[] = [];
  constructor(private router : Router, private appService: GestionClientService, private userService :UserService , private fb: FormBuilder)
  {  
    
     
     
  }
  ngOnInit() {
    this.appService.getAllClient()
    .subscribe(
      (response: any) => {
        this.clients = response as Client[];  
        this.societeNames = this.clients.map(client => client.rs);
      },
      (error) => {
        console.error('Error fetching typesociete data:', error);
      }
    );
    this.ManagerForm = this.fb.group({
      nameManager : ['',[Validators.required]],
      datedebut : ['',[Validators.required]],
      dateFin : ['',[Validators.required]],
      selectedSociete: ['', [Validators.required]],
     
    },

    );
    if (history.state.element !== undefined) {
      this.element = history.state.element;
    }
    this.selectedData = history.state.selectedData;
  
    this.ManagerForm.get('selectedSociete')?.valueChanges.subscribe((selectedSociete) => {
      const selectedClient = this.clients.find((client) => client.rs === selectedSociete);
      if (selectedClient) {
        console.log('Selected Société ID:', selectedClient.id);
      }
    });
    this.sidebarDetail();
  }
  showFixedButton: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
 
    this.showFixedButton = window.scrollY > 100;
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

   logout() {     
       
    this.router.navigate(["/"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
   }
 
   OnSubmit() {
       Object.keys(this.ManagerForm.controls).forEach((field) => {
    const control = this.ManagerForm.get(field);
    control?.markAsTouched({ onlySelf: true });
  });
 
    if (this.ManagerForm.valid && this.ManagerForm.value.selectedSociete) {
      const selectedSocieteName = this.ManagerForm.value.selectedSociete;
      const selectedClient = this.clients.find((client) => client.rs === selectedSocieteName);
  
      if (selectedClient) {
        const manager: Manager = {
          nameManager: this.ManagerForm.value.nameManager,
          datedebut: this.ManagerForm.value.datedebut,
          dateFin: this.ManagerForm.value.dateFin,
          mandatGerance: '',
          id: selectedClient.id,
        };    

      this.appService.CreateManager(manager).subscribe(
        (res) => {
          console.log('Data has been successfully submitted:', res);
          const Modeldiv = document.getElementById('toastsucces');
          if(Modeldiv != null){
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
      console.log('Form submitted:', manager);
      const Modeldiv = document.getElementById('toastsucces');
      if(Modeldiv != null){
        Modeldiv.classList.add('show');
        setTimeout(() => {
          Modeldiv.classList.remove('show');
        }, 2000);
       
      }
    } else {
      console.log('Form is invalid');
       
    }
  }
}
  formatDateForBackend(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
 
   
  OnUpdate(updateManager: any) {
    if (this.selectedData && this.selectedData.id) {
      const selectedSocieteName = this.ManagerForm.value.selectedSociete;
      const selectedClient = this.clients.find((client) => client.rs === selectedSocieteName);
      
      console.log(this.selectedData);
  
      if (this.selectedData && selectedClient) {
        console.log('Selected Client:', selectedClient);
        const manager: Manager = {
          id: this.selectedData.id,
          nameManager: this.ManagerForm.value.nameManager,
          datedebut: this.ManagerForm.value.datedebut,
          dateFin: this.ManagerForm.value.dateFin,
          mandatGerance: '',
          client: selectedClient.id,  // Use the selectedClient.id
        };
        
        console.log('Updated Manager:', manager);
    
        console.log('Form submitted:', this.selectedData);
    
        this.appService.updatemanager(this.selectedData.id, manager).subscribe(
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
        console.error("Selected client not found or ID is undefined for the selected Societeupdat");
      }
    } else {
      console.error("ID is undefined for the selected Societeupdat");
    }
  }
  

  // OnUpdate(updateManager: any) {
  //   if (this.selectedData && this.selectedData.id) {
  //     const selectedSocieteName = this.ManagerForm.value.selectedSociete || ''; // Use an empty string if it's undefined
  //     console.log('Selected Société Name:', selectedSocieteName);
  
  //     const selectedClient = this.clients.find((client) => client.rs === selectedSocieteName);
  //     console.log('Selected Client:', selectedClient);
  
  //     console.log('Selected Data:', this.selectedData);
  
  //     if (selectedClient) {
  //       const updatedManager: Manager = {
  //         id: this.selectedData.id,
  //         nameManager: this.ManagerForm.value.nameManager,
  //         datedebut: this.ManagerForm.value.datedebut,
  //         dateFin: this.ManagerForm.value.dateFin,
  //         mandatGerance: '',
  //         client: selectedClient.id,
  //       };
  
  //       console.log('Updated Manager:', updatedManager);
  
  //       // Call your update service or perform other necessary actions here
  //       this.appService.updatemanager(this.selectedData.id, updatedManager).subscribe(
  //         (res) => {
  //           console.log('Data has been successfully updated:', res);
  //           const successToast = document.getElementById('toastsuccesModify');
  //           if (successToast != null) {
  //             successToast.classList.add('show');
  //             setTimeout(() => {
  //               successToast.classList.remove('show');
  //             }, 2000);
  //           }
  //         },
  //         (error) => {
  //           console.error('An error occurred while updating:', error);
  //         }
  //       );
  
  //       console.log('Data has been sent for updating');
  //     } else {
  //       console.error('Selected client not found:', selectedSocieteName);
  //     }
  //   } else {
  //     console.error('ID is undefined for the selected Societeupdat');
  //   }
  // }
  
  
  

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
