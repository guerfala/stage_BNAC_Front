import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImportService } from '../../Services/import.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  importForm: FormGroup;
  emetteurs: { libelleCourt: string }[] = [];

  constructor(private fb: FormBuilder, private importService: ImportService) {
    this.importForm = this.fb.group({
      emetteur: ['', Validators.required],
      date: ['', Validators.required],
      radioOption: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchEmetteurs();
}

fetchEmetteurs(): void {
    this.importService.getEmetteursLibelleCourt().subscribe(data => {
        this.emetteurs = data;
        console.log('Mapped Emetteurs:', this.emetteurs); // Ensure data is fetched
    }, error => {
        console.error('Error fetching emetteurs:', error); // Handle error
    });
}

  onSubmit(): void {
    if (this.importForm.invalid) {
      return;
    }

    const formValue = this.importForm.value;
    console.log('Form submitted:', formValue);

    // Handle form submission logic
  }
}
