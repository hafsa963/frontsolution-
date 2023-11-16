import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SocieteService } from 'src/app/services/societe.service';

@Component({
  selector: 'app-dossier-archive',
  templateUrl: './dossier-archive.component.html',
  styleUrls: ['./dossier-archive.component.css']
})
export class DossierArchiveComponent {
  societe: any;
  selectedSocieteId: any;
  isSidebarExpanded: boolean = true;
  @ViewChild('sidebar') sidebarElement!: ElementRef;
  constructor(private appService :SocieteService, private router : Router){
  }
  
  // societe : Societe[]  =[
  //   {
  //   id :0,
  //   nom: '',
  //   forme : '',
  //   capitale :'',
  //   siege:'',
  //   rc : 0,
  //   i_f :  0, 
  //   ice  : 0 ,
  //   ip : 0,
  //   cnss : 0,
  //   propriete :'',
  //   managerVoList : []
  // }
  // ];
  
   
  ngOnInit() {
    this.appService.getAllsociete()
      .subscribe((response: any) => {  
      //  this.societe = response;
      this.societe = Array.isArray(response) ? response : [response];

      });
      this.checkWindowSize();
  }

 
  

  onMouseEnter(event: any) {
    event.currentTarget.classList.add('table-primary');  
  }

  onMouseLeave(event: any) {
    event.currentTarget.classList.remove('table-primary');
  }
    
  isDropdownOpen: boolean = false;
  isDropdownOpen1: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
     
  }
  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
    
  }
 
  openModal(societeId: any){
    this.selectedSocieteId = societeId;
    const Modeldiv = document.getElementById('modelarchive');
    if(Modeldiv != null){
      console.log(this.societe);
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


 


 




 
 
 


 

isSocieteArray() {
  return Array.isArray(this.societe);
}

 

SearchBy(searchInput: string) {
  const isNumeric = !isNaN(parseFloat(searchInput)) && isFinite(+searchInput);
  if (isNumeric) {
    this.appService.getSocieteByRc(+searchInput).subscribe((response: any) => {  
      this.societe = Array.isArray(response) ? response : [response];
      console.log(this.societe);
       
    });
  } else {
    this.appService.getSocieteByName(searchInput).subscribe((response: any) => {  
      this.societe = Array.isArray(response) ? response : [response];
      console.log(this.societe);
       
    });
  }
  
}

 
onInputChange(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  // console.log('Input value changed:', inputValue);

  // this.SearchBy(inputValue);

 
  if (!inputValue.trim()) {
    this.appService.getAllsociete().subscribe((response: any) => {  
      this.societe = Array.isArray(response) ? response : [response];
    });
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
