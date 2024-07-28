import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalNComponent } from './journal-n.component';

describe('JournalNComponent', () => {
  let component: JournalNComponent;
  let fixture: ComponentFixture<JournalNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JournalNComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JournalNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
