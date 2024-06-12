import { Component, ViewChild } from '@angular/core';
import { Actionnaire } from '../../Models/actionnaire';
import { ActionnaireService } from '../../Services/actionnaire.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-actionnaire',
  templateUrl: './actionnaire.component.html',
  styleUrl: './actionnaire.component.css'
})
export class ActionnaireComponent {

  actionnaireList!: Actionnaire[];
  actionnaires!: Actionnaire[];
  dataSource:any;
  displayedColumns = ['matricule','raisonSociale','identifiant'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private actionnaireService: ActionnaireService, private router: Router){
    this.actionnaireService.getActionnaireList()
    .subscribe(res => {
      this.actionnaireList = res;
      this.dataSource = new MatTableDataSource<Actionnaire>(this.actionnaireList);
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getActionnaire(){
    this.actionnaireService.getActionnaireList().subscribe(data =>{
      this.actionnaires = data;
    })
  }

}
