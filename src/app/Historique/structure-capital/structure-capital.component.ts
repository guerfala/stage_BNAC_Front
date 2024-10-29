import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmetteurService } from '../../Services/emetteur.service';
import { TitreService } from '../../Services/titre.service';
import jsPDF from 'jspdf';
import { SoldeService } from '../../Services/solde.service';

@Component({
  selector: 'app-structure-capital',
  templateUrl: './structure-capital.component.html',
  styleUrl: './structure-capital.component.css'
})
export class StructureCapitalComponent {
  displayedColumns: string[] = ['Matricule', 'RaisonSociale', 'Pourcentage', 'Solde'];
  dataSource!: MatTableDataSource<any>;

  emetteurs: any[] = [];
  titres: any[] = [];
  selectedEmetteur!: string;
  selectedTitre!: string;
  selectedDate: Date = new Date();
  minPourcentage!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private emetteurService: EmetteurService, private titreService: TitreService, private soldeService: SoldeService) { }

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
    this.selectedTitre = event.value;
}

onPourcentageChange(event: any) {
  this.minPourcentage = Number(this.minPourcentage);
  this.getCapitale(this.selectedTitre);
}

getCapitale(idTitre: string) {
  this.soldeService.findCapitale(idTitre, this.selectedDate, this.minPourcentage).subscribe((data: any[]) => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.idTC.toString().toLowerCase().includes(filter) ||
             data.libelleCourt.toLowerCase().includes(filter) ||
             data.codeNatureCompteTitre.toLowerCase().includes(filter) ||
             data.codeCategorieAvoir.toLowerCase().includes(filter) ||
             data.solde.toString().toLowerCase().includes(filter);
    };
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
  doc.text('Matricule', 10, 80);
  doc.text('Raison Sociale', 40, 80);
  doc.text('Pourcentage', 110, 80);
  doc.text('Solde', 160, 80);

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

    const wrappedRaisonSociale = doc.splitTextToSize(data.raisonSociale, 110 - 40 - 5);

    doc.text(data.matricule.toString(), 10, rowY);
    doc.text(wrappedRaisonSociale, 40, rowY);
    doc.text(data.prtage.toString(), 110, rowY);
    doc.text(data.solde.toString(), 160, rowY);

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
