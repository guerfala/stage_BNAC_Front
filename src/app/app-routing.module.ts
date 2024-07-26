import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';
import { EtatActionnaireComponent } from './Historique/etat-actionnaire/etat-actionnaire.component';
import { SoldeTCComponent } from './Historique/solde-tc/solde-tc.component';
import { StructureCapitalComponent } from './Historique/structure-capital/structure-capital.component';
import { JournalComponent } from './Historique/journal/journal.component';
import { MouvementsComponent } from './Historique/mouvements/mouvements.component';
import { ImportComponent } from './Referentiel/import/import.component';
import { TraitementComponent } from './Referentiel/traitement/traitement.component';

const routes: Routes = [
  {path: 'actionnaire', component: ActionnaireComponent},
  {path: 'etatactionnaire', component: EtatActionnaireComponent},
  {path: 'soldeTc', component: SoldeTCComponent},
  {path: 'structureCapital', component: StructureCapitalComponent},
  {path: 'journal', component: JournalComponent},
  {path: 'mouvements', component: MouvementsComponent},
  {path: 'import', component: ImportComponent},
  {path: 'traitement', component: TraitementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
