import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureCapitalComponent } from './structure-capital.component';

describe('StructureCapitalComponent', () => {
  let component: StructureCapitalComponent;
  let fixture: ComponentFixture<StructureCapitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructureCapitalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StructureCapitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
