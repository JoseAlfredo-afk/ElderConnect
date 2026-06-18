// ... seus outros imports ...
import { CommonModule } from '@angular/common'; // Garanta que o CommonModule está nos imports do @Component
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private router: Router) { }

  logar(event: Event) {
    event.preventDefault();

    if (this.emailInput.trim() !== '' && this.senhaInput.trim() !== '') {
      this.mostrarSucesso = true;

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2500);
      
    } else {
      alert('Por favor, preencha o e-mail e a senha de simulação.');
    }
  }
}