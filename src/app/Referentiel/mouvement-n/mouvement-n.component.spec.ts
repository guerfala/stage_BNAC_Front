import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementNComponent } from './mouvement-n.component';

describe('MouvementNComponent', () => {
  let component: MouvementNComponent;
  let fixture: ComponentFixture<MouvementNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MouvementNComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MouvementNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
