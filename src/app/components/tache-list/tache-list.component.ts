import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TacheService, Tache } from '../../service/tache.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tache-list',
  templateUrl: './tache-list.component.html',
  styleUrls: ['./tache-list.component.css']
})
export class TacheListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'titre', 'description', 'datedebut', 'datefin', 'priorite', 'etat', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalLength = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tacheService: TacheService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tacheService.getAllTaches().subscribe((tasks: any[]) => {
      this.dataSource.data = tasks;
      this.totalLength = tasks.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editTask(task: any): void {
    console.log('Editing task:', task);
  }

  deleteTask(task: any): void {
    console.log('Deleting task:', task);
  }

}
