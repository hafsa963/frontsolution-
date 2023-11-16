import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Prestation } from 'src/app/model/prestation';
import { ServicePrestationService } from 'src/app/services/service-prestation.service';

@Component({
  selector: 'app-prestation-to-dossier',
  templateUrl: './prestation-to-dossier.component.html',
  styleUrls: ['./prestation-to-dossier.component.css']
})
export class PrestationToDossierComponent {
  prestation: Prestation[] = []; 
  prestationNames: string[] = [];

  
  constructor(private appService : ServicePrestationService, private router : Router){
  }
  isSidebarExpanded: boolean = true;
  @ViewChild('sidebar') sidebarElement!: ElementRef;

  // prestation: Prestation[] = [
  //   {
  //    namePrestation: '',
  //    etapeDtoList: []
  //  } 
  //  ];
  ngOnInit(): void {
    this.appService.getAllPrestations().subscribe(
      (response: any) => {
        this.prestation = response as Prestation[]; // Assuming the response is an array of Prestation objects
        this.prestationNames = this.prestation.map(prestation => prestation.namePrestation);
      },
      (error) => {
        console.error('Error fetching prestation data:', error);
      }
    );
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

}


