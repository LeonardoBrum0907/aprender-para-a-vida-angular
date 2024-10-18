import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskDirective } from 'ngx-mask';
import { VolunteersService } from '../../services/volunteers/volunteers.service';

@Component({
  selector: 'app-volunteers',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule, MatProgressSpinnerModule, NgxMaskDirective],
  templateUrl: './volunteers.component.html',
  styleUrl: './volunteers.component.scss'
})
export class VolunteersComponent {

  volunteerForm!: FormGroup
  submitIsLoading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private volunterService: VolunteersService
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
    })

  }

  createVolunter() {
    if (this.volunteerForm.valid) {
      this.submitIsLoading = true
      this.volunterService.createVolunteer(this.volunteerForm.value).subscribe(data => {
        console.log(data)
        this.submitIsLoading = false
      })
    }
  }

  enableButton() {
    if(this.volunteerForm.valid) {
      return 'send-btn'
    } else {
      return 'send-btn__disabled'
    }
  }

}
