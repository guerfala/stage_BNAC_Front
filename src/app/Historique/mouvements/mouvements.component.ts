import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmetteurService } from '../../Services/emetteur.service';
import { TitreService } from '../../Services/titre.service';
import { MatTableDataSource } from '@angular/material/table';
import jsPDF from 'jspdf';
import { OperationService } from '../../Services/operation.service';
import { TeneurCompteService } from '../../Services/teneur-compte.service';
import { TeneurCompte } from '../../Models/teneur-compte';
import { format } from 'date-fns';
import { SoldeDTO } from '../../Models/solde-dto';

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
    teneurCompte: TeneurCompte[] = [];
    selectedEmetteur!: string;
    selectedTitre!: string;
    selectedTC: string = "";
    matricule: number = 0;
    minDate: Date = new Date();
    maxDate: Date = new Date();

    today!: string;
    totalVente: number = 0;
    totalAchat: number = 0;
    solde!: SoldeDTO;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private emetteurService: EmetteurService, private titreService: TitreService, private operationService: OperationService, private teneurCompteService: TeneurCompteService) {
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
      this.onFieldChange();
  }

  onTCChange(event: any) {
    this.selectedTC = event.value;
    this.onFieldChange();
  }

  onMatriculeChange(){
    this.onFieldChange();
  }

  onFieldChange(){
    if(this.matricule == 0 && this.selectedTC == "")
      {
        this.getMouvements(this.selectedTitre);
      }
    else if(this.matricule == 0 && this.selectedTC != ""){
        this.getMouvementsByTc();
      }
    else if(this.matricule != 0 && this.selectedTC == ""){
        this.getMouvementsByMatricule();
      }
    else if(this.matricule != 0 && this.selectedTC != ""){
        this.getMouvementsByMatriculeAndByTc();
      }
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
  
  getMouvementsByTc(){
    this.operationService.getMouvementsByTc(this.selectedTitre, this.minDate, this.maxDate, this.selectedTC).subscribe((data: any[]) => {
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

  getMouvementsByMatricule() {
    this.operationService.getMouvementsByMatricule(this.selectedTitre, this.minDate, this.maxDate, this.matricule).subscribe((data: any[]) => {
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

    this.operationService.getActionnaireMouvement(this.selectedTitre, this.maxDate, this.matricule).subscribe((solde: any) => {
      this.solde = solde;
  });
  }
  
  getMouvementsByMatriculeAndByTc(){
    this.operationService.getMouvementsByMatriculeAndByTc(this.selectedTitre, this.minDate, this.maxDate, this.selectedTC, this.matricule).subscribe((data: any[]) => {
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

    this.operationService.getActionnaireMouvement(this.selectedTitre, this.maxDate, this.matricule).subscribe((solde: any) => {
      this.solde = solde;
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

    if(this.matricule == 0)
      {
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
          doc.text('Mouvement du ' + this.minDate.getDay() + "/" + this.minDate.getMonth() + "/" + this.minDate.getFullYear() + " au " + this.maxDate.getDay() + "/" + this.maxDate.getMonth() + "/" + this.maxDate.getFullYear(), 105, 50, { align: 'center' });

          doc.setFontSize(9);
          doc.text('Emetteur: ' + this.selectedEmetteur, 105, 56, { align: 'center' });
          doc.text('Titre: ' + this.selectedTitre, 105, 61, { align: 'center' });
          doc.text('A la date du ' + this.today, 105, 66, { align: 'center' });

          // Table headers
        doc.setFontSize(10);
        doc.text('TC', 10, 75);
        doc.text('Date Bourse', 35, 75);
        doc.text('Raison Sociale', 60, 75);
        doc.text('Numero Contrat', 133, 75);
        doc.text('Achat', 163, 75);
        doc.text('Vente', 178, 75);
        doc.text('Cours', 190, 75);

        // Draw table headers horizontal line
        doc.setLineWidth(0.1);
        doc.line(10, 77, 200, 77);

        // Draw table rows
        let row = 85;
        this.dataSource.data.forEach((data: any, index: number) => {
          doc.text(data.libelleCourt, 10, row);
          doc.text(data.dateBourse, 35, row);
          doc.text(data.actionnaire, 60, row);
          doc.text(data.numContrat, 135, row);
          this.totalAchat= this.totalAchat + data.achat;
          this.totalVente= this.totalVente + data.vente;
          doc.text(data.achat.toString(), 165, row);
          doc.text(data.vente.toString(), 180, row);
          doc.text(data.cours.toString(), 190, row);

          // Draw horizontal line for each row
          doc.line(10, row + 2, 200, row + 2); // Adjust x1, x2 as needed

          row += 10; // Increase the row spacing to 10 for separation

          if (row > 270) {
            doc.addPage();
            row = 20;  // Reset row for new page
          }
        });

        // Add totals row
        if (row > 270) {
          doc.addPage();
          row = 20;  // Reset row for new page
        }

        doc.setFontSize(15);
        doc.text('Total', 135, row);
        doc.text(this.totalAchat.toString(), 155, row);
        doc.text(this.totalVente.toString(), 180, row);
        doc.line(10, row + 2, 200, row + 2); // Draw line below totals

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
    else
      {
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
          doc.text('Mouvement du ' + this.minDate.getDay() + "/" + this.minDate.getMonth() + "/" + this.minDate.getFullYear() + " au " + this.maxDate.getDay() + "/" + this.maxDate.getMonth() + "/" + this.maxDate.getFullYear(), 105, 50, { align: 'center' });

          doc.setFontSize(9);
          doc.text('Emetteur: ' + this.selectedEmetteur, 105, 55, { align: 'center' });
          doc.text('Titre: ' + this.selectedTitre, 105, 60, { align: 'center' });
          doc.text('Actionnaire: ' + this.dataSource.data[0].actionnaire, 145, 65, { align: 'center' });
          doc.text('Solde: ' + this.dataSource.data[0].solde, 105, 70, { align: 'center' });
          doc.text('A la date du ' + this.today, 105, 75, { align: 'center' });

          // Table headers
        doc.setFontSize(10);
        doc.text('TC', 10, 86);
        doc.text('Date Bourse', 35, 86);
        doc.text('Raison Sociale', 60, 86);
        doc.text('Numero Contrat', 133, 86);
        doc.text('Achat', 163, 86);
        doc.text('Vente', 178, 86);
        doc.text('Cours', 190, 86);

        // Draw table headers horizontal line
        doc.setLineWidth(0.1);
        doc.line(10, 88, 200, 88);

        // Draw table rows
        let row = 95;
        this.dataSource.data.forEach((data: any, index: number) => {
          doc.text(data.libelleCourt, 10, row);
          doc.text(data.dateBourse, 35, row);
          doc.text(data.actionnaire, 60, row);
          doc.text(data.numContrat, 135, row);
          this.totalAchat= this.totalAchat + data.achat;
          this.totalVente= this.totalVente + data.vente;
          doc.text(data.achat.toString(), 165, row);
          doc.text(data.vente.toString(), 180, row);
          doc.text(data.cours.toString(), 190, row);

          // Draw horizontal line for each row
          doc.line(10, row + 2, 200, row + 2); // Adjust x1, x2 as needed

          row += 10; // Increase the row spacing to 10 for separation

          if (row > 270) {
            doc.addPage();
            row = 20;  // Reset row for new page
          }
        });

        // Add totals row
        if (row > 270) {
          doc.addPage();
          row = 20;  // Reset row for new page
        }

        doc.setFontSize(15);
        doc.text('Total', 135, row);
        doc.text(this.totalAchat.toString(), 155, row);
        doc.text(this.totalVente.toString(), 180, row);
        doc.line(10, row + 2, 200, row + 2); // Draw line below totals

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

}
