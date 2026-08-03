import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/user/auth';

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
  
  private authService = inject(AuthService); 
  private router = inject(Router);

  logar(event: Event) {
    event.preventDefault();

    if (this.emailInput.trim() !== '' && this.senhaInput.trim() !== '') {
      // 1. Marca o usuário como autenticado no serviço
      this.authService.logar(); 

      // 2. Simulação de perfil baseada no e-mail:
      // Se o e-mail contiver "cuidador", vai para o dashboard de cuidador.
      // Caso contrário, direciona para o novo Dashboard do Idoso.
      if (this.emailInput.toLowerCase().includes('cuidador')) {
        this.router.navigate(['/dashboard/caregiver']);
      } else {
        this.router.navigate(['/dashboard/elder']);
      }
      
    } else {
      alert('Por favor, preencha o e-mail e a senha de simulação.');
    }
  }
}