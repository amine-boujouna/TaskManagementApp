import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TacheService } from '../../service/tache.service';
import { Tache } from '../../models/tache';
@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css']
})
export class AddTacheComponent implements OnInit {

  tacheForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private tacheService: TacheService) {
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
      const newTache: Tache = this.tacheForm.value;
      this.tacheService.ajouterTache(newTache).subscribe({
        next: (response) => {
          this.message = 'Tâche ajoutée avec succès !';
          this.tacheForm.reset();
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la tâche :', error);
          this.message = 'Une erreur s\'est produite.';
        },
      });
    }
  }

}
