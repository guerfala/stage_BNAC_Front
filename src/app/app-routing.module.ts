import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';
import { EtatActionnaireComponent } from './Historique/etat-actionnaire/etat-actionnaire.component';
import { SoldeTCComponent } from './Historique/solde-tc/solde-tc.component';
import { StructureCapitalComponent } from './Historique/structure-capital/structure-capital.component';

const routes: Routes = [
  {path: 'actionnaire', component: ActionnaireComponent},
  {path: 'etatactionnaire', component: EtatActionnaireComponent},
  {path: 'soldeTc', component: SoldeTCComponent},
  {path: 'structureCapital', component: StructureCapitalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
