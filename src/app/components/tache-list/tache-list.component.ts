import { Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TacheService, Tache } from '../../service/tache.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddTacheComponent } from '../add-tache/add-tache.component';
import { MatDialog } from '@angular/material/dialog';
import { EditTacheComponent } from '../edit-tache/edit-tache.component';

@Component({
  selector: 'app-tache-list',
  templateUrl: './tache-list.component.html',
  styleUrls: ['./tache-list.component.css']
})
export class TacheListComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'description', 'datedebut', 'datefin', 'priorite', 'etat','categorie', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalLength = 0;
  taches: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tacheService: TacheService,public dialog: MatDialog) {}

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
  openEditDialog(tache: any): void {
    const dialogRef = this.dialog.open(EditTacheComponent, {
      width: '500px',
      data: { id: tache.id, tache: tache }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTasks(); // Recharger la liste après modification
      }
    });
  }

  deleteTask(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.tacheService.deleteTacheById(id).subscribe({
        next: () => {
          console.log('Tâche supprimée avec succès');
          // Met à jour la liste des tâches après la suppression
          this.loadTasks();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de la tâche', err);
          alert('Impossible de supprimer la tâche');
        }
      });
    }
  }
  openAddTacheDialog(): void {
    const dialogRef = this.dialog.open(AddTacheComponent, {
      width: '500px' // Vous pouvez ajuster la largeur du dialog
    });
    dialogRef.afterClosed().subscribe(result => {
      // Cette méthode est appelée lorsque le dialogue est fermé
      // Vous pouvez effectuer des actions supplémentaires après la fermeture du dialogue
      console.log('Le dialogue a été fermé', result);
      // Par exemple, vous pouvez rafraîchir la liste des tâches après l'ajout réussi
      // Cela dépend de votre logique
      this.loadTasks();
    });
  }

}
