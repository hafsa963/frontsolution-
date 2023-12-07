import { Component, HostListener} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/model/Role';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nv-colab',
  templateUrl: './nv-colab.component.html',
  styleUrls: ['./nv-colab.component.css']
})
export class NvColabComponent {
  ColabForm :  FormGroup =  new FormGroup({});
  isSidebarOpen = false;
  username: any;
  element: boolean = false;
  role: Role[] = [];
  rolesNames: string[] = [];
 
  constructor(private router : Router, private userService :UserService , private fb: FormBuilder)
  { 
     this.ColabForm = this.fb.group({
       username : ['',[Validators.required]],
       prenom : ['',[Validators.required]],
       nom : ['',[Validators.required]],
      password : ['',[Validators.required]],
      ConfirmPassword :['',[Validators.required]],
       EmailPro : ['',[Validators.required]],
      poste : ['',[Validators.required]], 
      role : ['',[Validators.required]],


     },
    //  {
    //   validators: this.ConfirmedValidator('password', 'confirmPassword')
    // }
     );
     
  }
  // ConfirmedValidator(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     const control = formGroup.controls[controlName];
  //     const matchingControl = formGroup.controls[matchingControlName];
  //     if (matchingControl.errors &&
  //       !matchingControl.errors['confirmedValidator']) {
  //       return;
  //     }
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ confirmedValidator: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   };
  // }
  showpassword(){
    const passwordInput  = document.getElementById("password") as HTMLInputElement;
    const ConfirmPasswordInput = document.getElementById("ConfirmPassword") as HTMLInputElement;
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

    this.userService.getAll().subscribe(
      (response: any) => {
        console.log(this.role);
        this.role = response as  Role[];  
        this.rolesNames = this.role.map(role => role.role);
        console.log(this.rolesNames);
      },
      (error) => {
        console.error('Error fetching roles data:', error);
      }
    );
 
    this.sidebarDetail();
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

   OnSubmit(){
    Object.keys(this.ColabForm.controls).forEach((field) => {
      const control = this.ColabForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  
    if (this.ColabForm.valid) {
         const colab = {
         username: this.ColabForm.value.username,
         prenom: this.ColabForm.value.prenom,
         nom: this.ColabForm.value.nom,
        password: this.ColabForm.value.password,
        ConfirmPassword: this.ColabForm.value.ConfirmPassword,
        EmailPro: this.ColabForm.value.EmailPro,
        poste: this.ColabForm.value.poste,
        role: this.ColabForm.value.role,
        accountNonExpired: true,
        accountNonLocked :true,
        credentialsNonExpired :true,
        enabled: true,
        
         
       };

      this.userService.createcolab(colab).subscribe(
        (res) => {
          console.log('Data has been successfully submitted:', res);
          const Modeldiv = document.getElementById('toastsucces');
          if(Modeldiv != null){
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
      if(Modeldiv != null){
        Modeldiv.classList.add('show');
        setTimeout(() => {
          Modeldiv.classList.remove('show');
        }, 2000);
       
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
