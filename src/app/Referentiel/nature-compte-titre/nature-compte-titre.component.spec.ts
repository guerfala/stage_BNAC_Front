import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureCompteTitreComponent } from './nature-compte-titre.component';

describe('NatureCompteTitreComponent', () => {
  let component: NatureCompteTitreComponent;
  let fixture: ComponentFixture<NatureCompteTitreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NatureCompteTitreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NatureCompteTitreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
