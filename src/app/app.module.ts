import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { EtatActionnaireComponent } from './Historique/etat-actionnaire/etat-actionnaire.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SoldeTCComponent } from './Historique/solde-tc/solde-tc.component';
import { StructureCapitalComponent } from './Historique/structure-capital/structure-capital.component';
import { JournalComponent } from './Historique/journal/journal.component';
import { MouvementsComponent } from './Historique/mouvements/mouvements.component';
import { ImportComponent } from './Referentiel/import/import.component';
import { MatRadioModule } from '@angular/material/radio';
import { TraitementComponent } from './Referentiel/traitement/traitement.component';
import { ExportComponent } from './Referentiel/export/export.component';
import { AssembleeComponent } from './Referentiel/assemblee/assemblee.component';
import { AutoSuggestionComponent } from './Referentiel/auto-suggestion/auto-suggestion.component';
import { JournalNComponent } from './Referentiel/journal-n/journal-n.component';
import { MouvementNComponent } from './Referentiel/mouvement-n/mouvement-n.component';
import { PresentsComponent } from './Referentiel/presents/presents.component';
import { TypeAssembleeComponent } from './Referentiel/type-assemblee/type-assemblee.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TitreComponent } from './Historique/titre/titre.component';
import { TeneurCompteComponent } from './Historique/teneur-compte/teneur-compte.component';
import { NatureAvoirComponent } from './Historique/nature-avoir/nature-avoir.component';
import { TypeOperationComponent } from './Historique/type-operation/type-operation.component';
import { MatIconModule } from '@angular/material/icon';
import { NatureCompteTitreComponent } from './Historique/nature-compte-titre/nature-compte-titre.component';

@NgModule({
  declarations: [
    AppComponent,
    ActionnaireComponent,
    EtatActionnaireComponent,
    SoldeTCComponent,
    StructureCapitalComponent,
    JournalComponent,
    MouvementsComponent,
    ImportComponent,
    TraitementComponent,
    ExportComponent,
    AssembleeComponent,
    AutoSuggestionComponent,
    JournalNComponent,
    MouvementNComponent,
    PresentsComponent,
    TypeAssembleeComponent,
    TitreComponent,
    TeneurCompteComponent,
    NatureAvoirComponent,
    TypeOperationComponent,
    NatureCompteTitreComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
