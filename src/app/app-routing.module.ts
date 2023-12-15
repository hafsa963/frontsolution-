import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OptionsComponent } from './options/options.component';
import { LoginComponent } from './login/login.component';
import { DepartementComponent } from './departement/departement.component';
import { MDPOublierComponent } from './mdp-oublier/mdp-oublier.component';
import { DossierComponent } from './dashboard/dossier/dossier.component';
import { PrestationComponent } from './dashboard/prestation/prestation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AjoutPrestationComponent } from './dashboard/ajout-prestation/ajout-prestation.component';
import { ListColabsComponent } from './dashboard/list-colabs/list-colabs.component';
import { NvColabComponent } from './dashboard/nv-colab/nv-colab.component';
import { ListClientComponent } from './dashboard/list-client/list-client.component';
import { NvClientComponent } from './dashboard/nv-client/nv-client.component';
import { DataclientComponent } from './dashboard/dataclient/dataclient.component';
import { ListTypeSocieteComponent } from './dashboard/list-type-societe/list-type-societe.component';
import { NvTypeComponent } from './dashboard/nv-type/nv-type.component';
import { TestmenuComponent } from './dashboard/testmenu/testmenu.component';
import { NvmanagerComponent } from './dashboard/nvmanager/nvmanager.component';
import { ListmanagerComponent } from './dashboard/listmanager/listmanager.component';
import { PrestationsClientComponent } from './dashboard/prestations-client/prestations-client.component';

 

 
 


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
  { path: 'list-colabs', component: ListColabsComponent },
  { path: 'nv-colab', component: NvColabComponent },
  {path: 'list-client',component : ListClientComponent },
  {path: 'nv-client',component : NvClientComponent },
  {path: 'dataclient',component :  DataclientComponent },
  {path: 'list-type-societe',component :  ListTypeSocieteComponent },
  {path: 'nv-type',component  : NvTypeComponent },
  {path: 'testmenu',component  :  TestmenuComponent },
  {path: 'nvmanager',component  :  NvmanagerComponent },
  {path: 'listmanager',component  :  ListmanagerComponent },
  {path: 'prestations-client',component  :  PrestationsClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
 
})
export class AppRoutingModule { }
