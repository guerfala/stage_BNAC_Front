import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImportService } from '../../Services/import.service';
import { HttpClient } from '@angular/common/http';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  importForm: FormGroup;
  emetteurs: string[] = [];
  titres: string[] = [];
  csvData: any[] = [];
  file: File | null = null;
  selectedEmetteur: string = '';
  selectedTitre: string = '';

  constructor(private fb: FormBuilder, private importService: ImportService,private http: HttpClient) {
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

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('file', this.file!, this.file!.name);
    formData.append('emetteur', this.selectedEmetteur);
    formData.append('titre', this.selectedTitre);

    this.importService.uploadFile(formData).subscribe(response => {
      console.log(response);
    }, error => {
      console.error('Error uploading file:', error);
    });
  }
  
}
