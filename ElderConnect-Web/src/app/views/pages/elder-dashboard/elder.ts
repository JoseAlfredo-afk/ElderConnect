import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

export interface Medicamento {
  id: number;
  nome: string;
  dose: string;
  horario: string;
  instrucoes?: string;
}

@Component({
  selector: 'app-elder-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './elder.html',
  styleUrl: './elder.css'
})
export class ElderDashboard implements OnInit {
  private router = inject(Router);

  nomeUsuario: string = 'José';
  proximosMedicamentos: Medicamento[] = [];
  totalMedicamentosHoje: number = 0;

  cuidadorContratado = {
    id: 1,
    nome: 'Maria Silva',
    foto: ''
  };

  avisoImportante = 'Consulta dia 15/05';

  ngOnInit() {
    this.carregarMedicamentos();
  }

  carregarMedicamentos() {
    const salvos = localStorage.getItem('elderconnect_medicamentos');
    let lista: Medicamento[] = [];

    if (salvos) {
      lista = JSON.parse(salvos);
    } else {
      lista = [
        { id: 1, nome: 'Losartana', dose: '50mg', horario: '08:00', instrucoes: 'Tomar após o café' },
        { id: 2, nome: 'Omeprazol', dose: '20mg', horario: '12:00', instrucoes: 'Jejum ou antes do almoço' }
      ];
      localStorage.setItem('elderconnect_medicamentos', JSON.stringify(lista));
    }

    // Ordena do menor horário para o maior (ex: 07:30 antes de 12:00)
    this.proximosMedicamentos = lista.sort((a, b) => a.horario.localeCompare(b.horario));
    this.totalMedicamentosHoje = this.proximosMedicamentos.length;
  }

  sair() {
    this.router.navigate(['/account/sign-in']);
  }
}