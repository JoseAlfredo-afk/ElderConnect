import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  private authService = inject(AuthService)

  constructor(private router: Router) { }

  logar(event: Event) {
    event.preventDefault();

    if (this.emailInput.trim() !== '' && this.senhaInput.trim() !== '') {
      this.mostrarSucesso = true;

      this.authService.logar()

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2500);
      
    } else {
      alert('Por favor, preencha o e-mail e a senha de simulação.');
    }
  }
}