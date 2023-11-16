import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-list-colabs',
  templateUrl: './list-colabs.component.html',
  styleUrls: ['./list-colabs.component.css']
})
export class ListColabsComponent {
  isSidebarExpanded: boolean = true;
  @ViewChild('sidebar') sidebarElement!: ElementRef;

  ngOnInit() {
 
      this.checkWindowSize();
  }
  
  onMouseEnter(event: any) {
    event.currentTarget.classList.add('table-primary');  
  }

  onMouseLeave(event: any) {
    event.currentTarget.classList.remove('table-primary');
  }
  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  openModal(){

    const Modeldiv = document.getElementById('modelarchive');
    if(Modeldiv != null){

      Modeldiv.style.display = 'block';
    }
    
  }
CloseModel(){
  const Modeldiv = document.getElementById('modelarchive');
  if(Modeldiv != null){

    Modeldiv.style.display = 'none';
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
