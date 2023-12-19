import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute, Router , ParamMap } from '@angular/router';
import { Prestation } from 'src/app/model/prestation';
import { ServicePrestationService } from 'src/app/services/service-prestation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-prestation-to-dossier',
  templateUrl: './prestation-to-dossier.component.html',
  styleUrls: ['./prestation-to-dossier.component.css']
})
export class PrestationToDossierComponent {
  prestation: Prestation[] = []; 
  prestationNames: string[] = [];
  username: any;
  societeId!: number;
  selectedPrestationId!: number; 
  form: any;
  
  
  constructor(private appService : ServicePrestationService, private router : Router,private userservice : UserService,private route: ActivatedRoute){
  }
  isSidebarExpanded: boolean = true;
  @ViewChild('sidebar') sidebarElement!: ElementRef;

 
  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      console.log('ID:', id);
    });
    
 
    this.appService.getAll().subscribe(
      (response: any) => {
        this.prestation = response as Prestation[];  
        this.prestationNames = this.prestation.map(prestation => prestation.namePrestation);
      },
      (error) => {
        console.error('Error fetching prestation data:', error);
      }
    );
    this.userservice.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });



    this.checkWindowSize();
  }
  
  

  onMouseEnter(event: any) {
    event.currentTarget.classList.add('table-primary');  
  }

  onMouseLeave(event: any) {
    event.currentTarget.classList.remove('table-primary');
  }




  openModal(societeId: any){
    
    const Modeldiv = document.getElementById('modelarchive');
    if(Modeldiv != null){
     
     console.log(societeId);
      Modeldiv.style.display = 'block';
    }
    
  }


CloseModel(){
  const Modeldiv = document.getElementById('modelarchive');
  if(Modeldiv != null){

    Modeldiv.style.display = 'none';
  }
}


viseualiseModelmodifier(){
  const Modeldivview = document.getElementById('exampleModal1');
  if(Modeldivview != null){

    Modeldivview.style.display = 'block';
  }
 
}
viseualiseModelclose(){
  const Modeldivview = document.getElementById('exampleModal');
  if(Modeldivview != null){

    Modeldivview.style.display = 'none';
  }
}


viseualiseModel(){
  const Modeldivview = document.getElementById('exampleModal');
  if(Modeldivview != null){

    Modeldivview.style.display = 'block';
  }
 
}
viseualiseModelclose1(){
  const Modeldivview = document.getElementById('exampleModal1');
  if(Modeldivview != null){

    Modeldivview.style.display = 'none';
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

selectedPrestation(selectedPrestationId : number){
  
  console.log(selectedPrestationId);
//  this.appService.getalletapeByPrestation(selectedPrestationId).subscribe((response: any) => {  
//   this.prestation = Array.isArray(response) ? response : [response];
  // this.appService.getAll().subscribe(
  //   (response: any) => {
  //     this.prestation = response as Prestation[];  
  //     this.prestationNames = this.prestation.map(prestation => prestation.namePrestation);
  //   },
  //   (error) => {
  //     console.error('Error fetching prestation data:', error);
  //   }
  // );

  // });
  // this.selectedPrestationId = selectedPrestationId; 
}

}

 