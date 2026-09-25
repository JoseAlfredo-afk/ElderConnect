import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Authentication } from '../../../services/security/authentication';
import { AuthenticatedUserDto } from '../../../models/dto/authenticated-user-dto';

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
      const eCuidador = this.emailInput.toLowerCase().includes('cuidador');
      
      const usuarioSimulado: AuthenticatedUserDto = {
        id: eCuidador ? 2 : 1,
        fullname: eCuidador ? 'Maria Silva' : 'José da Silva',
        email: this.emailInput,
        userType: eCuidador ? 'CAREGIVER' : 'ELDER',
        cpf: '',
        phoneNumber: '',
        birthDate: ''
      };

      this.authService.logar(usuarioSimulado);

      if (eCuidador) {
        this.router.navigate(['/dashboard/caregiver']);
      } else {
        this.router.navigate(['/dashboard/elder']);
      }

    } else {
      alert('Por favor, preencha o e-mail e a senha de simulação.');
    }
  }
}