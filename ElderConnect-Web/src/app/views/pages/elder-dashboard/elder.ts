import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

export interface Medicamento {
  id: number;
  nome: string;
  dose: string;
  horario: string;
  instrucoes?: string;
}

export interface Aviso {
  id: number;
  titulo: string;
  descricao: string;
  data?: string;
}

@Component({
  selector: 'app-elder-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
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

  // Gestão de Avisos
  avisos: Aviso[] = [];
  exibirModalAviso: boolean = false;
  novoAviso: Partial<Aviso> = { titulo: '', descricao: '' };

  ngOnInit() {
    this.carregarMedicamentos();
    this.carregarAvisos();
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

    this.proximosMedicamentos = lista.sort((a, b) => a.horario.localeCompare(b.horario));
    this.totalMedicamentosHoje = this.proximosMedicamentos.length;
  }

  carregarAvisos() {
    const salvos = localStorage.getItem('elderconnect_avisos');
    if (salvos) {
      this.avisos = JSON.parse(salvos);
    } else {
      this.avisos = [
        { id: 1, titulo: 'Consulta Médica', descricao: 'Consulta dia 15/05' }
      ];
      localStorage.setItem('elderconnect_avisos', JSON.stringify(this.avisos));
    }
  }

  abrirModalAviso() {
    this.novoAviso = { titulo: '', descricao: '' };
    this.exibirModalAviso = true;
  }

  fecharModalAviso() {
    this.exibirModalAviso = false;
  }

  salvarAviso() {
    if (!this.novoAviso.titulo || !this.novoAviso.descricao) {
      alert('Por favor, preencha o título e a descrição do aviso!');
      return;
    }

    const item: Aviso = {
      id: Date.now(),
      titulo: this.novoAviso.titulo,
      descricao: this.novoAviso.descricao
    };

    this.avisos.unshift(item);
    localStorage.setItem('elderconnect_avisos', JSON.stringify(this.avisos));
    this.fecharModalAviso();
  }

  removerAviso(id: number) {
    this.avisos = this.avisos.filter(a => a.id !== id);
    localStorage.setItem('elderconnect_avisos', JSON.stringify(this.avisos));
  }

  sair() {
    this.router.navigate(['/account/sign-in']);
  }
}