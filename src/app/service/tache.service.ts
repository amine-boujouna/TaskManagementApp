import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  user: any; 
}

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private apiGetAllTache = 'http://localhost:8088/api/tasks'; 


  constructor(private http: HttpClient) { }
  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiGetAllTache);
  }
}
