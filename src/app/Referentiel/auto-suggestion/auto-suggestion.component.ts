import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { EmetteurService } from '../../Services/emetteur.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { Emetteur } from '../../Models/emetteur';

@Component({
  selector: 'app-auto-suggestion',
  templateUrl: './auto-suggestion.component.html',
  styleUrls: ['./auto-suggestion.component.css']
})
export class AutoSuggestionComponent implements OnInit {
  emetteurCtrl = new FormControl();
  filteredEmetteurs: Emetteur[] = [];

  constructor(private emetteurService: EmetteurService) {}

  ngOnInit(): void {
    this.emetteurCtrl.valueChanges.pipe(
      debounceTime(300),
      switchMap(value => this.emetteurService.searchEmetteurs(value))
    ).subscribe(data => {
      this.filteredEmetteurs = data;
    });
  }
}
