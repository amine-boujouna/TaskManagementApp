import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { ListClientService } from 'src/app/service/client.service';
import { AddClientComponent } from '../add-client/add-client.component';
import { EditClientComponent } from '../edit-client/edit-client.component';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {
  //clients: Client[] = [];
  searchQuery: string = ''; // Le texte de recherche
  filteredClients: Client[] = []; // Liste des clients filtrés
  searchDate: string | Date = ''; // Stocke la date de recherche
  clients: any[] = [];
  page: number = 0; // Spring Data utilise un index 0 pour les pages
  size: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;
  isLastPage: boolean = false;
  isFirstPage: boolean = true;



  constructor(private clientService: ListClientService,public dialog: MatDialog) { 
  }

  ngOnInit(): void {
    this.loadClientsPage();

  }
  
  // Chargement de la page actuelle des clients
  loadClientsPage(): void {
    this.clientService.getClients(this.page, this.size).subscribe(response => {
      this.clients = response.content || [];
      this.page = response.pageable.pageNumber;
      this.size = response.pageable.pageSize;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
      this.isLastPage = response.last;
      this.isFirstPage = response.first;
    });
  }

  // Pagination précédente
  previousPage(): void {
    if (!this.isFirstPage) {
      this.page--;
      this.loadClientsPage();
    }
  }

  // Pagination suivante
  nextPage(): void {
    if (!this.isLastPage) {
      this.page++;
      this.loadClientsPage();
    }
  }
  openAddDialog(): void {
      const dialogRef = this.dialog.open(AddClientComponent, {
        width: '500px',
      });
  
      dialogRef.afterClosed().subscribe((result) => {
          this.loaddata(); // Recharger la liste après modification
        
      });
    }

loaddata(){
  this.clientService.getAllClient().subscribe({
    next: (data) => {
      this.clients = data;
      console.log('Clients retrieved:', data);

    },
    error: (error) => {
      console.error('Error fetching clients:', error);
    }
  });
}
deleteClient(id: number): void {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    this.clientService.supprimerClient(id).subscribe({
      next: () => {
        console.log('Tâche supprimée avec succès');
        // Met à jour la liste des tâches après la suppression
        this.loaddata();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la tâche', err);
        alert('Impossible de supprimer la tâche');
      }
    });
  }
}
  openEditDialog(client: any): void {
    const dialogRef = this.dialog.open(EditClientComponent, {
      width: '500px',
      data: { id: client.id, tache: client }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loaddata(); 
      }
    });
  }
  
  searchClients(): void {
    if (this.searchQuery.trim()) {
      this.clientService.searchClients(this.searchQuery).subscribe({
        next: (clients) => {
          this.filteredClients = clients; // Mettre à jour les clients filtrés
          console.log("Filtre clients: ", this.filteredClients);

          if (clients.length === 0) {
            console.warn('Aucun client trouvé pour cette recherche.');
          }

        },
        error: (error) => {
          console.error('Erreur lors de la recherche des clients :', error);
        }
      });
    } else {
      // Si le champ de recherche est vide, charger tous les clients
      this.loadClientsPage();
    }
  }
  
  
 private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mois avec 2 chiffres
    const day = date.getDate().toString().padStart(2, '0'); // Jour avec 2 chiffres
    return `${year}-${month}-${day}`;
  }
}
