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

  onFileSelected(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  onSubmit() {
    this.imported.forEach(element => {
      this.importService.saveImportData(element, this.selectedEmetteur).subscribe(data => {
        console.log(data);
      }, error => {
        console.error("Error importing data:", error);
      });
    });
  }

  /*ReadExcel(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (e) => {
        const workBook = XLSX.read(fileReader.result as string, { type: 'binary' });
        const sheetNames = workBook.SheetNames;
        this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

        this.ExcelData.forEach((row: any) => {
          let imp = new Import();
          imp.Client = row['Nom du client'];
          imp.TypeClient = row['TYPEe'];
          imp.Nationalite = row['Nationalité'];
          imp.Nature_id = row['Nature de l’identification'];
          imp.Identifiant = row['Identifiant National'];
          imp.CAVE = row['CAVE'];
          imp.Solde = row['Solde'];
          imp.CodeSISIN = row['CodeSISIN'];
          imp.Titre = this.selectedTitre;
          imp.TypeDeResidence = row['TypeDeResidence'];
          imp.DateDeNaissance = new Date(row['DateDeNaissance']);
          imp.Adresse = row['Adresse'];
          imp.DateBourse = new Date(row['DateBourse']);
          imp.emetteur = null;
          this.imported.push(imp);
        });
        console.log(this.imported);
      };
    }
  }*/

    ReadExcel(event: any): void {
      const file = event.target.files[0];
      if (file) {
          const fileReader = new FileReader();
          fileReader.readAsBinaryString(file);
  
          fileReader.onload = (e) => {
              const workBook = XLSX.read(fileReader.result as string, { type: 'binary' });
              const sheetNames = workBook.SheetNames;
              const excelData: any[] = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);
  
              this.imported = excelData.map(row => ({
                  adresse: row['Adresse'],
                  cave: row['CAVE'],
                  cavr: '', // Set this based on your data or leave empty
                  client: row['Nom du client'],
                  code_operation: '', // Set this based on your data or leave empty
                  codesisin: row['CodeSISIN'],
                  date_bourse: new Date(row['DateBourse']),
                  date_de_naissance: new Date(row['DateDeNaissance']),
                  date_import: new Date(), // Assuming the import date is now
                  date_operation: new Date(), // Set this based on your data or leave empty
                  identifiant: row['Identifiant National'],
                  libelle: '', // Set this based on your data or leave empty
                  nationalite: row['Nationalité'],
                  nature_client: '', // Set this based on your data or leave empty
                  nature_compte: '', // Set this based on your data or leave empty
                  nature_comptee: '', // Set this based on your data or leave empty
                  nature_compter: '', // Set this based on your data or leave empty
                  nature_id: row['Nature de l’identification'],
                  num_contrat: '', // Set this based on your data or leave empty
                  quantite: 0, // Assuming quantity is not in your data
                  sens_comptable: 0, // Set this based on your data or leave empty
                  solde: row['Solde'],
                  statut: '', // Set this based on your data or leave empty
                  tc: '', // Set this based on your data or leave empty
                  tce: '', // Set this based on your data or leave empty
                  tcr: '', // Set this based on your data or leave empty
                  titre: this.selectedTitre,
                  treated: true, // Set this based on your data or leave empty
                  type_client: row['TYPEe'],
                  type_de_residence: row['TypeDeResidence'],
                  type_import: '', // Set this based on your data or leave empty
                  cav: 0, // Set this based on your data or leave empty
                  emetteur: null // Assuming emetteur ID needs to be set separately
              }));
  
              console.log(this.imported);
          };
      }
  }
  


}
