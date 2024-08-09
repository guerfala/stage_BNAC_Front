import { Component, ViewChild } from '@angular/core';
import { EmetteurService } from '../../Services/emetteur.service';
import { TitreService } from '../../Services/titre.service';
import { ImportService } from '../../Services/import.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FGO } from '../../Models/fgo';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent {

  emetteurs: any[] = [];
  titres: any[] = [];
  selectedEmetteur!: string;
  selectedTitre!: string;
  selectedRadioOption!: string;
  minDate!: Date;
  maxDate!: Date;
  export: FGO[] = [];

  displayedColumnsFGO: string[] = ['CodeBIC', 'CodeParticipant', 'NatureProp', 'Nom', 'Prenom', 'NomArabe', 'CodeNaturePiece', 'NumPiece', 'DateNaissance', 'CategorieInves', 'Secteur', 'Nationalite', 
    'Resident', 'Adresse', 'RefOp', 'DateOp'];
  dataSource!: MatTableDataSource <any>;

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

Export(){
  if(this.selectedRadioOption == "FCRA")
  {
  }
  else if(this.selectedRadioOption == "FGO")
  {

    this.importService.exportFGO(this.selectedEmetteur, this.selectedTitre, this.minDate, this.maxDate)
    .subscribe((blob: Blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = 'FGO.reg';
        link.click();
        window.URL.revokeObjectURL(url);
        console.log("Registry file exported");
    });

  }
}

}
