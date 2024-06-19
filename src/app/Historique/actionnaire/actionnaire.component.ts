import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmetteurService } from '../../Services/emetteur.service';
import { TitreService } from '../../Services/titre.service';
import { ActionnaireService } from '../../Services/actionnaire.service';

@Component({
    selector: 'app-actionnaire',
    templateUrl: './actionnaire.component.html',
    styleUrls: ['./actionnaire.component.css']
})
export class ActionnaireComponent implements OnInit {

    displayedColumns: string[] = ['matricule', 'raisonSociale', 'identifiant', 'libelleCourt', 'solde', 'codeNatureCompteTitre', 'codeCategorieAvoir', 'adresse'];
    dataSource!: MatTableDataSource<any>;

    emetteurs: any[] = [];
    titres: any[] = [];
    selectedEmetteur!: string;
    selectedTitre!: string;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private emetteurService: EmetteurService, private titreService: TitreService, private actionnaireService: ActionnaireService) { }

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
        this.getActionnaires(this.selectedEmetteur, this.selectedTitre);
    }

    getActionnaires(idEmetteur: string, idTitre: string) {
        this.actionnaireService.getFilteredActionnaires(idEmetteur, idTitre).subscribe((data: any[]) => {
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
}
