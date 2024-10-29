import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmetteurService } from '../../Services/emetteur.service';
import { TitreService } from '../../Services/titre.service';
import { TeneurCompteService } from '../../Services/teneur-compte.service';
import jsPDF from 'jspdf';
import { TeneurCompte } from '../../Models/teneur-compte';
import { OperationService } from '../../Services/operation.service';
import { format } from 'date-fns';
import { TypeOperationService } from '../../Services/type-operation.service';
import { TypeOperation } from '../../Models/type-operation';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.css'
})
export class JournalComponent {

  displayedColumns: string[] = ['idTC', 'dateBourse', 'type', 'raisonSociale', 'idTitre', 'numContrat', 'debit', 'credit'];
  dataSource!: MatTableDataSource<any>;

  emetteurs: any[] = [];
  titres: any[] = [];
  teneurCompte: TeneurCompte[] = [];
  typesOp: TypeOperation[] = [];
  selectedEmetteur!: string;
  selectedTitre!: string;
  selectedType: string = "";
  selectedTC: string = "";
  matricule: number = 0;
  minDate: Date = new Date();
  maxDate: Date = new Date();

  today!: string;
  totalVente: number = 0;
  totalAchat: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private emetteurService: EmetteurService, private titreService: TitreService, private operationService: OperationService, private teneurCompteService: TeneurCompteService, private typeOpService: TypeOperationService) {
    const now = new Date();
    this.today = format(now, 'yyyy-MM-dd');
   }

  ngOnInit(): void {
    this.getEmetteurs();
}

getEmetteurs() {
    this.emetteurService.getEmetteurList().subscribe(data => {
        this.emetteurs = data;
    });
}

onEmetteurChange(event: any): void { 
  this.selectedEmetteur = event.value;
  this.titreService.getTitresByEmetteur(this.selectedEmetteur).subscribe(data => {
    this.titres = data;
  });
}

onTitreChange(event: any) {
  this.onFieldChange();
  this.getTC();
  this.getTypeOp();
}

getTC() {
  this.teneurCompteService.getTC().subscribe(data => {
    this.teneurCompte = data;
  });
}

onTCChange(event: any) {
  this.onFieldChange();
}

getTypeOp() {
  this.typeOpService.getTypeOperation().subscribe(data => {
    this.typesOp = data;
  });
}

onTypeOpChange(event: any) {
  this.onFieldChange();
}

onMatriculeChange(){
  this.onFieldChange();
}

onFieldChange(){ 
  if(this.matricule == 0 && this.selectedTC == "" && this.selectedType == "")
    {
      this.getJournals(this.selectedTitre);
    }
  else if(this.matricule == 0 && this.selectedTC == "" && this.selectedType != ""){
      this.getJournalsByTypeOp();
    }
  else if(this.matricule == 0 && this.selectedTC != "" && this.selectedType == ""){
      this.getJournalsByTc();
    }
  else if(this.matricule != 0 && this.selectedTC == "" && this.selectedType == ""){
      this.getJournalsByMatricule(this.matricule);
    }
  else if(this.matricule == 0 && this.selectedTC != "" && this.selectedType != ""){
      this.getJournalsByTypeOpAndTc();
    }
  else if(this.matricule != 0 && this.selectedTC != "" && this.selectedType == ""){
      this.getJournalsByMatriculeAndByTc();
    }
  else if(this.matricule != 0 && this.selectedTC == "" && this.selectedType != ""){
      this.getJournalsByMatriculeAndByTypeOp();
    }
  else if(this.matricule != 0 && this.selectedTC != "" && this.selectedType != ""){
      this.getJournalsByMatriculeAndByTcAndByTypeOp();
    }
}

getJournals(idTitre: string) {
  this.operationService.getJournals(idTitre, this.minDate, this.maxDate).subscribe((data: any[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.tc.toString().toLowerCase().includes(filter) ||
             data.dateBourse.toString().toLowerCase().includes(filter) ||
             data.actionnaire.toString().toLowerCase().includes(filter) ||
             data.numContrat.toString().toLowerCase().includes(filter) ||
             data.vente.toString().toLowerCase().includes(filter) ||
             data.achat.toString().toLowerCase().includes(filter) ||
             data.cours.toString().toLowerCase().includes(filter);
    };
     ;
  });
}

