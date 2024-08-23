import { Component, OnInit, ViewChild } from '@angular/core';
import { Titre } from '../../Models/titre';
import { TitreService } from '../../Services/titre.service';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-titre',
  templateUrl: './titre.component.html',
  styleUrls: ['./titre.component.css']
})
export class TitreComponent implements OnInit {
  titres: Titre[] = [];
  titre: Titre = this.initializeTitre();
  filteredTitres: MatTableDataSource<Titre> = new MatTableDataSource();
  searchForm: FormGroup;
  isEdit = false;
  displayedColumns: string[] = [
    'IdTitre', 'LibelleCourt', 'LibelleLong', 'IdCategorieTitre',
    'Nominal', 'Nombre', 'Pourcentage', 'CodeStico', 'CodeSISIN',
    'MatriculeDroitNonConverti', 'MatriculeDroitConverti', 'IdEmetteur', 'actions'
  ];
  searchTerm = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  ngAfterViewInit(): void {
    this.filteredTitres.paginator = this.paginator;
  }

  initializeTitre(): Titre {
    return {
      IdTitre: '',
      LibelleCourt: '',
      LibelleLong: '',
      IdCategorieTitre: '',
      Nominal: 0,
      Nombre: 0,
      Pourcentage: 0,
      CodeStico: '',
      CodeSISIN: '',
      MatriculeDroitNonConverti: '',
      MatriculeDroitConverti: '',
      IdEmetteur:''
    };
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
        this.filteredTitres.data = this.titres;
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

  editTitre(titre: Titre) {
    this.titre = { ...titre };
    this.isEdit = true;
  }

  updateTitre(form: NgForm): void {
    this.titreService.updateTitre(this.titre.IdTitre, this.titre).subscribe(
      (data: any) => {
        const index = this.titres.findIndex(item => item.IdTitre === data.IdTitre);
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
    this.titre = this.initializeTitre();
    this.isEdit = false;
  }

  deleteTitre(id: string): void {
    this.titreService.deleteTitre(id).subscribe(() => {
      this.getAllTitres();
    });
  }

  applyFilter(): void {
    const filterValue = this.searchTerm.toLowerCase().trim();
  
    this.filteredTitres.data = this.titres.filter(titre => {
      const libelleLong = titre.LibelleLong ? titre.LibelleLong.toLowerCase() : '';
      const libelleCourt = titre.LibelleCourt ? titre.LibelleCourt.toLowerCase() : '';
      const idTitre = titre.IdTitre ? titre.IdTitre.toLowerCase() : '';
      const idEmetteur = titre.IdEmetteur ? titre.IdEmetteur.toLowerCase() : '';
  
      return (
        libelleLong.includes(filterValue) ||
        libelleCourt.includes(filterValue) ||
        idTitre.includes(filterValue) ||
        idEmetteur.includes(filterValue)
      );
    });
  
    // Reset pagination to the first page after filtering
    if (this.filteredTitres.paginator) {
      this.filteredTitres.paginator.firstPage();
    }
  }
  
}
