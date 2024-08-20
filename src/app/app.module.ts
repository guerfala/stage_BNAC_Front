import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { NatureAvoirComponent } from './Historique/nature-avoir/nature-avoir.component';
import { TypeOperationComponent } from './Historique/type-operation/type-operation.component';
import { TeneurCompteComponent } from './Historique/teneur-compte/teneur-compte.component';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NatureCompteTitreComponent } from './Historique/nature-compte-titre/nature-compte-titre.component';
import { TitreComponent } from './Historique/titre/titre.component'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ImportComponent } from './Referentiel/import/import.component';

import { HttpClientModule } from '@angular/common/http';


import { EtatActionnaireComponent } from './Historique/etat-actionnaire/etat-actionnaire.component';

import { SoldeTCComponent } from './Historique/solde-tc/solde-tc.component';
import { StructureCapitalComponent } from './Historique/structure-capital/structure-capital.component';
import { JournalComponent } from './Historique/journal/journal.component';
import { MouvementsComponent } from './Historique/mouvements/mouvements.component';
import { TraitementComponent } from './Referentiel/traitement/traitement.component';
import { AssembleeComponent } from './Referentiel/assemblee/assemblee.component';
import { AutoSuggestionComponent } from './Referentiel/auto-suggestion/auto-suggestion.component';
import { PresentsComponent } from './Referentiel/presents/presents.component';


@NgModule({ declarations: [
        AppComponent,
        ActionnaireComponent,
        TitreComponent,
        NatureAvoirComponent,
        TypeOperationComponent,
        TeneurCompteComponent,
        NatureAvoirComponent,
        NatureCompteTitreComponent,
        TitreComponent,
        ImportComponent,
    EtatActionnaireComponent,
    SoldeTCComponent,
    StructureCapitalComponent,
    JournalComponent,
    MouvementsComponent,
    TraitementComponent,
    AssembleeComponent,
    AutoSuggestionComponent,
    PresentsComponent,

        
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        RouterModule,
        AppRoutingModule,
        MatSelectModule,
        FormsModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatRadioModule,
        MatButtonModule,
        MatIconModule,
        AppRoutingModule,
        MatDialogModule,
        MatAutocompleteModule,

        MatDatepickerModule,
        MatNativeDateModule], providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { 
  
}
