import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ActionnaireComponent } from './Historique/actionnaire/actionnaire.component';
import { OperationComponent } from './Historique/operation/operation.component';

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
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NatureCompteTitreComponent } from './Historique/nature-compte-titre/nature-compte-titre.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component'; 
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    ActionnaireComponent,
    OperationComponent,
    NatureAvoirComponent,
    TypeOperationComponent,
    TeneurCompteComponent,
    NatureAvoirComponent,
    NatureCompteTitreComponent,
    ConfirmationDialogComponent,
   ],
  imports: [
    BrowserModule,
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
    FormsModule,
    MatIconModule,
    FormsModule,
    MatDialogModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
