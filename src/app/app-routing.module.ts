import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';
import { OperationComponent } from './Historique/operation/operation.component';
import { TeneurCompteComponent } from './Historique/teneur-compte/teneur-compte.component';
import { NatureAvoirComponent } from './Historique/nature-avoir/nature-avoir.component';
import { NatureCompteTitreComponent } from './Historique/nature-compte-titre/nature-compte-titre.component';



const routes: Routes = [
  {path: 'actionnaire', component: ActionnaireComponent},
  {path: 'operation', component: OperationComponent},
  { path: 'teneur-compte', component: TeneurCompteComponent },
  { path: 'nature-avoir', component: NatureAvoirComponent },
  { path: 'nature-compte-titre', component: NatureCompteTitreComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
