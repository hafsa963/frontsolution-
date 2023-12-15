import { Component, HostListener, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nv-colab',
  templateUrl: './nv-colab.component.html',
  styleUrls: ['./nv-colab.component.css']
})
export class NvColabComponent  implements OnInit {
  ColabForm :  FormGroup =  new FormGroup({});
  isSidebarOpen = false;
  username: any;
  element: boolean = false;
  role: Role[] = [];
  rolesNames: string[] = [];
  selectedData: any; 
  selectedRole: any;
  roles: any[] = [];
 
 
  constructor(private router : Router, private userService :UserService , private fb: FormBuilder)
  { 
     this.ColabForm = this.fb.group({
       username : ['',[Validators.required]],
       prenom : ['',[Validators.required]],
       nom : ['',[Validators.required]],
      password : ['',[Validators.required]],
      confirmPassword :['',[Validators.required]],
      emailPro : ['',[Validators.required]],
      poste : ['',[Validators.required]], 
      roles: this.fb.group({
        role: [''] 
      }),
      privileges: this.fb.array([]),


     },
 
     );
     
  }
  
 
  showpassword(){
    const passwordInput  = document.getElementById("password") as HTMLInputElement;
    const ConfirmPasswordInput = document.getElementById("confirmPassword") as HTMLInputElement;
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput .type = "password";
  }
  if (ConfirmPasswordInput.type === "password") {
    ConfirmPasswordInput.type = "text";
  } else {
    ConfirmPasswordInput .type = "password";
  }
  }

  ngOnInit() {
    if (history.state.element !== undefined) {
      this.element = history.state.element;
    }
    this.selectedData = history.state.selectedData;
  
    this.userService.getAll().subscribe(
      (response: any) => {
        this.roles = response;
        console.log(this.roles);  
      },
      (error) => {
        console.error('Error fetching roles data:', error);
      }
    );
  
   
  
    this.sidebarDetail();
  }
 
  


   OnUpdate(updateColab: any) {
    console.log('Form values:', this.ColabForm.value);
    const newRole = 'NewRole'; 
  const roleIndex = this.rolesNames.indexOf(this.selectedData.role);

  if (roleIndex !== -1) {
    this.rolesNames[roleIndex] = newRole;
 
    this.selectedData.role = newRole;
  }
    if (this.selectedData && this.selectedData.id) {
      console.log(this.selectedData)
      const colab = {
        id: this.selectedData.id,  
        prenom: this.selectedData.prenom,
        nom: this.selectedData.nom,
       password: this.selectedData.password,
       confirmPassword: this.selectedData.confirmPassword,
       emailPro: this.selectedData.emailPro,
       poste: this.selectedData.poste,
       role: this.selectedData.role,
       username: this.selectedData.username,
       accountNonExpired: true,
       accountNonLocked :true,
       credentialsNonExpired :true,
       enabled: true,
        
      };
      console.log('Form submitted:', colab);
      this.userService.update(this.selectedData.id, colab).subscribe(
        (res) => {
          console.log('Data has been successfully submitted:', res);
          const Modeldiv = document.getElementById('toastsuccesModify');
          if(Modeldiv != null){
            // Modeldiv.style.display = 'block';
            Modeldiv.classList.add('show');
            setTimeout(() => {
              Modeldiv.classList.remove('show');
            }, 2000);
           
          }
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
      console.log('Data has been sent for saving');
    } else {
      console.error("ID is undefined for the selected Societeupdat");
    }
  }
   showFixedButton: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
 
    this.showFixedButton = window.scrollY > 100;
  }
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

   logout() {     
       
    this.router.navigate(["/"]); 
    console.log('SessionStorage data:', window.sessionStorage.getItem('key'));
     window.sessionStorage.clear();  
   }
  

   OnSubmit() {
    Object.keys(this.ColabForm.controls).forEach((field) => {
      const control = this.ColabForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
   // debugger;
  
    if (this.ColabForm.valid) {
      const selectedRole = this.ColabForm.get('roles')!.value;
  
      if (selectedRole && selectedRole.length > 0) {
        const colab = {
          username: this.ColabForm.value.username,
          prenom: this.ColabForm.value.prenom,
          nom: this.ColabForm.value.nom,
          password: this.ColabForm.value.password,
          confirmPassword: this.ColabForm.value.confirmPassword,
          emailPro: this.ColabForm.value.emailPro,
          poste: this.ColabForm.value.poste,
          accountNonExpired: true,
          accountNonLocked: true,
          credentialsNonExpired: true,
          enabled: true,
          roles: [
            {
              role: selectedRole[0].role,  
              privileges: [
                {
                  privilege: 'string',
                },
              ],
            },
          ],
        };
  
        console.log(colab);
  
        this.userService.createcolab(colab).subscribe(
          (res) => {
            console.log('Data has been successfully submitted:', res);
            const Modeldiv = document.getElementById('toastsucces');
            if (Modeldiv != null) {
              Modeldiv.classList.add('show');
              setTimeout(() => {
                Modeldiv.classList.remove('show');
              }, 2000);
            }
          },
          (error) => {
            console.error('An error occurred:', error);
          }
        );
  
        console.log('Form submitted:', colab);
  
        const Modeldiv = document.getElementById('toastsucces');
        if (Modeldiv != null) {
          Modeldiv.classList.add('show');
          setTimeout(() => {
            Modeldiv.classList.remove('show');
          }, 2000);
        }
      } else {
        console.log('Selected role is invalid');
      }
    } else {
      console.log('Form is invalid');
    }
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