getJournalsByTc(){
  this.operationService.getJournalsByTc(this.selectedTitre, this.minDate, this.maxDate, this.selectedTC).subscribe((data: any[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.tc.toString().toLowerCase().includes(filter) ||
             data.dateBourse.toString().toLowerCase().includes(filter) ||
             data.actionnaire.toString().toLowerCase().includes(filter) ||
             data.numContrat.toString().toLowerCase().includes(filter) ||
             data.vente.toString().toLowerCase().includes(filter) ||
             data.achat.toString().toLowerCase().includes(filter) ||
             data.cours.toString().toLowerCase().includes(filter);
    };
     ;
  });
}

getJournalsByTypeOp(){
  this.operationService.getJournalsByTypeOp(this.selectedTitre, this.minDate, this.maxDate, this.selectedType).subscribe((data: any[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.tc.toString().toLowerCase().includes(filter) ||
             data.dateBourse.toString().toLowerCase().includes(filter) ||
             data.actionnaire.toString().toLowerCase().includes(filter) ||
             data.numContrat.toString().toLowerCase().includes(filter) ||
             data.vente.toString().toLowerCase().includes(filter) ||
             data.achat.toString().toLowerCase().includes(filter) ||
             data.cours.toString().toLowerCase().includes(filter);
    };
     ;
  });
}

getJournalsByTypeOpAndTc(){
  this.operationService.getJournalsByTypeOpAndTc(this.selectedTitre, this.minDate, this.maxDate, this.selectedType, this.selectedTC).subscribe((data: any[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.tc.toString().toLowerCase().includes(filter) ||
             data.dateBourse.toString().toLowerCase().includes(filter) ||
             data.actionnaire.toString().toLowerCase().includes(filter) ||
             data.numContrat.toString().toLowerCase().includes(filter) ||
             data.vente.toString().toLowerCase().includes(filter) ||
             data.achat.toString().toLowerCase().includes(filter) ||
             data.cours.toString().toLowerCase().includes(filter);
    };
     ;
  });
}

getJournalsByMatricule(matricule: number) {
  this.operationService.getJournalsByMatricule(this.selectedTitre, this.minDate, this.maxDate, matricule).subscribe((data: any[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.tc.toString().toLowerCase().includes(filter) ||
             data.dateBourse.toString().toLowerCase().includes(filter) ||
             data.actionnaire.toString().toLowerCase().includes(filter) ||
             data.numContrat.toString().toLowerCase().includes(filter) ||
             data.vente.toString().toLowerCase().includes(filter) ||
             data.achat.toString().toLowerCase().includes(filter) ||
             data.cours.toString().toLowerCase().includes(filter);
    };
     ;
  });
}

getJournalsByMatriculeAndByTc(){
  this.operationService.getJournalsByMatriculeAndTc(this.selectedTitre, this.minDate, this.maxDate, this.matricule, this.selectedTC).subscribe((data: any[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.tc.toString().toLowerCase().includes(filter) ||
             data.dateBourse.toString().toLowerCase().includes(filter) ||
             data.actionnaire.toString().toLowerCase().includes(filter) ||
             data.numContrat.toString().toLowerCase().includes(filter) ||
             data.vente.toString().toLowerCase().includes(filter) ||
             data.achat.toString().toLowerCase().includes(filter) ||
             data.cours.toString().toLowerCase().includes(filter);
    };
     ;
  });
}

getJournalsByMatriculeAndByTypeOp(){
  this.operationService.getJournalsByMatriculeAndTypeOp(this.selectedTitre, this.minDate, this.maxDate, this.matricule, this.selectedType).subscribe((data: any[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.tc.toString().toLowerCase().includes(filter) ||
             data.dateBourse.toString().toLowerCase().includes(filter) ||
             data.actionnaire.toString().toLowerCase().includes(filter) ||
             data.numContrat.toString().toLowerCase().includes(filter) ||
             data.vente.toString().toLowerCase().includes(filter) ||
             data.achat.toString().toLowerCase().includes(filter) ||
             data.cours.toString().toLowerCase().includes(filter);
    };
     ;
  });
}

