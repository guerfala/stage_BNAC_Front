import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmetteurService } from '../../Services/emetteur.service';
import { TitreService } from '../../Services/titre.service';
import { ImportService } from '../../Services/import.service';
import { Import } from '../../Models/import';

@Component({
  selector: 'app-traitement',
  templateUrl: './traitement.component.html',
  styleUrl: './traitement.component.css'
})
export class TraitementComponent {

  displayedColumnsFGO: string[] = ['adresse', 'cave', 'cavr', 'client', 'code_operation', 'codesisin', 'date_bourse', 'date_import', 'date_operation', 'identifiant', 'libelle', 'nationalite', 'nature_comptee', 'nature_compter', 'nature_id', 'num_contrat', 'quantite', 'statut', 'tce', 'tcr', 'type_client'];
  displayedColumnsFCRA: string[] = ['adresse', 'client', 'codesisin', 'date_bourse', 'date_de_naissance', 'date_import', 'identifiant', 'nationalite', 'nature_client', 'nature_compte', 'nature_id', 'solde', 'tc', 'type_client', 'type_de_residence', 'cav'];
  dataSource!: MatTableDataSource<any>;

  emetteurs: any[] = [];
  titres: any[] = [];
  selectedEmetteur!: string;
  selectedTitre!: string;
  selectedRadioOption!: string;
  imports!: Import[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private emetteurService: EmetteurService, private titreService: TitreService, private importService: ImportService) { }

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

  OnRadioChange(){
    if(this.selectedRadioOption == "FGO")
    {
      this.importService.getFGO(this.selectedEmetteur, this.selectedTitre).subscribe((data: Import[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.imports = data;
      });
    }
    else if(this.selectedRadioOption == "FCRA")
    {
      this.importService.getFCRA(this.selectedEmetteur, this.selectedTitre).subscribe((data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.imports = data;
      });
    }
  }

  Traiter(){
    if(this.selectedRadioOption == "FCRA")
    {
      this.importService.traiterFCRA(this.selectedEmetteur, this.selectedTitre).subscribe();
    }
    else if(this.selectedRadioOption == "FGO")
    {
      this.importService.traiterFGO(this.selectedEmetteur, this.selectedTitre).subscribe();
    }
  }
}
