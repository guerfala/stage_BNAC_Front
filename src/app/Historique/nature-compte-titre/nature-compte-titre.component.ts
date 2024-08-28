import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NatureCompteTitre } from '../../Models/nature-compte-titre';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component'; // Adjust path as per your project structure
import { NatureCompteTitreService } from '../../Services/nature-compte-titre.service';

@Component({
  selector: 'app-nature-compte-titre',
  templateUrl: './nature-compte-titre.component.html',
  styleUrls: ['./nature-compte-titre.component.css']
})
export class NatureCompteTitreComponent implements OnInit {
  displayedColumns: string[] = ['idNatureCompteTitre', 'libelle', 'codeNatureCompteTitre', 'actions'];
  natureCompteTitres: NatureCompteTitre[] = [];
  filteredNatureCompteTitres: NatureCompteTitre[] = [];
  searchLibelle = '';
  isEdit = false;
  natureCompteTitre: NatureCompteTitre = this.createEmptyNatureCompteTitre();

  constructor(private natureCompteTitreService: NatureCompteTitreService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAllNatureCompteTitres();
  }

  loadAllNatureCompteTitres(): void {
    this.natureCompteTitreService.getAllNatureCompteTitres().subscribe(
      (data: any) => {
        this.natureCompteTitres = data;
        this.filteredNatureCompteTitres = [...this.natureCompteTitres]; // Initialize filtered list
        this.applyFilter(); // Apply initial filter if searchLibelle is not empty
      },
      error => {
        console.error('Error loading Nature Compte Titres:', error);
      }
    );
  }

  addNatureCompteTitre(form: NgForm): void {
    this.natureCompteTitreService.createNatureCompteTitre(this.natureCompteTitre).subscribe(
      (data: any) => {
        this.natureCompteTitres.push(data);
        this.loadAllNatureCompteTitres(); // Reload table after adding
        this.clearForm();
        form.resetForm(); // Reset the form after adding
      },
      error => {
        console.error('Error adding Nature Compte Titre:', error);
      }
    );
  }
  
  updateNatureCompteTitre(form: NgForm): void {
    this.natureCompteTitreService.updateNatureCompteTitre(this.natureCompteTitre.idNatureCompteTitre, this.natureCompteTitre).subscribe(
      (data: any) => {
        // Update existing record in natureCompteTitres
        const index = this.natureCompteTitres.findIndex(item => item.idNatureCompteTitre === data.idNatureCompteTitre);
        if (index !== -1) {
          this.natureCompteTitres[index] = data;
        }
        this.loadAllNatureCompteTitres(); // Reload table after updating
        this.clearForm(); 
        form.resetForm();// Clear the form and reset ngModel bindings
      },
      error => {
        console.error('Error updating Nature Compte Titre:', error);
      }
    );
  }
  
  

  deleteNatureCompteTitre(id: number): void {
    this.natureCompteTitreService.deleteNatureCompteTitre(id).subscribe(
      () => {
        this.loadAllNatureCompteTitres();
      },
      error => {
        console.error('Erreur lors de la suppression de la nature d\'avoir:', error);
      }
    );
  }




  editNatureCompteTitre(selectedNatureCompteTitre: NatureCompteTitre): void {
    this.natureCompteTitre = { ...selectedNatureCompteTitre };
    this.isEdit = true;
  }

  clearForm(): void {
    this.natureCompteTitre = this.createEmptyNatureCompteTitre();
    this.isEdit = false;
  }

  applyFilter(): void {
    const filterValue = this.searchLibelle.toLowerCase();
    if (filterValue.length === 0) {
      this.filteredNatureCompteTitres = [...this.natureCompteTitres]; // Reset to show all when filter is empty
    } else {
      this.filteredNatureCompteTitres = this.natureCompteTitres.filter(natureCompteTitre =>
        natureCompteTitre.libelle.toLowerCase().includes(filterValue)
      );
    }
  }

  clearSearch(): void {
    this.searchLibelle = '';
    this.applyFilter(); // Reset filter to show all Nature Compte Titres
  }

  private createEmptyNatureCompteTitre(): NatureCompteTitre {
    return {
      idNatureCompteTitre: 0,
      libelle: '',
      CodeNatureCompteTitre: ''
    };
  }
  openDeleteConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this Nature Compte Titre?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNatureCompteTitre(id);
      }
    });
  }



}
