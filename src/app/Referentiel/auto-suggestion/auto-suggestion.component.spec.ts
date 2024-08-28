import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoSuggestionComponent } from './auto-suggestion.component';

describe('AutoSuggestionComponent', () => {
  let component: AutoSuggestionComponent;
  let fixture: ComponentFixture<AutoSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoSuggestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
