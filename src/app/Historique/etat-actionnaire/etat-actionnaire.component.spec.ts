import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatActionnaireComponent } from './etat-actionnaire.component';

describe('EtatActionnaireComponent', () => {
  let component: EtatActionnaireComponent;
  let fixture: ComponentFixture<EtatActionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EtatActionnaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatActionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
