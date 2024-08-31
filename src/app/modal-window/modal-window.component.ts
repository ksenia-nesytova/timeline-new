import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-modal-window',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './modal-window.component.html',
  styleUrl: './modal-window.component.scss',
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: FormGroup, useValue: {} }
  ],
})

export class ModalWindowComponent {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalWindowComponent>
  ) { }


  loginForm: FormGroup = this.fb.group({
    name: [Validators.required],
  });

  close(): void {
    this.dialogRef.close();
    console.log('close')
  }
  save() {
    console.log('saved')
  }
}
