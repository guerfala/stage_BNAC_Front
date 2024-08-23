import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeneurCompteComponent } from './teneur-compte.component';

describe('TeneurCompteComponent', () => {
  let component: TeneurCompteComponent;
  let fixture: ComponentFixture<TeneurCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeneurCompteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeneurCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
