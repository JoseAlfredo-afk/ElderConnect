import { Component, inject, signal, effect } from '@angular/core';
import { RouterOutlet, RouterLink, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/user/auth';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ElderConnect-Web');
  protected readonly authService = inject(AuthService);
  
  protected mostrarAlertaLogin = signal<boolean>(false);
  protected mostrarAlertaCadastro = signal<boolean>(false);

  constructor(private router: Router) {
    effect(() => {
      if (this.authService.usuarioLogado()) {
        this.mostrarAlertaLogin.set(true);
        setTimeout(() => this.mostrarAlertaLogin.set(false), 2500);
      }
    });

    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.authService.mostrarAlertaCadastroGlobal) {
        this.mostrarAlertaCadastro.set(true);
        this.authService.mostrarAlertaCadastroGlobal = false; 

        setTimeout(() => {
          this.mostrarAlertaCadastro.set(false);
        }, 2500);
      }
    });
  }
}