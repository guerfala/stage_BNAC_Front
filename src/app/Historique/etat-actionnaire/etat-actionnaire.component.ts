import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmetteurService } from '../../Services/emetteur.service';
import { TitreService } from '../../Services/titre.service';
import { ActionnaireService } from '../../Services/actionnaire.service';
import { NatureCompteTitreService } from '../../Services/nature-compte-titre.service';
import { NatureAvoirService } from '../../Services/nature-avoir.service';
import { TeneurCompteService } from '../../Services/teneur-compte.service';
import { TeneurCompte } from '../../Models/teneur-compte';
import { NatureCompteTitre } from '../../Models/nature-compte-titre';
import { NatureAvoir } from '../../Models/nature-avoir';
import { Titre } from '../../Models/titre';
import { Emetteur } from '../../Models/emetteur';
import { PdfGeneratorService } from '../../Services/pdf-generator.service';

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

    exportToPdf(): void {
      // Extract data from the data source (assuming dataSource.data contains your table data)
      const dataToExport = this.dataSource.data;
  
      // Generate PDF with the extracted data
      this.pdfGeneratorService.generatePdf(dataToExport, 'exported-data');
    }

}
