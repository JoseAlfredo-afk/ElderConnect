import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Authentication } from '../../../services/security/authentication';
import { UserCredentialDto } from '../../../models/dto/user-credential-dto';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css'
})
export class SignIn {

  private authentication = inject(Authentication);
  private router = inject(Router);

  emailInput: string = '';
  senhaInput: string = '';

  mensagemErro: string = '';

  logar(event?: Event) {

    event?.preventDefault();

    this.mensagemErro = '';

    const credentials: UserCredentialDto = {
      email: this.emailInput,
      password: this.senhaInput
    };

    this.authentication.login(credentials).subscribe({

      next: (user) => {

        this.authentication.logar(user);

        if (user.userType === 'CUIDADOR') {
          this.router.navigate(['/dashboard/caregiver']);
        } else if (user.userType === 'IDOSO') {
          this.router.navigate(['/dashboard/elder']);
        }

      },

      error: () => {
        this.mensagemErro = 'E-mail ou senha inválidos.';
      }

    });
  }
}