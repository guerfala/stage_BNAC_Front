import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldeTCComponent } from './solde-tc.component';

describe('SoldeTCComponent', () => {
  let component: SoldeTCComponent;
  let fixture: ComponentFixture<SoldeTCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoldeTCComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoldeTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
