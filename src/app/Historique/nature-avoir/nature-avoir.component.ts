import { Component, OnInit } from '@angular/core';
import { NatureAvoirService } from '../../Services/nature-avoir.service';
import { NatureAvoir } from '../../Models/nature-avoir';



@Component({
  selector: 'app-nature-avoir',
  templateUrl: './nature-avoir.component.html',
  styleUrls: ['./nature-avoir.component.css']
})
export class NatureAvoirComponent implements OnInit {
   displayedColumns: string[] = ['IdNatureAvoirs', 'Libelle', 'CodeCategorieAvoir', 'actions'];

  
  natureAvoirs: NatureAvoir[] = [];
 natureAvoir: NatureAvoir = this.createEmptyNatureAvoir();
  isEdit = false;

  constructor(private natureAvoirService: NatureAvoirService) {}

  ngOnInit(): void {
    this.loadNatureAvoirs();
  }

  loadNatureAvoirs(): void {
    this.natureAvoirService.getAllNatureAvoirs().subscribe(data => {
      this.natureAvoirs = data;
    });
  }

  addNatureAvoir(): void {
    this.natureAvoirService.addNatureAvoir(this.natureAvoir).subscribe(() => {
      this. loadNatureAvoirs();
      this.natureAvoir = this.createEmptyNatureAvoir();
    });
  }

  editNatureAvoir(selectedNatureAvoir: NatureAvoir): void {
    this.natureAvoir = { ...selectedNatureAvoir };
    this.isEdit = true;
  }


  updateNatureAvoir(): void {
    this.natureAvoirService.updateNatureAvoir(this.natureAvoir.IdNatureAvoirs, this.natureAvoir).subscribe(() => {
      this.loadNatureAvoirs();
      this.natureAvoir = this.createEmptyNatureAvoir();
      this.isEdit = false;
    });
  }

  deleteNatureAvoir(id: number): void {
    this.natureAvoirService.deleteNatureAvoir(id).subscribe(() => {
      this.loadNatureAvoirs();
    });
  }

  private createEmptyNatureAvoir(): NatureAvoir {
    return {
      IdNatureAvoirs:0,
     Libelle : '',
     CodeCategorieAvoir:'',
    };
  }
}
