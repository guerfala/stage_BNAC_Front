import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmetteurService } from '../../Services/emetteur.service';
import { TitreService } from '../../Services/titre.service';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { OperationService } from '../../Services/operation.service';
import { TeneurCompteService } from '../../Services/teneur-compte.service';

@Component({
  selector: 'app-mouvements',
  templateUrl: './mouvements.component.html',
  styleUrl: './mouvements.component.css'
})
export class MouvementsComponent {

  displayedColumns: string[] = ['libelleCourt', 'dateBourse', 'actionnaire', 'numContrat', 'achat','vente', 'cours'];
    dataSource!: MatTableDataSource<any>;

    emetteurs: any[] = [];
    titres: any[] = [];
    teneurCompte: any[] = [];
    selectedEmetteur!: string;
    selectedTitre!: string;
    selectedTC!: string;
    minDate: Date = new Date();
    maxDate: Date = new Date();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private emetteurService: EmetteurService, private titreService: TitreService, private operationService: OperationService, private teneurCompteService: TeneurCompteService) { }

    ngOnInit(): void {
      this.getEmetteurs();
  }

  getEmetteurs() {
      this.emetteurService.getEmetteurList().subscribe(data => {
          this.emetteurs = data;
      });
  }

  getTC() {
    this.teneurCompteService.getTC().subscribe(data => {
      this.teneurCompte = data;
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
      this.getTC();
      this.getMouvements(this.selectedTitre);
  }

  onTCChange(event: any) {
    /*this.selectedTC = event.value;
    this.actionnaireService.getEtatActionnairesByEmetteurAndTitreAndTc(this.selectedEmetteur, this.selectedTitre, this.selectedTC, this.selectedDate).subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  });*/
  }

  getMouvements(idTitre: string) {
    this.operationService.getMouvements(idTitre, this.minDate, this.maxDate).subscribe((data: any[]) => {
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
    doc.text('IDTC', 10, 80);
    doc.text('LibelleCourt', 25, 80);
    doc.text('Nature de compte', 60, 80);
    doc.text('Catégorie d\'avoirs', 110, 80);
    doc.text('Solde', 180, 80);

    // Draw table headers horizontal line
    doc.setLineWidth(0.1);
    doc.line(10, 82, 200, 82);

    // Draw table rows
    let row = 85;
    this.dataSource.data.forEach((data: any, index: number) => {
      doc.text(data.idTC, 10, row);
      doc.text(data.libelleCourt, 25, row);
      doc.text(data.codeNatureCompteTitre + ' ' + data.libelleNC, 60, row);
      doc.text(data.codeCategorieAvoir + ' ' + data.libelleNa, 110, row);
      doc.text(data.solde.toString(), 180, row);

      // Draw horizontal line for each row
      doc.line(10, row + 2, 200, row + 2); // Adjust x1, x2 as needed

      row += 10; // Increase the row spacing to 10 for separation

      if (row > 270) {
        doc.addPage();
        row = 20;  // Reset row for new page
      }
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
