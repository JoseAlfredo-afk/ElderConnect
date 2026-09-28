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

  exibirToast: boolean = false;
  mensagemToast: string = '';
  tipoToast: 'sucesso' | 'erro' = 'erro';
  private toastTimer: any;

  private authService = inject(Authentication);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  mostrarNotificacao(mensagem: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagemToast = mensagem;
    this.tipoToast = tipo;
    this.exibirToast = true;
    this.cdr.detectChanges();

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      this.fecharToast();
    }, 3000);
  }

  fecharToast(): void {
    this.exibirToast = false;
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

          this.mostrarNotificacao('Logado com sucesso!', 'sucesso');

          setTimeout(() => {
            const userType = user?.userType?.toUpperCase();

            if (userType === 'CUIDADOR' || userType === 'CAREGIVER') {
              this.router.navigate(['/dashboard/caregiver']);
            } else {
              this.router.navigate(['/dashboard/elder']);
            }
          }, 1000);
        },
        error: (error) => {
          console.error('Erro no login:', error);
          this.mostrarNotificacao('E-mail ou senha inválidos.', 'erro');
        }
      });

    } else {
      this.mostrarNotificacao('Por favor, preencha o e-mail e a senha.', 'erro');
    }
  }
}