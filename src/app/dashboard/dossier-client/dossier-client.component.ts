import { Component } from '@angular/core';

@Component({
  selector: 'app-dossier-client',
  templateUrl: './dossier-client.component.html',
  styleUrls: ['./dossier-client.component.css']
})
export class DossierClientComponent {

  isDropdownOpen: boolean = false;
  isDropdownOpen1: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
     
  }
  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
    
  }
}
