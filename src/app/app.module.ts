import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OptionsComponent } from './options/options.component';
import { DepartementComponent } from './departement/departement.component';
import { MDPOublierComponent } from './mdp-oublier/mdp-oublier.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DossierComponent } from './dashboard/dossier/dossier.component';
import { PrestationComponent } from './dashboard/prestation/prestation.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AjoutSocieteComponent } from './dashboard/ajout-societe/ajout-societe.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AjoutPrestationComponent } from './dashboard/ajout-prestation/ajout-prestation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListColabsComponent } from './dashboard/list-colabs/list-colabs.component';
import { NvColabComponent } from './dashboard/nv-colab/nv-colab.component';
import { HttpInterceptorService } from './service/http-interceptor.service';
import { PrestationToDossierComponent } from './dashboard/prestation-to-dossier/prestation-to-dossier.component';
import { DossierArchiveComponent } from './dashboard/dossier-archive/dossier-archive.component';
 
 
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OptionsComponent,
    DepartementComponent,
    MDPOublierComponent,
    DashboardComponent,
    DossierComponent,
    PrestationComponent,
    AjoutSocieteComponent,
    AjoutPrestationComponent,
    NvColabComponent,
    ListColabsComponent,
    PrestationToDossierComponent,
    DossierArchiveComponent,
  
     
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    BrowserModule,
     HttpClientModule,
     
     
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  },
],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
