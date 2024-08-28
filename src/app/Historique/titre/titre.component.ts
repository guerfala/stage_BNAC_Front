import { Component, OnInit } from '@angular/core';
import { Titre } from '../../Models/titre';
import { TitreService } from '../../Services/titre.service';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-titre',
  templateUrl: './titre.component.html',
  styleUrls: ['./titre.component.css']
})
export class TitreComponent implements OnInit {
  titres: Titre[] = [];
  titre!: Titre;
  filteredTitres: MatTableDataSource<Titre> = new MatTableDataSource();
  searchForm: FormGroup;
  isEdit = false;
  displayedColumns: string[] = [
    'IdTitre', 'LibelleCourt', 'LibelleLong', 'IdCategorieTitre',
    'Nominal', 'Nombre', 'Pourcentage', 'CodeStico', 'CodeSISIN',
    'MatriculeDroitNonConverti', 'MatriculeDroitConverti', 'IdEmetteur', 'actions'
  ];
  searchTerm = '';

  constructor(private titreService: TitreService, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      libelleLong: [''],
      libelleCourt: [''],
      idTitre: [''],
      idEmetteur: ['']
    });
  }

  ngOnInit(): void {
    this.getAllTitres();

    this.searchForm.valueChanges.subscribe(value => {
      this.applyFilter();
    });
  }
 
  performSearch(): void {
    this.applyFilter();
  }

  clearSearch(): void {
    this.searchForm.reset();
    this.filteredTitres.data = this.titres;
  }


  getAllTitres(): void {
    this.titreService.getAllTitres().subscribe(
      (data: Titre[]) => {
        this.titres = data; 
        console.log('Titres récupérés : ', this.titres);
      },
      error => {
        console.error('Erreur lors de la récupération des titres : ', error); 
      }
    );
  }

  addTitre(form: NgForm): void {
    this.titreService.addTitre(this.titre).subscribe(
      (data: any) => {
        this.titres.push(data);
        this.getAllTitres(); // Reload table after adding
        this.clearForm();
        form.resetForm(); // Reset the form after adding
      },
      error => {
        console.error('Error adding Nature Compte Titre:', error);
      }
    );
  }


  editTitre(titre:  Titre) {
    this.titre = { ...titre };
    this.isEdit = true;
  }

 /* updateTitre(): void {
    this.titreService.updateTitre(this.titre.IdTitre, this.titre).subscribe(() => {
      this.getAllTitres();
      this.isEdit = false;
      this.titre = this.initializeTitre();
    });
  }*/

  updateTitre(form:NgForm):void {
    this.titreService.updateTitre(this.titre.idTitre, this.titre).subscribe(
      (data: any) => {
        const index = this.titres.findIndex(item => item.idTitre === data.IdTitre);
        if (index !== -1) {
          this.titres[index] = data;
        }
        this.getAllTitres();
        this.clearForm();
        form.resetForm();
       
      },
      error => {
        console.log('Error updating titre: ', error);
      }
    );
  }

  clearForm(): void {
    this.isEdit = false;
  }

  deleteTitre(id: string): void {
    this.titreService.deleteTitre(id).subscribe(() => {
      this.getAllTitres();
    });
  }

 /* onEmetteurIdChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (!this.titre.emetteur) {
      this.titre.emetteur = { IdEmetteur: inputElement.value };
    } else {
      this.titre.emetteur.IdEmetteur = inputElement.value;
    }
  }*/
    applyFilter(): void {
      const filterValue = this.searchTerm.toLowerCase();
      if (filterValue.length === 0) {
        this.getAllTitres(); // Reset to show all when filter is empty
      } else {
        this.titres = this.titres.filter(titre =>
          titre.libelleLong.toLowerCase().startsWith(filterValue) ||
          titre.libelleCourt.toLowerCase().startsWith(filterValue) ||
          titre.idTitre.toLowerCase().startsWith(filterValue) ||
          titre.emetteur.idEmetteur.toLowerCase().startsWith(filterValue)
        );
      }
    }


  }