getJournalsByMatriculeAndByTcAndByTypeOp(){
  this.operationService.getJournalsByMatriculeAndByTcAndByTypeOp(this.selectedTitre, this.minDate, this.maxDate, this.matricule, this.selectedTC, this.selectedType).subscribe((data: any[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.tc.toString().toLowerCase().includes(filter) ||
             data.dateBourse.toString().toLowerCase().includes(filter) ||
             data.actionnaire.toString().toLowerCase().includes(filter) ||
             data.numContrat.toString().toLowerCase().includes(filter) ||
             data.vente.toString().toLowerCase().includes(filter) ||
             data.achat.toString().toLowerCase().includes(filter) ||
             data.cours.toString().toLowerCase().includes(filter);
    };
     ;
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  if (!filterValue) {
    this.dataSource.filter = '';
    return;
  }

  this.dataSource.filterPredicate = (data: any, filter: string) => {
    return data.matricule.toString().toLowerCase().includes(filter) ||
           data.raisonSociale.toLowerCase().includes(filter) ||
           data.identifiant.toLowerCase().includes(filter);
  };

  this.dataSource.filter = filterValue;
}

sortByIdTC(order: string) {
  const sortedData = this.dataSource.data.sort((a, b) => {
    if (order === 'asc') {
      return a.idTC - b.idTC;
    } else {
      return b.idTC - a.idTC;
    }
  });
  this.dataSource.data = sortedData;
}

generatePdf() {
  const doc = new jsPDF('p', 'mm', 'a4');
  const logo = new Image();
  logo.src = '../../../assets/img/logoBNAC.png';  // Path to your logo image

  logo.onload = () => {
    doc.addImage(logo, 'PNG', 10, 10, 50, 20);  // Adjust image position and size

    // Add other static texts
    doc.setFontSize(10);
    doc.text('Intermédiaire en bourse', 10, 35);
    doc.text('Agrément: 26-95 Du 29/05/95', 10, 40);
    doc.text('Les Berges du Lac, le', 170, 10);
    doc.text('19/06/2024', 170, 15);
    doc.setFontSize(16);
    doc.text('Solde/TC', 105, 50, { align: 'center' });

    doc.setFontSize(9);
    doc.text('Emetteur: SOMOCER', 105, 60, { align: 'center' });
    doc.text('Titre: SOMOCER', 105, 65, { align: 'center' });
    doc.text('A la date du 18/06/2024', 105, 70, { align: 'center' });

    // Table headers
    doc.setFontSize(10);
    doc.text('IdTc', 10, 80);
    doc.text('Date Bourse', 25, 80);
    doc.text('Type Opération', 50, 80);
    doc.text('Raison Sociale', 80, 80);
    doc.text('Titre', 110, 80);
    doc.text('Numero Contrat', 140, 80);
    doc.text('Debit', 170, 80);
    doc.text('Credit', 190, 80);

    // Draw table headers horizontal line
    doc.setLineWidth(0.1);
    doc.line(10, 82, 200, 82);

    // Draw table rows
    let rowY = 90;
    this.dataSource.data.forEach((data: any, index: number) => {
      if (rowY > 270) {  // Avoid overflowing
        doc.addPage();
        rowY = 20;
      }

      const wrappedTypeop = doc.splitTextToSize(data.type, 80 - 50 - 5);
      const wrappedRaisonSociale = doc.splitTextToSize(data.raisonSociale, 110 - 80 - 5);
      const wrappedNumContrat = doc.splitTextToSize(data.numContrat, 170 - 140 - 5);

      doc.text(data.tc, 10, rowY);
      doc.text(data.dateBourse, 25, rowY);
      doc.text(wrappedTypeop, 50, rowY);
      doc.text(wrappedRaisonSociale, 80, rowY);
      doc.text(data.idTitre, 110, rowY);
      doc.text(wrappedNumContrat, 140, rowY);
      doc.text(data.debit.toString(), 170, rowY);
      doc.text(data.credit.toString(), 190, rowY);

      rowY += 15;
    });

      // Footer
      doc.setFontSize(10);
      doc.text('SA au capital de 5 000 000 Dinars', 10, 290);
      doc.text('R.C.: 8145651997', 10, 295);
      doc.text('T.V.A.: 496517CAM000', 10, 300);
      doc.text('Site Web: www.bna.capital.com', 150, 290);
      doc.text('Complexe le Banquier - Av. Tahar Haddad - Tél: 71 139 500', 10, 305);
      doc.text('Fax: 71 656 299', 150, 295);
      doc.text('Email: Webmaster@bna.capital.com', 150, 300);

      doc.save('solde-tc.pdf');
    };
    }

}
