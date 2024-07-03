import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImportService } from '../../Services/import.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  importForm: FormGroup;
  emetteurs: string[] = [];
  titres: string[] = [];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private importService: ImportService) {
    this.importForm = this.fb.group({
      emetteur: [''],
      titre: [''],
      date: [''],
      radioOption: ['']
    });
  }

  ngOnInit() {
    this.importService.getEmetteurLibelleCourts().subscribe(data => {
      this.emetteurs = data;
    });
  }

  onEmetteurChange(emetteur: string) {
    this.importService.getTitreLibelleCourtsByEmetteurId(emetteur).subscribe(data => {
      this.titres = data;
    });
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    formData.append('emetteur', this.importForm.get('emetteur')?.value);
    formData.append('titre', this.importForm.get('titre')?.value);
    formData.append('date', this.importForm.get('date')?.value);
    formData.append('radioOption', this.importForm.get('radioOption')?.value);

    this.importService.uploadFile(formData).subscribe(response => {
      console.log('File uploaded successfully');
    });
  }
}
