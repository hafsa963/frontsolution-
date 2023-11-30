import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsComponent } from './options/options.component';
import { LoginComponent } from './login/login.component';
import { DepartementComponent } from './departement/departement.component';
import { MDPOublierComponent } from './mdp-oublier/mdp-oublier.component';
import { AjoutSocieteComponent } from './dashboard/ajout-societe/ajout-societe.component';
import { DossierComponent } from './dashboard/dossier/dossier.component';
import { PrestationComponent } from './dashboard/prestation/prestation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AjoutPrestationComponent } from './dashboard/ajout-prestation/ajout-prestation.component';
import { ListColabsComponent } from './dashboard/list-colabs/list-colabs.component';
import { NvColabComponent } from './dashboard/nv-colab/nv-colab.component';
import { PrestationToDossierComponent } from './dashboard/prestation-to-dossier/prestation-to-dossier.component';
import { DossierArchiveComponent } from './dashboard/dossier-archive/dossier-archive.component';
import { ListClientComponent } from './dashboard/list-client/list-client.component';
import { NvClientComponent } from './dashboard/nv-client/nv-client.component';
import { DataclientComponent } from './dashboard/dataclient/dataclient.component';
 

 
 


const routes: Routes = [
  // {path:"", component: OptionsComponent},
  {path:"", component: LoginComponent},
  {path:"Departement", component: DepartementComponent},
  {path:"MDPOublier", component: MDPOublierComponent},
  {path:"dossier", component: DossierComponent},
  {path:"Prestation", component:  PrestationComponent},
  {path:"dashboard" , component:DashboardComponent},
  {path:"ajout-prestation" , component:AjoutPrestationComponent},
  { path: 'dashboard/dossier', component: DossierComponent },
  { path: 'dashboard/Prestation', component: PrestationComponent },
  {path:"ajout-societe", component: AjoutSocieteComponent },
  { path: 'list-colabs', component: ListColabsComponent },
  { path: 'nv-colab', component: NvColabComponent },
  {path: 'prestation-to-dossier/:id',component : PrestationToDossierComponent },
  {path: 'dossier-archive',component : DossierArchiveComponent },
  {path: 'list-client',component : ListClientComponent },
  {path: 'nv-client',component : NvClientComponent },
  {path: 'dataclient',component :  DataclientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }
