import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgot-password.html'
})
export class ForgotPassword {
  email: string = '';
  mensagemSucesso: boolean = false;

  enviarEmail() {
    if (this.email) {
      this.mensagemSucesso = true;
    }
  }
}