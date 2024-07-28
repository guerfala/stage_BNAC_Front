import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAssembleeComponent } from './type-assemblee.component';

describe('TypeAssembleeComponent', () => {
  let component: TypeAssembleeComponent;
  let fixture: ComponentFixture<TypeAssembleeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TypeAssembleeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeAssembleeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
