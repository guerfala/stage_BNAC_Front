import { Component, OnInit } from '@angular/core';
import { TeneurCompteService } from '../../Services/teneur-compte.service';
import { TeneurCompte } from '../../Models/teneur-compte';


@Component({
  selector: 'app-teneur-compte',
  templateUrl: './teneur-compte.component.html',
  styleUrls: ['./teneur-compte.component.css']
})
export class TeneurCompteComponent implements OnInit {
  displayedColumns: string[] = [
    'idTC',
    'libelleCourt',
    'libelleLong',
    'tel',
    'fax',
    'adresse',
    'codePostal',
    'ville',
    'email',
    'contact',
    'fonctionContact',
    'premierResponsable',
    'fonctionPremierResponsable',
    'civilitePremierResponsable',
    'idEmetteur',
    'codeIAA',
    'actions'
  ];
  
  teneurComptes: TeneurCompte[] = [];
  teneurCompte: TeneurCompte = this.createEmptyTeneurCompte();
  isEdit = false;

  constructor(private teneurCompteService: TeneurCompteService) {}

  ngOnInit(): void {
    this.loadTeneurComptes();
  }

  loadTeneurComptes(): void {
    this.teneurCompteService.getAllTeneurCompte().subscribe(data => {
      this.teneurComptes = data;
    });
  }

  addTeneurCompte(): void {
    this.teneurCompteService.addTeneurCompte(this.teneurCompte).subscribe(() => {
      this.loadTeneurComptes();
      this.teneurCompte = this.createEmptyTeneurCompte();
    });
  }

  editTeneurCompte(teneurCompte: TeneurCompte): void {
    this.teneurCompte = { ...teneurCompte };
    this.isEdit = true;
  }

  updateTeneurCompte(): void {
    this.teneurCompteService.updateTeneurCompte(this.teneurCompte.idTC, this.teneurCompte).subscribe(() => {
      this.loadTeneurComptes();
      this.teneurCompte = this.createEmptyTeneurCompte();
      this.isEdit = false;
    });
  }

  deleteTeneurCompte(id: string): void {
    this.teneurCompteService.deleteTeneurCompte(id).subscribe(() => {
      this.loadTeneurComptes();
    });
  }

  private createEmptyTeneurCompte(): TeneurCompte {
    return {
      idTC: '',
      libelleCourt: '',
      LibelleLong: '',
      Tel: '',
      Fax: '',
      Adresse: '',
      CodePostal: '',
      Ville: '',
      Email: '',
      Contact: '',
      FonctionContact: '',
      PremierResponsable: '',
      FonctionPremierResponsable: '',
      CivilitePremierResponsable: '',
      IdEmetteur: '',
      CodeIAA: ''
    };
  }
}
