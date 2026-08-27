import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

export interface Medicamento {
  id: number;
  nome: string;
  dose: string;
  horario: string;
  instrucoes?: string;
}

@Component({
  selector: 'app-caregiver-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './caregiver-dashboard.html'
})
export class CaregiverDashboard implements OnInit {
  private router = inject(Router);

  nomeCuidador: string = 'Maria Silva';

  // Dados do Idoso que contratou a cuidadora
  idosoContratante = {
    nome: 'José da Silva',
    idade: '78 anos',
    cidade: 'Pouso Alegre - MG',
    responsavel: 'Ana Silva (Filha) - (35) 99887-1122',
    observacoes: 'Hipertenso. Necessita de auxílio para caminhadas matinais e acompanhamento nos horários de medicação.'
  };

  medicamentosIdoso: Medicamento[] = [];

  ngOnInit() {
    this.carregarMedicamentosIdoso();
  }

  carregarMedicamentosIdoso() {
    const salvos = localStorage.getItem('elderconnect_medicamentos');
    if (salvos) {
      const lista: Medicamento[] = JSON.parse(salvos);
      this.medicamentosIdoso = lista.sort((a, b) => a.horario.localeCompare(b.horario));
    } else {
      this.medicamentosIdoso = [
        { id: 1, nome: 'Losartana', dose: '50mg', horario: '08:00', instrucoes: 'Tomar após o café' },
        { id: 2, nome: 'Omeprazol', dose: '20mg', horario: '12:00', instrucoes: 'Jejum ou antes do almoço' }
      ];
    }
  }

  sair() {
    this.router.navigate(['/account/sign-in']);
  }
}