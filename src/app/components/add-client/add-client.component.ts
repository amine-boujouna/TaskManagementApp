import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/client';
import { ListClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ListClientService,
    public dialogRef: MatDialogRef<AddClientComponent>  // Référence au dialog
  ) {
    // Initialisation du formulaire dans le constructeur
    this.clientForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      téléphone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      adress: ['', Validators.required],
      city: ['', Validators.required],
      datenaissance: ['', Validators.required],
    });
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      const newClient: Client = this.clientForm.value;
      this.clientService.ajouterClient(newClient).subscribe({
        next: (response) => {
          console.log('Client ajouté avec succès', response);
          this.dialogRef.close(true);  // Fermer le dialog et indiquer que l'ajout est effectué
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout du client', error);
        }
      });
    } else {
      console.log('Formulaire invalide');
    }
  }

  onCancel(): void {
    this.dialogRef.close();  // Ferme le dialog sans effectuer d'action
  }
  }

  

