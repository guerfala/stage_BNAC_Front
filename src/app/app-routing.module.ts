import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';
import { EtatActionnaireComponent } from './Historique/etat-actionnaire/etat-actionnaire.component';

const routes: Routes = [
  {path: 'actionnaire', component: ActionnaireComponent},
  {path: 'etatactionnaire', component: EtatActionnaireComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
