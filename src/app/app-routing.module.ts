import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';
//import { OperationComponent } from './HistoriqueOperation/operation/operation.component';
import { TeneurCompteComponent } from './Historique/teneur-compte/teneur-compte.component';
import { NatureAvoirComponent } from './Historique/nature-avoir/nature-avoir.component';
import { NatureCompteTitreComponent } from './Historique/nature-compte-titre/nature-compte-titre.component';
import { TitreComponent } from './Historique/titre/titre.component';
import { ImportComponent } from './Referentiel/import/import.component';





const routes: Routes = [
  {path: 'actionnaire', component: ActionnaireComponent},
 
  { path: 'teneur-compte', component: TeneurCompteComponent },
  { path: 'nature-avoir', component: NatureAvoirComponent },
  { path: 'nature-compte-titre', component: NatureCompteTitreComponent },
  { path: 'titre', component: TitreComponent },
  { path: 'import', component: ImportComponent },







];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
