import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../alert.service';
 
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  tokenKey = 'token';
  
  ngOnInit() {
    this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
}

 
  constructor(private appService :  UserService, private router : Router,   private formBuilder: FormBuilder,
    private route: ActivatedRoute, private alertService: AlertService){
  }


  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
 
    this.alertService.clear();

    
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    this.appService.authenticateUser(this.f['username'].value, this.f['password'].value).subscribe({
      next: (token: any) => {
        localStorage.setItem(this.tokenKey, token);
        console.log('Generated Token:', token);
        const returnUrl = this.route.snapshot.queryParams['dossier'] || '/dossier';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error: any) => {
        this.alertService.error(error);
        this.loading = false;
            }
        });
}



// onSubmit_(username: string, password: string) {
    
//     this.appService.authenticateUser(username, password).subscribe((token: any) => {
//       localStorage.setItem(this.tokenKey, token);
//       this.router.navigate(['/dossier']);
//     });
  
//   }

}
