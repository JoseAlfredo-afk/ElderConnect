import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-elder-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './elder.html',
  styleUrl: './elder.css'
})
export class ElderDashboard {
  private router = inject(Router);

  nomeUsuario: string = 'José';

  // Exemplo de dados mockados para exibição reativa
  proximosMedicamentos = [
    { nome: 'Losartana', horario: '08:00' },
    { nome: 'Omeprazol', horario: '12:00' }
  ];

  cuidadorContratado = {
    nome: 'Maria Silva',
    foto: ''
  };

  avisoImportante = 'Consulta dia 15/05';

  sair() {
    // Limpa a sessão se necessário e volta para o login ou home
    this.router.navigate(['/account/sign-in']);
  }
}