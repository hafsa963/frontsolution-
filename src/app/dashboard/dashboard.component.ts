// import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, ViewChild} from '@angular/core';
 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // animations: [
  //   trigger('sidebarToggle', [
  //     state('expanded', style({
  //       marginLeft: '0'
  //     })),
  //     state('collapsed', style({
  //       marginLeft: '270px'
  //     })),
  //     transition('expanded <=> collapsed', animate('0.3s'))
  //   ])
  // ]

})
export class DashboardComponent {
  
 
  constructor( ) {}
  isSidebarExpanded: boolean = true;
  @ViewChild('sidebar') sidebarElement!: ElementRef;
  ngOnInit() {
    this.checkWindowSize();
    
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
