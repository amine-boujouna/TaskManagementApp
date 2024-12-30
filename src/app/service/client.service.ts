import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ListClientService {
  private apiUrl = 'http://localhost:8088/api/clients';


  constructor(private http: HttpClient) { }

  getAllClient(): Observable<Client[]> {
      return this.http.get<Client[]>(this.apiUrl);
    }

  ajouterClient(client:Client) : Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}`,client);
  }

  supprimerClient(id:number) : Observable<void>{
   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
   updateClient(id: number, client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error: ', error);
    return throwError('Something went wrong. Please try again later.');
  }

  getClientById(id: string): Observable<Client> {
      return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  searchClients(value: string): Observable<Client[]> {
    const params = new HttpParams().set('value', value);
    return this.http.get<Client[]>(`${this.apiUrl}/search`, { params });
  }
  getClients(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/getPagination?page=${page}&size=${size}`);
  }
  
}
