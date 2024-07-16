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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        const csv = reader.result as string;
        Papa.parse(csv, {
          header: true,
          complete: (result) => {
            this.csvData = result.data;
          }
        });
      };
    }
  }


  onSubmit() {
    const emetteur = this.importForm.value.emetteur;
    const titre = this.importForm.value.titre;
    console.log('Selected Emetteur:', emetteur);
    console.log('Selected Titre:', titre);
    const importData = this.csvData.map(row => ({

      Adresse: row['Adresse'],
     CAV:["Catégorie d'avoir"],
      CAVR:'',
      Client: row['Nom du client'], 
      CodeOperation:'',
      Codesisin: row['ISIN'],
      DateBourse:'2024-07-02',
      DateDeNaissance: ['Date de Naissance'],
      DateImport:'2024-07-02',
      DateOperation:'2024-07-02',
      Identifiant: row['Identifiant National'],
      Libelle: '',
      Nationalite: row['Nationalité'],
      NatureClient:row['TYPEe'],
      NatureCompte: row['Restrictions'],
      Nature_CompteE:'',
      Nature_CompteR:'',
      Nature_id: row["Nature de l'identification"],
      NumContrat:'',
      Quantite:0,
      SensComptable:0,
      Solde : row['Solde'],
      Statut:'FINAL',
      TC:'',
      TCE:'',
      TCR:'',
      Titre: titre,
      Treated:0,
      TypeClient: row['Participant'],
      TypeDeResidence: row['Type de résidence'],
      TypeImport:'FCRA',
      CAVE: '',
      emetteur: 'SOMOCER', // Map to selected emetteur
    
    }));

    console.log('Import Data:', importData);

    this.http.post('http://localhost:8081/bnac/import', importData).subscribe(
      (response: any) => {
        console.log('Data imported successfully', response);
        // Optionally handle success response here
      },
      (error) => {
        console.error('Error importing data:', error);
        // Handle error response here
      }
    );
  }     
}
