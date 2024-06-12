import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';

const routes: Routes = [
  {path: 'actionnaire', component: ActionnaireComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
