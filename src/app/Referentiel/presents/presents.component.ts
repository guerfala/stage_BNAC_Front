import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Presents, PresentsId } from '../../Models/presents';
import { PresentsService } from '../../Services/presents.service';

@Component({
  selector: 'app-presents',
  templateUrl: './presents.component.html',
  styleUrls: ['./presents.component.css']
})
export class PresentsComponent implements OnInit {

  presents: Presents[] = [];
  selectedPresent: Presents | null = null;
  presentForm: FormGroup;

  constructor(private presentsService: PresentsService, private fb: FormBuilder) {
    this.presentForm = this.fb.group({
      idEmetteur: ['', Validators.required],
      IdTypeAssemblee: ['', Validators.required],
      Matricule: ['', Validators.required],
      dateTenue: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.presentsService.getAllPresents().subscribe(data => this.presents = data);
  }

  onSelectPresent(present: Presents): void {
    this.selectedPresent = present;
  }

  onSubmit(): void {
    if (this.presentForm.valid) {
      const present: Presents = this.presentForm.value;
      console.log('Submitting Presents:', present);  // Log the payload
      this.presentsService.createPresents(present).subscribe(newPresent => {
        this.presents.push(newPresent);
        this.presentForm.reset();
        this.selectedPresent = null; // Clear selection after creation
      });
    }
  }
  
  onUpdatePresent(present: Presents): void {
    const id: PresentsId = {
      idEmetteur: present.idEmetteur,
      IdTypeAssemblee: present.IdTypeAssemblee,
      Matricule: present.Matricule,
      IdPresent: present.IdPresent
    };
    this.presentsService.updatePresents(id, present).subscribe(updatedPresent => {
      if (updatedPresent) {
        const index = this.presents.findIndex(p => p.IdPresent === updatedPresent.IdPresent);
        this.presents[index] = updatedPresent;
      }
      this.selectedPresent = null; // Clear selection after update
    });
  }

  onDeletePresent(id: PresentsId): void {
    this.presentsService.deletePresents(id).subscribe(() => {
      const index = this.presents.findIndex(p => p.IdPresent === id.IdPresent);
      if (index !== -1) {
        this.presents.splice(index, 1);
      }
      this.selectedPresent = null; // Clear selection after deletion
    });
  }
}