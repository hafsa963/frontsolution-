import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Prestation } from 'src/app/model/prestation';
import { ServicePrestationService } from 'src/app/services/service-prestation.service';
 


@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent  {
      
  // isDropdownOpen: boolean = false;
  isDropdownOpen1: boolean = false;
  selectedprestationId: any;
  isSidebarExpanded: boolean = true;
  @ViewChild('sidebar') sidebarElement!: ElementRef;
 

  // toggleDropdown() {
  //   this.isDropdownOpen = !this.isDropdownOpen;
     
  // }
  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
    
  }
 

  onMouseEnter(event: any) {
    event.currentTarget.classList.add('table-primary');  
  }

  onMouseLeave(event: any) {
    event.currentTarget.classList.remove('table-primary');
  }

  ngOnInit(): void {
    this.getAllPrestations();
    this.checkWindowSize();
  }

  constructor(private appService: ServicePrestationService, private router: Router){}

  prestation: Prestation[] = [
   {
    namePrestation: '',
    etapeDtoList: []
  } 
  ];

  getAllPrestations() {
    return this.appService.getAllPrestations().subscribe(
      (results: any) => {
        this.prestation = results;
        console.log(results)
      },
      (error) => {
        console.error('ERROR : ', error);
      })
  }

  

  showSteps: { [key: string]: boolean } = {}; // Objet pour suivre la visibilité des étapes

  toggleSteps(prestation: Prestation) {
    this.showSteps[prestation.namePrestation] = !this.showSteps[prestation.namePrestation];
  }

  

  // SearchByMission(mission: string){
  //   return this.appService.
  // }
  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  SearchBynameprestation(nameManager: string) {
    this.appService.getbymission(nameManager).subscribe(
      (response: any) => {
       
        console.log("ID of the namePrestation:", response);
    
      },
      (error: any) => {
        console.error('An error occurred:', error);
      }
    );
  }
  



  openModal(prestationid: any){
    this.selectedprestationId = prestationid;
    const Modeldiv = document.getElementById('modelarchive');
    if(Modeldiv != null){
      console.log(this.prestation);
     console.log(prestationid);
      Modeldiv.style.display = 'block';
    }
    
  }


CloseModel(){
  const Modeldiv = document.getElementById('modelarchive');
  if(Modeldiv != null){

    Modeldiv.style.display = 'none';
  }
}

onDelete(selectedprestationId : any){
  console.log(selectedprestationId)
  this.appService.deletePrestation(selectedprestationId).subscribe(
    (response: any) => {
     
      console.log("prestation deleted succefuly:", response);
      const Modeldiv = document.getElementById('toastsucces');
      if(Modeldiv != null){
        // Modeldiv.style.display = 'block';
        Modeldiv.classList.add('show');
        setTimeout(() => {
          Modeldiv.classList.remove('show');
        }, 2000);
        this.getAllPrestations();
      }

  
    },
    (error: any) => {
      console.error('An error occurred:', error);
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

modifypresta(presta : Prestation){
  if (presta && presta.id){
    console.log(presta);
    this.router.navigate(['/ajout-prestation'], {state: {element: true , selectedprestation :presta } });
  }
   
 
    
 
  
}



}