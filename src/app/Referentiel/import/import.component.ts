import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImportService } from '../../Services/import.service';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { EmetteurService } from '../../Services/emetteur.service';
import { TitreService } from '../../Services/titre.service';
import { Import } from '../../Models/import';
import { Emetteur } from '../../Models/emetteur';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {
  emetteurs: any[] = [];
  titres: any[] = [];
  selectedEmetteur!: string;
  selectedTitre!: string;
  em!: Emetteur;
  selectedType!: string;

  importForm: FormGroup;
  csvData: any[] = [];
  file: File | null = null;
  ExcelData: Import[] = [];
  imported: Import[] = [];

  constructor(private fb: FormBuilder, private importService: ImportService, private http: HttpClient, private emetteurService: EmetteurService, private titreService: TitreService) {
    this.importForm = this.fb.group({
      emetteur: [''],
      titre: [''],
      date: [''],
      radioOption: ['']
    });
  }

  ngOnInit() {
    this.getEmetteurs();
  }

  getEmetteurs() {
    this.emetteurService.getEmetteurList().subscribe(data => {
      this.emetteurs = data;
    });
  }

  onEmetteurChange(event: any): void {
    this.selectedEmetteur = event.value;
    this.titreService.getTitresByEmetteur(this.selectedEmetteur).subscribe(data => {
      this.titres = data;
    });
  }

  onTitreChange(event: any) {
    this.selectedTitre = event.value;
  }

  onSubmit() {
    if (this.selectedType == 'FGO')
    {
      this.imported.forEach(element => {
        this.importService.saveImportDataFGO(element, this.selectedEmetteur).subscribe(data => {
          console.log(data);
        }, error => {
          console.error("Error importing data:", error);
        });
      });
    }
    else if (this.selectedType == 'FCRA')
    {
      this.imported.forEach(element => {
        this.importService.saveImportDataFCRA(element, this.selectedEmetteur).subscribe(data => {
          console.log(data);
        }, error => {
          console.error("Error importing data:", error);
        });
      });
    }
  }

  ReadFCRA(event: any): void {
      const file = event.target.files[0];
      if (file) {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
  
          fileReader.onload = (e) => {
              const workBook = XLSX.read(fileReader.result as ArrayBuffer, { type: 'array' });
              const sheetNames = workBook.SheetNames;
              const excelData: any[] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
  
              this.imported = excelData.map(row => ({
                  adresse: row['Adresse'],
                  cave: '',
                  cavr: '', 
                  client: row['Nom du client'],
                  code_operation: '', 
                  codesisin: row['ISIN'],
                  date_bourse: this.formatDate(row['Date comptable']),
                  date_de_naissance: this.formatDate(row['Date de Naissance']),
                  date_import: new Date(), // Assuming the import date is now
                  date_operation: new Date(), 
                  identifiant: row['Identifiant National'],
                  libelle: '', 
                  nationalite: row['Nationalité'],
                  nature_client: row['TYPEe'], 
                  nature_compte: row['Restrictions'], 
                  nature_comptee: '', 
                  nature_compter: '', 
                  nature_id: row['Nature de l’identification'],
                  num_contrat: '', 
                  quantite: 0, // Assuming quantity is not in your data
                  sens_comptable: '', 
                  solde: row['Solde'],
                  statut: '', 
                  tc: row['Participant'], 
                  tce: '', 
                  tcr: '', 
                  titre: this.selectedTitre,
                  treated: true, 
                  type_client: row['Type du client'],
                  type_de_residence: row['Type de résidence'],
                  type_import: '', 
                  cav: row['Catégorie d\'avoir'], 
                  emetteur: null // Assuming emetteur ID needs to be set separately
              }));
  
              console.log(this.imported);
          };
      }
  }

  ReadFGO(event: any): void {
    const file = event.target.files[0];
      if (file) {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(file);
  
          fileReader.onload = (e) => {
              const workBook = XLSX.read(fileReader.result as ArrayBuffer, { type: 'array' });
              const sheetNames = workBook.SheetNames;
              const excelData: any[] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

            this.imported = excelData.map(row => ({
                adresse: row['Adresse'],
                cave: row['CAV'],
                cavr: row['CAV'], 
                client: row['Client'],
                code_operation: row['C.OPE'], 
                codesisin: row['ISIN'],
                date_bourse: this.formatDate(row['Date dénouement']),
                date_de_naissance: new Date(),
                date_import: new Date(), // Assuming the import date is now
                date_operation: this.formatDate(row['Date opération']), 
                identifiant: row['Identifiant'],
                libelle: row['L.OPE'], 
                nationalite: row['Nationalité'],
                nature_client: '', 
                nature_compte: '', 
                nature_comptee: row['Sous compte'], 
                nature_compter: row['Sous compte'], 
                nature_id: row['Nat.Identifiant'],
                num_contrat: row['Contract ID'], 
                quantite: row['Quantité'], // Assuming quantity is not in your data
                sens_comptable: '', 
                solde: row['Solde'],
                statut: row['Statut'], 
                tc: '', 
                tce: row['livreur'], 
                tcr: row['livré'], 
                titre: this.selectedTitre,
                treated: true, 
                type_client: row['TYPE'],
                type_de_residence: '',
                type_import: '', 
                cav: '', 
                emetteur: null // Assuming emetteur ID needs to be set separately
            }));

            console.log(this.imported);
        };
    }
  }


  onRadioOptionChange() {
    this.importForm.get('radioOption')?.valueChanges.subscribe(value => {
      this.selectedType = value;
      console.log('Selected Type:', this.selectedType); // Ensure the selectedType is logged
    });
  }  

  formatDate(dateString: any): Date {
    if (typeof dateString !== 'string') {
        console.error('Invalid date string:', dateString);
        return new Date(); // Return a default date or handle as needed
    }

    const parts = dateString.split('/');
    if (parts.length !== 3) {
        console.error('Date string format is incorrect:', dateString);
        return new Date(); // Return a default date or handle as needed
    }

    const [day, month, year] = parts;
    return new Date(`${year}-${month}-${day}`);
  }

  
  


}
