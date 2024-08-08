import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AssembleeService } from '../../Services/assemblee.service';
import { EmetteurService } from '../../Services/emetteur.service';
import { TypeAssembleeService } from '../../Services/type-assemblee.service';
import { Assemblee } from '../../Models/assemblee';
import { Emetteur } from '../../Models/emetteur';
import { TypeAssemblee } from '../../Models/type-assemblee';
import { Observable, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-assemblee',
  templateUrl: './assemblee.component.html',
  styleUrls: ['./assemblee.component.css']
})
export class AssembleeComponent implements OnInit {
  assembleeForm: FormGroup;
  assemblees: Assemblee[] = [];
  emetteurs: Emetteur[] = [];
  typeAssemblees: TypeAssemblee[] = [];
  filteredEmetteurs$: Observable<Emetteur[]> = of([]);
  emetteurCtrl = new FormControl();

  isEdit = false;
  currentAssembleeId?: number;
  displayedColumns: string[] = ['typeAssemblee', 'emetteur', 'dateTenue', 'lieu', 'libelle', 'actions'];

  constructor(
    private fb: FormBuilder,
    private assembleeService: AssembleeService,
    private emetteurService: EmetteurService,
    private typeAssembleeService: TypeAssembleeService,
    private cdRef: ChangeDetectorRef
  ) {
    this.assembleeForm = this.fb.group({
      typeAssemblee: [''],
      emetteur: [''],
      dateTenue: [''],
      lieu: [''],
      libelle: ['']
    });
  }

  ngOnInit(): void {
    this.loadAssemblees();
    this.loadTypeAssemblees();
    this.setupEmetteurAutoSuggestion();
  }

  loadAssemblees(): void {
    this.assembleeService.getAllAssemblees().subscribe(
      data => this.assemblees = data,
      error => console.error('Error loading assemblees', error)
    );
  }

  loadTypeAssemblees(): void {
    this.typeAssembleeService.getAllTypeAssemblees().subscribe(
      data => this.typeAssemblees = data,
      error => console.error('Error loading type assemblees', error)
    );
  }

  setupEmetteurAutoSuggestion(): void {
    this.filteredEmetteurs$ = this.emetteurCtrl.valueChanges.pipe(
      startWith(''),
      switchMap(query => this.emetteurService.getAllEmetteurs(query))
    );
  }

  selectEmetteur(emetteur: Emetteur): void {
    console.log('Selected Emetteur:', emetteur);
    this.assembleeForm.patchValue({
      emetteur: emetteur.idEmetteur
    });
  }

  displayEmetteur(emetteur: Emetteur): string {
    return emetteur ? emetteur.LibelleCourt : '';
  }

  saveAssemblee(): void {
    if (this.assembleeForm.valid) {
      const assemblee: Assemblee = this.assembleeForm.value;
      console.log('Assemblee payload:', assemblee);

      if (this.isEdit && this.currentAssembleeId !== undefined) {
        this.assembleeService.updateAssemblee(this.currentAssembleeId, assemblee).subscribe(() => {
          this.loadAssemblees();
          this.isEdit = false;
          this.assembleeForm.reset();
        });
      } else {
        this.assembleeService.createAssemblee(assemblee).subscribe(() => {
          this.loadAssemblees();
          this.assembleeForm.reset();
        });
      }
    }
  }

  editAssemblee(assemblee: Assemblee): void {
    this.isEdit = true;
    this.currentAssembleeId = assemblee.idAssemblee;
    this.assembleeForm.patchValue(assemblee);
  }

  deleteAssemblee(id: number): void {
    this.assembleeService.deleteAssemblee(id).subscribe(() => {
      this.loadAssemblees();
    });
  }
}
