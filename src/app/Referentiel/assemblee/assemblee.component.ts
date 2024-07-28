import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssembleeService } from '../../Services/assemblee.service';
import { Assemblee } from '../../Models/assemblee';

@Component({
  selector: 'app-assemblee',
  templateUrl: './assemblee.component.html',
  styleUrls: ['./assemblee.component.css']
})
export class AssembleeComponent implements OnInit {
  assemblee: FormGroup;
  isEditMode: boolean = false;
  assembleeId: number;

  constructor(
    private fb: FormBuilder,
    private assembleeService: AssembleeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.assemblee = this.fb.group({
      libelle: ['', Validators.required],
      lieu: ['', Validators.required],
      dateTenue: ['', Validators.required],
      typeAssemblee: this.fb.group({
        idTypeAssemblee: ['', Validators.required]
      }),
      emetteur: this.fb.group({
        idEmetteur: ['', Validators.required]
      })
    });

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

  onSubmit(): void {
    if (this.assemblee.invalid) {
      return;
    }

    if (this.isEditMode) {
      this.assembleeService.updateAssemblee(this.assembleeId, this.assemblee.value).subscribe(() => {
        this.router.navigate(['/assemblees']);
      });
    } else {
      this.assembleeService.createAssemblee(this.assemblee.value).subscribe(() => {
        this.router.navigate(['/assemblees']);
      });
    }
  }
}
