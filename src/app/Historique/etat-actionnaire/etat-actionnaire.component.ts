import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmetteurService } from '../../Services/emetteur.service';
import { TitreService } from '../../Services/titre.service';
import { ActionnaireService } from '../../Services/actionnaire.service';
import { NatureCompteService } from '../../Services/nature-compte.service';
import { NatureAvoirService } from '../../Services/nature-avoir.service';
import { TeneurCompteService } from '../../Services/teneur-compte.service';
import { TeneurCompte } from '../../Models/teneur-compte';
import { NatureCompteTitre } from '../../Models/nature-compte-titre';
import { NatureAvoir } from '../../Models/nature-avoir';
import { Titre } from '../../Models/titre';
import { Emetteur } from '../../Models/emetteur';
import { PdfGeneratorService } from '../../Services/pdf-generator.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-etat-actionnaire',
  templateUrl: './etat-actionnaire.component.html',
  styleUrl: './etat-actionnaire.component.css'
})
export class EtatActionnaireComponent implements OnInit {

    displayedColumns: string[] = ['matricule', 'raisonSociale', 'identifiant', 'libelleCourt', 'solde', 'codeNatureCompteTitre', 'codeCategorieAvoir', 'adresse'];
    dataSource!: MatTableDataSource<any>;

    emetteurs: Emetteur[] = [];
    titres: Titre[] = [];
    natureAvoir: NatureAvoir[] = [];
    natureCompte: NatureCompteTitre[] = [];
    teneurCompte: TeneurCompte[] = [];
    selectedEmetteur!: string;
    selectedTitre!: string;
    selectedNatureAvoir!: number;
    selectedNatureCompte!: number;
    selectedTC!: string;
    selectedDate: Date = new Date();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private emetteurService: EmetteurService, private titreService: TitreService, private actionnaireService: ActionnaireService, private natureCompteService: NatureCompteService, private natureAvoirService: NatureAvoirService, private teneurCompteService: TeneurCompteService, private pdfGeneratorService: PdfGeneratorService) { }

    ngOnInit(): void {
        this.getEmetteurs();
        
        this.getNatureAvoir();

        this.getNatureCompte();

        this.getTC();
    }

    getEmetteurs() {
        this.emetteurService.getEmetteurList().subscribe(data => {
            this.emetteurs = data;
        });
    }

    getNatureCompte() {
      this.natureCompteService.getNatureCompte().subscribe(data => {
        this.natureCompte = data;
      });
    }

    getNatureAvoir() {
      this.natureAvoirService.getNatureAvoir().subscribe(data => {
        this.natureAvoir = data;
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
        this.getActionnaires(this.selectedEmetteur, this.selectedTitre);
    }

    onTCChange(event: any) {
      this.selectedTC = event.value;
      this.actionnaireService.getEtatActionnairesByEmetteurAndTitreAndTc(this.selectedEmetteur, this.selectedTitre, this.selectedTC, this.selectedDate).subscribe((data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

    onNatureCompteChange(event: any) {
      this.selectedNatureCompte = event.value;
      this.actionnaireService.getEtatActionnairesByEmetteurAndTitreAndTcAndNc(this.selectedEmetteur, this.selectedTitre, this.selectedTC, this.selectedNatureCompte, this.selectedDate).subscribe((data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
    }

    onCategorieAvoirChange(event: any) {
      this.selectedNatureAvoir = event.value;
      this.actionnaireService.getEtatActionnairesByEmetteurAndTitreAndTcAndNcAndNa(this.selectedEmetteur, this.selectedTitre, this.selectedTC, this.selectedNatureCompte, this.selectedNatureAvoir, this.selectedDate).subscribe((data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
    }

    getActionnaires(idEmetteur: string, idTitre: string) {
        this.actionnaireService.getEtatActionnairesByEmetteurAndTitre(idEmetteur, idTitre, this.selectedDate).subscribe((data: any[]) => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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

    generatePdf() {
      const doc = new jsPDF('p', 'mm', 'a4');
      const logo = new Image();
      logo.src = '../../../assets/img/logoBNAC.png';  // Path to your logo image
    
      logo.onload = () => {
        // Add Logo
        doc.addImage(logo, 'PNG', 10, 10, 50, 20);
    
        // Header section
        doc.setFontSize(10);
        doc.text('Intermédiaire en bourse', 10, 35);
        doc.text('Agrément: 26-95 Du 29/05/95', 10, 40);
        doc.text('Les Berges du Lac, le', 170, 10);
        doc.text('19/06/2024', 170, 15);
        doc.setFontSize(16);
        doc.text('Solde/TC', 105, 50, { align: 'center' });
    
        // Sub-header
        doc.setFontSize(9);
        doc.text('Emetteur: SOMOCER', 105, 60, { align: 'center' });
        doc.text('Titre: SOMOCER', 105, 65, { align: 'center' });
        doc.text('A la date du 18/06/2024', 105, 70, { align: 'center' });
    
        // Table headers with adjusted x positions
        const headers = ['Matricule', 'Nom et Prenom', 'Identifiant', 'Libelle Court', 'Solde', 'Code Nature Compte', 'Code Categorie Avoir', 'Adresse'];
        const startX = [10, 25, 55, 85, 105, 135, 165, 190, 215];  // Adjust these values for better spacing
        let startY = 80;
        doc.setFontSize(9);
        
        doc.setFontSize(9);
        doc.text('Matricule', 10, 80);
        doc.text('Nom et Prenom', 25, 80);
        doc.text('Identifiant', 55, 80);
        doc.text('Libelle Court', 85, 80);
        doc.text('Solde', 105, 80);
        doc.text('Code Nature Compte Titre', 118, 80);
        doc.text('Code Categorie Avoir', 158, 80);
        doc.text('Adresse', 190, 80);
    
        // Adjust row height for multi-line text
        let rowY = startY + 10;
        this.dataSource.data.forEach((data: any) => {
          if (rowY > 270) {  // Avoid overflowing
            doc.addPage();
            rowY = 20;
          }
    
          // Wrap long text (e.g., raisonSociale) that reaches the next startX
          const wrappedRaisonSociale = doc.splitTextToSize(data.raisonSociale, startX[2] - startX[1] - 5);  // Adjust width to fit within columns
          const wrappedLibelleCourt = doc.splitTextToSize(data.libelleCourt, startX[4] - startX[3] - 5);
          const wrappedAdresse = doc.splitTextToSize(data.adresse, startX[8] - startX[7]);
    
          const maxLines = Math.max(wrappedRaisonSociale.length, wrappedLibelleCourt.length); // Calculate max number of lines
    
          doc.text(data.matricule.toString(), startX[0], rowY);  // Matricule
          doc.text(wrappedRaisonSociale, startX[1], rowY);       // Raison Sociale with wrapping
          doc.text(data.identifiant, startX[2], rowY);           // Identifiant
          doc.text(wrappedLibelleCourt, startX[3], rowY);        // Libelle Court with wrapping
          doc.text(data.solde.toString(), startX[4], rowY);      // Solde
          doc.text(data.codeNatureCompteTitre, startX[5], rowY); // Code Nature Compte Titre
          doc.text(data.codeCategorieAvoir, startX[6], rowY);    // Code Categorie Avoir
          doc.setFontSize(6);
          doc.text(wrappedAdresse, startX[7], rowY);               // Adresse
          doc.setFontSize(9);
    
          // Move to next row (increase by line height * number of lines for the wrapped text)
          rowY += 15;
        });
    
        // Footer
        doc.setFontSize(10);
        doc.text('Footer text here...', 10, 290);
    
        doc.save('etat-actionnaire.pdf');
      };
    }
    

}
