import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TacheService } from '../../service/tache.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';  

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css']
})
export class AddTacheComponent implements OnInit {

  tacheForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private tacheService: TacheService, private router: Router, public dialogRef: MatDialogRef<AddTacheComponent>  // Injecter MatDialogRef pour fermer le dialogue
  ) {
    this.tacheForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      datedebut: ['', Validators.required],
      datefin: ['', Validators.required],
      etat: ['', Validators.required],
      priorite: ['', Validators.required],
      categorie: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }


  
  onSubmit() {
    if (this.tacheForm.valid) {
      const newTache = this.tacheForm.value;

      this.tacheService.ajouterTache(newTache).subscribe({
        next: (response) => {
          this.message = 'Tâche ajoutée avec succès !';
          this.tacheForm.reset();
          
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la tâche :', error);
          this.message = 'Une erreur s\'est produite.';
        },
      });
    }
  }

}
