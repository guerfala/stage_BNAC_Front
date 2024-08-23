import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'; // Assurez-vous que NgForm est importé depuis @angular/forms
import { NatureAvoirService } from '../../Services/nature-avoir.service';
import { NatureAvoir } from '../../Models/nature-avoir';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component'; // Adjust the path as per your project structure
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-nature-avoir',
  templateUrl: './nature-avoir.component.html',
  styleUrls: ['./nature-avoir.component.css']
})
export class NatureAvoirComponent implements OnInit {
  displayedColumns: string[] = ['idNatureAvoirs', 'libelle', 'codeCategorieAvoir', 'actions'];
  natureAvoirs: NatureAvoir[] = [];
  natureAvoir: NatureAvoir = this.createEmptyNatureAvoir();
  filteredNatureAvoirs: NatureAvoir[] = [];
  searchLibelle = '';

  isEdit = false;

  constructor(private natureAvoirService: NatureAvoirService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadNatureAvoirs();
  }

  loadNatureAvoirs(): void {
    this.natureAvoirService.getAllNatureAvoirs().subscribe(data => {
      this.natureAvoirs = data;
      this.filteredNatureAvoirs = [...this.natureAvoirs]; // Initialize filtered list
    }, error => {
      console.error('Error loading Nature Avoirs:', error);
    });
  }

  addNatureAvoir(form: NgForm): void {
    const payload = { ...this.natureAvoir };
    console.log('Payload:', payload); // Log du payload
    this.natureAvoirService.addNatureAvoir(payload).subscribe(() => {
      this.loadNatureAvoirs();
      this.natureAvoir = this.createEmptyNatureAvoir();
      form.resetForm(); // Réinitialiser le formulaire après l'ajout
    }, error => {
      console.error('Erreur lors de l\'ajout de la nature d\'avoir:', error);
    });
  }

  editNatureAvoir(selectedNatureAvoir: NatureAvoir): void {
    console.log('Selected Nature Avoir for edit:', selectedNatureAvoir);
    this.natureAvoir = { ...selectedNatureAvoir };
    this.isEdit = true;
  }

  updateNatureAvoir(): void {
    if (this.natureAvoir.idNatureAvoirs !== undefined) {
      this.natureAvoirService.updateNatureAvoir(this.natureAvoir.idNatureAvoirs, this.natureAvoir).subscribe(() => {
        this.loadNatureAvoirs();
        this.natureAvoir = this.createEmptyNatureAvoir();
        this.isEdit = false;
      }, error => {
        console.error('Erreur lors de la mise à jour de la nature d\'avoir:', error);
      });
    } else {
      console.error('ID de Nature Avoir non défini');
    }
  }

  deleteNatureAvoir(id: number): void {
  this.natureAvoirService.deleteNatureAvoir(id).subscribe(
    () => {
      this.loadNatureAvoirs();
    },
    error => {
      console.error('Erreur lors de la suppression de la nature d\'avoir:', error);
    }
  );
}
  private createEmptyNatureAvoir(): NatureAvoir {
    return {
      idNatureAvoirs: 0,
      libelle: '',
      codeCategorieAvoir: ''
    };
  }
  resetForm(form: NgForm): void {
    form.resetForm();
    this.natureAvoir = this.createEmptyNatureAvoir();
    this.isEdit = false;
  }
  openDeleteConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cette nature d\'avoir?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteNatureAvoir(id);
      }
    });
  }

  applyFilter(): void {
    const filterValue = this.searchLibelle.toLowerCase();
    if (filterValue.length === 0) {
      this.filteredNatureAvoirs = [...this.natureAvoirs]; // Reset to show all when filter is empty
    } else {
      this.filteredNatureAvoirs = this.natureAvoirs.filter(natureAvoir =>
        natureAvoir.libelle.toLowerCase().startsWith(filterValue)
      );
    }
  }

  clearSearch(): void {
    this.searchLibelle = '';
    this.applyFilter(); // Reset filter to show all Nature Avoirs
  }
}

