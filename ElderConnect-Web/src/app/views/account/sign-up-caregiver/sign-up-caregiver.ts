import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/user/auth';

@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sign-up-caregiver.html',
})
export class CompleteProfile {
  private router = inject(Router);
  protected authService = inject(AuthService);

  salvarPerfil() {
    this.authService.mostrarAlertaCadastroGlobal = true;
    this.router.navigate(['/account/sign-in']);
  }
}