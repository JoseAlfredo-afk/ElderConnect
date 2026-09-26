import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Authentication } from '../../../services/security/authentication';
import { AuthenticatedUserDto } from '../../../models/dto/authenticated-user-dto';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {
  emailInput: string = '';
  senhaInput: string = '';
  mostrarSucesso: boolean = false;

  private authService = inject(Authentication);
  private router = inject(Router);

  logar(event: Event) {
    event.preventDefault();

      if (this.emailInput.trim() !== '' && this.senhaInput.trim() !== '') {

    this.authService.authenticate(
      this.emailInput,
      this.senhaInput
    ).subscribe({
      next: (user) => {
        console.log('Usuário autenticado:', user);
        this.authService.logar(user);
        this.router.navigate(['/dashboard/elder']);
      },
      error: (error) => {
        console.error('Erro no login:', error);
        alert('E-mail ou senha inválidos.');
      }
    });

  } else {
    alert('Por favor, preencha o e-mail e a senha de simulação.');
  }
   
  }
}