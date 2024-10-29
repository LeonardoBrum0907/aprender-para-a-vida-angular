import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskDirective } from 'ngx-mask';
import { VolunteersService } from '../../services/volunteers/volunteers.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-volunteers',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule, MatProgressSpinnerModule, NgxMaskDirective],
  templateUrl: './volunteers.component.html',
  styleUrl: './volunteers.component.scss'
})
export class VolunteersComponent {

  volunteerForm!: FormGroup;
  submitIsLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private volunterService: VolunteersService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.volunteerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      status: ['Aguardando'],
      availability: ['', [Validators.required]],
      area: ['Psicologia'],
      comment: ['']
    });
  }

  createVolunter() {
    if (this.volunteerForm.valid) {
      this.submitIsLoading = true;
      this.volunterService.createVolunteer(this.volunteerForm.value).subscribe(
        data => {
          this.submitIsLoading = false;
          this.openSnackBar("Formulário enviado com sucesso!", "success");
          this.volunteerForm.reset();
        },
        error => {
          this.submitIsLoading = false;
          this.openSnackBar("Erro ao enviar formulário. Tente novamente.", "error");
        }
      );
    }
  }

  openSnackBar(message: string, type: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: type === "success" ? 'snackbar-success' : 'snackbar-error'
    });
  }

  enableButton() {
    return this.volunteerForm.valid ? 'send-btn' : 'send-btn__disabled';
  }
}
