import { Component, ViewEncapsulation ,OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { SocieteService } from 'src/app/services/societe.service';
import { Router } from '@angular/router';
import { Societe } from 'src/app/model/societe';
import { UserService } from 'src/app/services/user.service';
 
 

@Component({
  selector: 'app-dossier',
  templateUrl: './dossier.component.html',
  styleUrls: ['./dossier.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DossierComponent implements OnInit  {
  societe: any;
  selectedSocieteId: any;
  selectedData: any; 
  isSidebarExpanded: boolean = true;
  @ViewChild('sidebar') sidebarElement!: ElementRef;
  username: any;
  constructor(private appService: SocieteService, private userService: UserService, private router: Router) {
 
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
      this.userService.getCurrentUserResponseEntity().subscribe((response: any) => {
        if (response && response.username) {
          this.username = response.username;
          console.log('Username:', this.username);
        }
      });
     
      this.checkWindowSize();
  }

 


  onDelete(id:any) {
  
     
      this.appService.deleteSociete(id).subscribe(
        (response: any) => {
          // console.log('Data has been successfully deleted:', response);
          const responseObject = { message: response };
          console.log('Data has been successfully deleted:', responseObject);
          
          this.appService.getAllsociete()
          .subscribe((responseData: any) => {  
          //  this.societe = response;
           this.societe = responseData;
          });
          this.CloseModel();
        },
        (error:any) => {
          console.error('An error occurred:', error);
          this.appService.getAllsociete().subscribe((response: any) => {  
            this.societe = response;
          });
          this.CloseModel();
        }
        
      );
     
  }

  
  passData(societe: Societe){
    console.log(societe);
    if (societe && societe.id) {
      this.router.navigate(['/ajout-societe'], { state: { selectedData: societe, element: true } });
    } else {
      
      console.error("ID is undefined for the selected societe");
    }  
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


viseualiseModel(){
  const Modeldivview = document.getElementById('exampleModal');
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


// visualiser model prestation details
viseualiseModelPrestation(){
  const Modeldivview = document.getElementById('modeldetail');
  if(Modeldivview != null){

    Modeldivview.style.display = 'block';
  }

}

 ModelPrestationclose(){
  const Modeldivview = document.getElementById('modeldetail');
  if(Modeldivview != null){

    Modeldivview.style.display = 'none';
  }

}




 
 
viseualise(societe: Societe) {
  if (societe.id) {
    const id = societe.id;  
    this.appService.getSocieteById(id).subscribe((response: any) => {
      console.log('hi1');
      this.selectedData = response;
      console.log('hi2');
      const Modeldivview = document.getElementById('exampleModal');
      if(Modeldivview != null){
    
        Modeldivview.style.display = 'block';
      }
      console.log(societe);
      
    } );
  } else {
    
    console.error("ID is undefined for the selected societe");
  }
  
}


showFormAdd() {
  this.router.navigate(['//ajout-societe'], { state: { element: true } });
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
 