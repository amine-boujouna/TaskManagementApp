import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Tache {
  id: number;
  titre: string;
  description: string;
  datedebut: Date;
  datefin: Date;
  etat: string;
  priorite: string;
  categorie: string;
}

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiUrl = 'http://localhost:8088/api/tasks';
 


  constructor(private http: HttpClient) { }
  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrl);
  }

  ajouterTache(tache: Tache): Observable<Tache> {
    return this.http.post<Tache>(`${this.apiUrl}`, tache);
  }

  deleteTacheById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateTache(id: number, updatedTache: Tache): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/${id}`, updatedTache);
  }
  getTachesByCategorie(categorie: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categorie/${categorie}`);
  }
   // Méthode pour récupérer les tâches triées
   getTachesSorted(order: string = 'asc'): Observable<any[]> {
    const params = new HttpParams().set('order', order); // Paramètre "order"
    return this.http.get<any[]>(`${this.apiUrl}/sorted`, { params });
  }
}
