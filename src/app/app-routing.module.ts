import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';
//import { OperationComponent } from './HistoriqueOperation/operation/operation.component';
import { TeneurCompteComponent } from './Historique/teneur-compte/teneur-compte.component';
import { NatureAvoirComponent } from './Historique/nature-avoir/nature-avoir.component';
import { NatureCompteTitreComponent } from './Historique/nature-compte-titre/nature-compte-titre.component';
import { TitreComponent } from './Historique/titre/titre.component';
import { ImportComponent } from './Referentiel/import/import.component';
import { MouvementNComponent } from './Referentiel/mouvement-n/mouvement-n.component';

import { JournalComponent } from './Historique/journal/journal.component';
import { MouvementsComponent } from './Historique/mouvements/mouvements.component';
import { AssembleeComponent } from './Referentiel/assemblee/assemblee.component';
import { Presents } from './Models/presents';
import { PresentsComponent } from './Referentiel/presents/presents.component';

const routes: Routes = [
  {path: 'actionnaire', component: ActionnaireComponent},

  { path: 'teneur-compte', component: TeneurCompteComponent },
  { path: 'nature-avoir', component: NatureAvoirComponent },
  { path: 'nature-compte-titre', component: NatureCompteTitreComponent },
  { path: 'titre', component: TitreComponent },
  {path:'import',component:ImportComponent},
  {path:'c',component: MouvementNComponent},

  {path: 'journal', component: JournalComponent},
  {path: 'mouvements', component: MouvementsComponent},
{path : 'assemblee',component:AssembleeComponent},


{path : 'presents',component:PresentsComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
