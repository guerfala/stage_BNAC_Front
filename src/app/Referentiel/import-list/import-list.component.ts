/*import { Component, OnInit } from '@angular/core';
import { ImportService } from '../../Services/import.service';
import { Import } from '../../Models/import';

@Component({
  selector: 'app-import-list',
  templateUrl: './import-list.component.html',
  styleUrls: ['./import-list.component.css']
})
export class ImportListComponent implements OnInit {
  imports: Import[] = [];

  displayedColumns: string[] = ['idImport', 'libelle', 'emetteur', 'titre', 'dateOperation', 'actions'];

  constructor(private importService: ImportService) { }

 /* ngOnInit(): void {
    this.importService.getImports().subscribe(data => {
      this.imports = data;
    });
  }

  editImport(imp: Import): void {
    // Implement edit functionality here
  }

  deleteImport(id: number): void {
    this.importService.deleteImport(id).subscribe(() => {
      this.imports = this.imports.filter(imp => imp.idImport !== id);
    });
  }
}
*/