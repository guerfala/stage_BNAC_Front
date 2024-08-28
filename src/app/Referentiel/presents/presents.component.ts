import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Presents } from '../../Models/presents';
import { PresentsService } from '../../Services/presents.service';

@Component({
  selector: 'app-presents',
  templateUrl: './presents.component.html',
  styleUrls: ['./presents.component.css']
})
export class PresentsComponent implements OnInit {
  presentsForm: FormGroup;
  presents: Presents[] = [];
  filteredPresents: Presents[] = [];
  searchFilter: string = '';
  isEditMode: boolean = false;

  displayedColumns: string[] = ['matricule', 'emetteur', 'typeAssemblee', 'solde', 'typePresence', 'actions'];

  constructor(private fb: FormBuilder, private presentsService: PresentsService) {
    this.presentsForm = this.fb.group({
      matricule: [''],
      emetteur: [''],
      typeAssemblee: [''],
      solde: [''],
      typePresence: ['']
    });
  }

  ngOnInit(): void {
    this.loadPresents();
  }

  loadPresents(): void {
    this.presentsService.getAllPresents().subscribe(data => {
      this.presents = data;
      this.filteredPresents = data;
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      // Update logic
    } else {
      this.presentsService.addPresents(this.presentsForm.value).subscribe(() => {
        this.loadPresents();
        this.presentsForm.reset();
      });
    }
  }

  deletePresents(presentsId: any): void {
    this.presentsService.deletePresents(presentsId).subscribe(() => {
      this.loadPresents();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filteredPresents = this.presents.filter(p => p.matricule.toLowerCase().includes(filterValue.toLowerCase()));
  }

  editPresents(presents: Presents): void {
    this.isEditMode = true;
    this.presentsForm.patchValue(presents);
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.presentsForm.reset();
  }
}
