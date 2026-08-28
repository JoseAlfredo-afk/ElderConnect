import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/user/auth';

@Component({
  selector: 'app-sign-up-caregiver',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up-caregiver.html'
})
export class SignUpCaregiver {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  protected authService = inject(AuthService);

  caregiverForm: FormGroup = this.fb.group({
    experiencia: ['', [Validators.required]],
    valorHora: ['', [Validators.required]],
    cidade: ['', [Validators.required]],
    descricao: ['', [Validators.required, Validators.minLength(20)]]
  });

  // Método invocado no template
  salvarPerfil(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.caregiverForm.valid) {
      console.log('Dados do complemento de cuidador:', this.caregiverForm.value);

      localStorage.setItem('user_role', 'cuidador');
      this.authService.mostrarAlertaCadastroGlobal = true;

      this.router.navigate(['/account/sign-in']);
    } else {
      this.caregiverForm.markAllAsTouched();
    }
  }

  // Aliases para evitar falha em qualquer chamada legada
  submeter(event?: Event) {
    this.salvarPerfil(event);
  }

  onSubmit(event?: Event) {
    this.salvarPerfil(event);
  }
}