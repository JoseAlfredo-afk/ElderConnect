import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Authentication } from '../../../services/security/authentication';

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

  exibirToastErro: boolean = false;
  mensagemErroToast: string = '';
  private toastTimer: any;

  private authService = inject(Authentication);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  exibirToast(mensagem: string): void {
    this.mensagemErroToast = mensagem;
    this.exibirToastErro = true;
    this.cdr.detectChanges();

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      this.fecharToast();
    }, 3000);
  }

  fecharToast(): void {
    this.exibirToastErro = false;
    this.cdr.detectChanges();
  }

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
          this.exibirToast('E-mail ou senha inválidos.');
        }
      });

    } else {
      this.exibirToast('Por favor, preencha o e-mail e a senha.');
    }
  }
}