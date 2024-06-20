import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Operation } from '../../Models/operation'; // Ensure this path matches your Operation model
import { OperationService } from '../../Services/operation.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {
  displayedColumns: string[] = ['idOperation']; 
  dataSource: MatTableDataSource<Operation> = new MatTableDataSource<Operation>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private operationService: OperationService) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getOperations();
  }

  getOperations(): void {
    this.operationService.getOperationList().subscribe(data => {
      this.dataSource.data = data;
    });
  }
}
