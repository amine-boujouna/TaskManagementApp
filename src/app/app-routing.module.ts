import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TacheListComponent } from './components/tache-list/tache-list.component';
import { AddTacheComponent } from './components/add-tache/add-tache.component';
import { EditTacheComponent } from './components/edit-tache/edit-tache.component';
import { TestComponent } from './components/test/test.component';
import { ListClientComponent } from './components/list-client/list-client.component';

const routes: Routes = [
  { path: 'tache-list', component: TacheListComponent },  
  { path: 'add-tache', component: AddTacheComponent }, 
  { path: 'edit-tache', component: EditTacheComponent }, 
  { path: 'test', component: TestComponent }, 
  { path: 'client-list', component: ListClientComponent },     
  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
