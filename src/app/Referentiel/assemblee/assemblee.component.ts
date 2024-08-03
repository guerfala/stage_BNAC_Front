import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AssembleeService } from '../../Services/assemblee.service';
import { EmetteurService } from '../../Services/emetteur.service';
import { Assemblee } from '../../Models/assemblee';
import { TypeAssemblee } from '../../Models/type-assemblee';  
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { TypeAssembleeService } from '../../Services/type-assemblee.service';

@Component({
  selector: 'app-assemblee',
  templateUrl: './assemblee.component.html',
  styleUrls: ['./assemblee.component.css']
})
export class AssembleeComponent implements OnInit {
  typeAssemblees: TypeAssemblee[] = [];

  assemblee: FormGroup;
  isEditMode: boolean = false;
  assembleeId: number | undefined;
  assemblees: Assemblee[] = [];
  emetteurs: string[] = [];
  filteredAssemblees: Assemblee[] = [];
  searchLibelle = '';

  displayedColumns: string[] = ['idAssemblee', 'emetteur','typeAssemblee','dateTenue','lieu', 'libelle',  'actions'];

  constructor(
    private fb: FormBuilder,
    private assembleeService: AssembleeService,
    private emetteurService: EmetteurService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private typeAssembleeService: TypeAssembleeService

  ) {
    this.assemblee = this.fb.group({
      libelle: ['', Validators.required],
      lieu: ['', Validators.required],
      dateTenue: ['', Validators.required],
      idTypeAssemblee: ['', Validators.required],
      idEmetteur: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadAssemblees();
    this.loadEmetteurs();
    this.loadTypeAssemblees();
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.assembleeId = +id;
        this.assembleeService.getAssembleeById(this.assembleeId).subscribe(data => {
          this.assemblee.patchValue(data);
        });
      }
    });
  }

  loadAssemblees(): void {
    this.assembleeService.getAllAssemblees().subscribe(data => {
      this.assemblees = data;
      this.filteredAssemblees = [...this.assemblees];
    }, error => {
      console.error('Error loading Assemblees:', error);
    });
  }

  loadEmetteurs(): void {
    this.emetteurService.getAllEmetteurLibelleCourt().subscribe(data => {
      this.emetteurs = data;
    }, error => {
      console.error('Error loading Emetteurs:', error);
    });
  }

  loadTypeAssemblees(): void {
    this.typeAssembleeService.getAllTypeAssemblees().subscribe(
      data => {
        console.log('TypeAssemblees:', data); // Debug output
        this.typeAssemblees = data;
      },
      error => {
        console.error('Error loading TypeAssemblees:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.assemblee.invalid) {
      return;
    }

    if (this.isEditMode && this.assembleeId !== undefined) {
      this.assembleeService.updateAssemblee(this.assembleeId, this.assemblee.value).subscribe(() => {
        this.router.navigate(['/assemblees']);
      });
    } else {
      this.assembleeService.createAssemblee(this.assemblee.value).subscribe(() => {
        this.router.navigate(['/assemblees']);
      });
    }
  }

  editAssemblee(selectedAssemblee: Assemblee): void {
    this.assemblee.patchValue(selectedAssemblee);
    this.isEditMode = true;
    this.assembleeId = selectedAssemblee.idAssemblee !== undefined ? selectedAssemblee.idAssemblee : 0;
  }

  deleteAssemblee(id: number): void {
    this.assembleeService.deleteAssemblee(id).subscribe(() => {
      this.loadAssemblees();
    }, error => {
      console.error('Error deleting Assemblee:', error);
    });
  }

  confirmDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this assemblee?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteAssemblee(id);
      }
    });
  }

  filterAssemblees(): void {
    this.filteredAssemblees = this.assemblees.filter(assemblee =>
      assemblee.libelle.toLowerCase().includes(this.searchLibelle.toLowerCase())
    );
  }
}
