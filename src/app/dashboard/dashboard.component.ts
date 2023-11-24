import { Component, ElementRef, HostListener, ViewChild,AfterViewInit} from '@angular/core';
// import * as Chart from 'chart.js';
import { Chart, registerables,ChartOptions  } from 'chart.js/auto';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
   

})
export class DashboardComponent implements AfterViewInit {
  
  @ViewChild('chart') chartRef!: ElementRef;
  chart: Chart<"doughnut", number[], string> | undefined;
  username: string | undefined;
 
  constructor(private appService : UserService, private router : Router) {}
  isSidebarExpanded: boolean = true;
  @ViewChild('sidebar') sidebarElement!: ElementRef;
  ngOnInit() {
    this.checkWindowSize();
     
    this.appService.getCurrentUserResponseEntity().subscribe((response: any) => {
      if (response && response.username) {
        this.username = response.username;
        console.log('Username:', this.username);
      }
    });
    
  }
  logout() {     
       
    this.router.navigate(["Login"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
   }

  // logout(): void {
  //   this.appService.logoutPage().subscribe(
  //     (response) => {
  //       console.log('Logout successful', response);
        
  //     },
  //     (error) => {
  //       console.error('Logout failed', error);
       
  //     }
  //   );
  // }

  //  ngAfterViewInit() {
     
  //   if (this.chartRef) {
  //     this.chart = new Chart(this.chartRef.nativeElement, {
  //       type: 'bar',
  //       data: {
  //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //         datasets: [
  //           {
  //             label: '# of Votes',
  //             data: [12, 19, 3, 5, 2, 3],
  //             backgroundColor: [
  //               'rgba(255, 99, 132, 0.2)',
  //               'rgba(54, 162, 235, 0.2)',
  //               'rgba(255, 206, 86, 0.2)',
  //               'rgba(75, 192, 192, 0.2)',
  //               'rgba(153, 102, 255, 0.2)',
  //               'rgba(255, 159, 64, 0.2)',
  //             ],
  //             borderColor: [
  //               'rgba(255, 99, 132, 1)',
  //               'rgba(54, 162, 235, 1)',
  //               'rgba(255, 206, 86, 1)',
  //               'rgba(75, 192, 192, 1)',
  //               'rgba(153, 102, 255, 1)',
  //               'rgba(255, 159, 64, 1)',
  //             ],
  //             borderWidth: 1,
  //           },
  //         ],
  //       },
  //       options: {
  //         scales: {
  //           y: {
  //             beginAtZero: true,
  //           },
  //         },
  //       },
  //     });
  //   }
  // }
  

  ngAfterViewInit() {
    if (this.chartRef) {
      this.initializeChart();
    }
  }
  

  private initializeChart() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    Chart.register(...registerables);

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Dossier Cloturé', 'Dossier Bloqué','Dossier vide','Dossier En Cours','Dossier vide'],
        datasets: [{
          data: [10, 20,11, 30,12],
          backgroundColor: ['#28a745', '#dc3545','rgb(236, 253, 0);', '#007bff','#FFFF00'],
          hoverOffset: 4
        }]
      },
      options: {
        cutout: '70%',
        animation: false  
      } as ChartOptions<"doughnut">  
    });
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
