import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';
import { EtatActionnaireComponent } from './Historique/etat-actionnaire/etat-actionnaire.component';
import { SoldeTCComponent } from './Historique/solde-tc/solde-tc.component';

const routes: Routes = [
  {path: 'actionnaire', component: ActionnaireComponent},
  {path: 'etatactionnaire', component: EtatActionnaireComponent},
  {path: 'solde-tc', component: SoldeTCComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
