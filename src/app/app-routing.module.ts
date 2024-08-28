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
import { ExportComponent } from './Referentiel/export/export.component';
import { TeneurCompteComponent } from './Historique/teneur-compte/teneur-compte.component';
import { NatureAvoirComponent } from './Historique/nature-avoir/nature-avoir.component';
import { TitreComponent } from './Historique/titre/titre.component';
import { NatureCompteTitreComponent } from './Historique/nature-compte-titre/nature-compte-titre.component';
import { PresentsComponent } from './Referentiel/presents/presents.component';
import { AssembleeComponent } from './Referentiel/assemblee/assemblee.component';

const routes: Routes = [
  {path: 'actionnaire', component: ActionnaireComponent},
  {path: 'etatactionnaire', component: EtatActionnaireComponent},
  {path: 'soldeTc', component: SoldeTCComponent},
  {path: 'structureCapital', component: StructureCapitalComponent},
  {path: 'journal', component: JournalComponent},
  {path: 'mouvements', component: MouvementsComponent},
  {path: 'import', component: ImportComponent},
  {path: 'traitement', component: TraitementComponent},
  {path: 'export', component: ExportComponent},

  { path: 'teneur-compte', component: TeneurCompteComponent},
  { path: 'nature-avoir', component: NatureAvoirComponent},
  { path: 'nature-compte-titre', component: NatureCompteTitreComponent},
  { path: 'titre', component: TitreComponent},

  {path : 'presents',component:PresentsComponent},
  {path : 'assemblee',component:AssembleeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
