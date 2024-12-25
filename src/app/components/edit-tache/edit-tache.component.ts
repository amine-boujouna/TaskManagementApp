import { Component, Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TacheService } from '../../service/tache.service';


@Component({
  selector: 'app-edit-tache',
  templateUrl: './edit-tache.component.html',
  styleUrls: ['./edit-tache.component.css']
})
export class EditTacheComponent implements OnInit {

  tacheForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tacheService: TacheService,
    public dialogRef: MatDialogRef<EditTacheComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, tache: any }
  ) {
    this.tacheForm = this.fb.group({
      titre: [data.tache?.titre || '', Validators.required],
      description: [data.tache?.description || '', Validators.required],
      datedebut: [data.tache?.datedebut || '', Validators.required],
      datefin: [data.tache?.datefin || '', Validators.required],
      etat: [data.tache?.etat || '', Validators.required],
      priorite: [data.tache?.priorite || '', Validators.required],
      categorie: [data.tache?.categorie || '', Validators.required],
    });
  }

  ngOnInit(): void {}

  // Fermer la popup
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.tacheForm.valid) {
      const updatedTache = this.tacheForm.value;
      this.tacheService.updateTache(this.data.id, updatedTache).subscribe({
        next: (response) => {
          this.dialogRef.close(response); // Retourne la réponse à l'appelant
        },
        error: (err) => {
          console.error('Erreur lors de la modification de la tâche :', err);
        }
      });
    }
  }

}
