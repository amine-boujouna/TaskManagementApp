import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ListClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  client!: Client; // Store the client to be updated

  constructor(
    private dialogRef: MatDialogRef<EditClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, tache: Client }, // Use correct data name
    private clientService: ListClientService
  ) {}

  ngOnInit(): void {
    // Set the client to be edited based on the data passed
    this.client = { ...this.data.tache };
  }

  // Update the client when the form is submitted
  updateClient(): void {
    this.clientService.updateClient(this.client.id, this.client).subscribe(
      (updatedClient) => {
        // Successfully updated, close the dialog and pass the updated client back
        this.dialogRef.close(updatedClient);
      },
      (error) => {
        // Handle error case
        console.error('Error updating client:', error);
        alert('Failed to update the client. Please try again.');
      }
    );
  }

  // Close the dialog without any changes
  closeDialog(): void {
    this.dialogRef.close();
  }
}
