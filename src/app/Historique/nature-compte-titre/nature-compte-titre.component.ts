import { Component, OnInit } from '@angular/core';
import { NatureCompteTitreService } from '../../Services/nature-compte-titre.service';

@Component({
  selector: 'app-nature-compte-titre',
  templateUrl: './nature-compte-titre.component.html',
  styleUrls: ['./nature-compte-titre.component.css']
})
export class NatureCompteTitreComponent implements OnInit {
  natureCompteTitres: any[] = [];
  natureCompteTitre: any = {};
  isEdit: boolean = false;

  displayedColumns: string[] = ['IdNatureCompteTitre', 'Libelle', 'CodeNatureCompteTitre', 'Actions'];

  constructor(private natureCompteTitreService: NatureCompteTitreService) { }

  ngOnInit(): void {
    this.loadAllNatureCompteTitres();
  }

  loadAllNatureCompteTitres(): void {
    this.natureCompteTitreService.getAllNatureCompteTitres().subscribe(data => {
      this.natureCompteTitre = data;
    });
  }
  addNatureCompteTitre() {
    this.natureCompteTitreService.createNatureCompteTitre(this.natureCompteTitre).subscribe(
      (data: any) => {
        this.natureCompteTitres.push(data);
        this.clearForm();
      },
      error => {
        console.log('Error adding nature compte titre: ', error);
      }
    );
  }

  updateNatureCompteTitre() {
    this.natureCompteTitreService.updateNatureCompteTitre(this.natureCompteTitre.IdNatureCompteTitre, this.natureCompteTitre).subscribe(
      (data: any) => {
        // Update existing record in natureCompteTitres
        const index = this.natureCompteTitres.findIndex(item => item.IdNatureCompteTitre === data.IdNatureCompteTitre);
        if (index !== -1) {
          this.natureCompteTitres[index] = data;
        }
        this.clearForm();
      },
      error => {
        console.log('Error updating nature compte titre: ', error);
      }
    );
  }

  editNatureCompteTitre(natureCompteTitre: any) {
    this.isEdit = true;
    this.natureCompteTitre = { ...natureCompteTitre }; // create a copy
  }

  deleteNatureCompteTitre(id: number) {
    this.natureCompteTitreService.deleteNatureCompteTitre(id).subscribe(
      () => {
        this.natureCompteTitres = this.natureCompteTitres.filter(item => item.IdNatureCompteTitre !== id);
      },
      error => {
        console.log('Error deleting nature compte titre: ', error);
      }
    );
  }

  clearForm() {
    this.natureCompteTitre = {};
    this.isEdit = false;
  }
}
