import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GestionClientService } from 'src/app/services/gestion-client.service';
import { UserService } from 'src/app/services/user.service';
import { ServicePrestationService } from 'src/app/services/service-prestation.service';
import { Prestation } from 'src/app/model/prestation';

@Component({
  selector: 'app-dataclient',
  templateUrl: './dataclient.component.html',
  styleUrls: ['./dataclient.component.css']
})
export class DataclientComponent {
 
  client: any;
  selectedclientteId: any;
  selectedData: any; 
  isSidebarOpen = false;
  username: string | undefined;
  prestation: Prestation[] = []; 
  prestationNames: string[] = [];
  selectedPrestationId!: number; 
  namesprestation: string[] = [];
  prestations: { name: string }[] = [];
  

 
  constructor(private appService: GestionClientService, private userService: UserService,private serviceprestation: ServicePrestationService, private router: Router) {
 
  }
 
 
 
  ngOnInit() {
   this.sidebarDetail();
    this.selectedData = history.state.selectedData;
    console.log(this.selectedData);
      console.log(this.client);
    this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
    this.serviceprestation.getAll().subscribe(
      (response: any) => {
        this.prestation = response as Prestation[];  
        this.prestationNames = this.prestation.map(prestation => prestation.namePrestation);
      },
      (error) => {
        console.error('Error fetching prestation data:', error);
      }
    );
    console.log('Selected Data ID:', this.selectedData.id);

    this.serviceprestation.getPrestationsClientByID(this.selectedData.id).subscribe(
      (res: any) => {
        this.prestations = res.map((prestationName: string) => ({
          name: prestationName,
        
        }));
      },
      (error) => {
        console.error('Error fetching prestation data:', error);
      }
    );
    
  }


  logout() {     
       
    this.router.navigate(["Login"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
   }

   selectedPrestation(selectedPrestationId : number){
  
    console.log(selectedPrestationId);
 
    
    
  }


  affectedprestation(){
    // console.log(selectedPrestationId);
    // console.log(id);
    console.log('Selected Prestation ID:', this.selectedPrestationId);
    console.log('Selected Data ID:', this.selectedData.id);

    this.serviceprestation.associateSocietePrestation(this.selectedData.id,this.selectedPrestationId).subscribe(
      (res: any) => {
        console.log('Selected Prestation ID:', this.selectedPrestationId);
        console.log('Selected Data ID:', this.selectedData.id);
        console.log(this.client);
        const Modeldiv = document.getElementById('toastsucces');
        if(Modeldiv != null){
          Modeldiv.classList.add('show');
          setTimeout(() => {
            Modeldiv.classList.remove('show');
          }, 2000);
         
        }
        this.serviceprestation.getAll().subscribe(
          (response: any) => {
            this.prestation = response as Prestation[];  
            this.prestationNames = this.prestation.map(prestation => prestation.namePrestation);
          },
          (error) => {
            console.error('Error fetching prestation data:', error);
          }
        );
        console.log('Selected Data ID:', this.selectedData.id);
    
        this.serviceprestation.getPrestationsClientByID(this.selectedData.id).subscribe(
          (res: any) => {
            this.prestations = res.map((prestationName: string) => ({
              name: prestationName,
            
            }));
          },
          (error) => {
            console.error('Error fetching prestation data:', error);
          }
        );

        console.log('Data has been successfully submitted:', res);
      },
      (error) => {
        console.error('Error fetching prestation data:', error);
      }
    );

  }
 
  

   showFixedButton: boolean = false;

   @HostListener('window:scroll', ['$event'])
   onScroll(event: Event): void {
  
     this.showFixedButton = window.scrollY > 100;
   }
 
   toggleSidebar() {
     this.isSidebarOpen = !this.isSidebarOpen;
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