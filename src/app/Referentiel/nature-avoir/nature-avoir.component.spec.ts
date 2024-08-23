import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureAvoirComponent } from './nature-avoir.component';

describe('NatureAvoirComponent', () => {
  let component: NatureAvoirComponent;
  let fixture: ComponentFixture<NatureAvoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NatureAvoirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NatureAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
