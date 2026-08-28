import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface Medicamento {
  nome: string;
  dosagem: string;
  horario: string;
  instrucoes: string;
}

export interface Aviso {
  tipo: string;
  mensagem: string;
}

@Component({
  selector: 'app-medication',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './medication.html'
})
export class Medications implements OnInit {
  medicamentos: Medicamento[] = [];
  avisos: Aviso[] = [];

  // Campos do formulário de Medicamento
  novoNome: string = '';
  novaDosagem: string = '';
  novoHorario: string = '';
  novasInstrucoes: string = '';

  // Campos do formulário de Aviso
  novoTipoAviso: string = 'Aviso';
  novaMensagemAviso: string = '';

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    // Carrega Medicamentos
    const medsSalvos = localStorage.getItem('elderconnect_medicamentos');
    if (medsSalvos) {
      try {
        this.medicamentos = JSON.parse(medsSalvos);
      } catch (e) {
        this.carregarMedicamentosPadrao();
      }
    } else {
      this.carregarMedicamentosPadrao();
    }

    // Carrega Avisos
    const avisosSalvos = localStorage.getItem('elderconnect_avisos');
    if (avisosSalvos) {
      try {
        this.avisos = JSON.parse(avisosSalvos);
      } catch (e) {
        this.carregarAvisosPadrao();
      }
    } else {
      this.carregarAvisosPadrao();
    }
  }

  private carregarMedicamentosPadrao(): void {
    this.medicamentos = [
      { nome: 'Loratadina', dosagem: '1 compr.', horario: '07:30', instrucoes: 'Sem instruções' },
      { nome: 'Omeprazol', dosagem: '20mg', horario: '12:00', instrucoes: 'Jejum ou antes do almoço' }
    ];
    localStorage.setItem('elderconnect_medicamentos', JSON.stringify(this.medicamentos));
  }

  private carregarAvisosPadrao(): void {
    this.avisos = [
      { tipo: 'Aviso', mensagem: 'Acompanhar nas atividades diárias e medições.' }
    ];
    localStorage.setItem('elderconnect_avisos', JSON.stringify(this.avisos));
  }

  adicionarMedicamento(): void {
    if (!this.novoNome || !this.novoHorario) {
      alert('Por favor, preencha pelo menos o Nome e o Horário do medicamento.');
      return;
    }

    const novo: Medicamento = {
      nome: this.novoNome.trim(),
      dosagem: this.novaDosagem.trim() || 'Conforme receita',
      horario: this.novoHorario,
      instrucoes: this.novasInstrucoes.trim() || 'Sem instruções'
    };

    this.medicamentos.push(novo);
    localStorage.setItem('elderconnect_medicamentos', JSON.stringify(this.medicamentos));

    this.novoNome = '';
    this.novaDosagem = '';
    this.novoHorario = '';
    this.novasInstrucoes = '';
  }

  removerMedicamento(index: number): void {
    if (window.confirm('Deseja realmente remover este medicamento?')) {
      this.medicamentos.splice(index, 1);
      localStorage.setItem('elderconnect_medicamentos', JSON.stringify(this.medicamentos));
    }
  }

  adicionarAviso(): void {
    if (!this.novaMensagemAviso.trim()) {
      alert('Por favor, digite a mensagem do aviso.');
      return;
    }

    const novoAviso: Aviso = {
      tipo: this.novoTipoAviso,
      mensagem: this.novaMensagemAviso.trim()
    };

    this.avisos.push(novoAviso);
    localStorage.setItem('elderconnect_avisos', JSON.stringify(this.avisos));

    this.novaMensagemAviso = '';
  }

  removerAviso(index: number): void {
    if (window.confirm('Deseja realmente remover este aviso?')) {
      this.avisos.splice(index, 1);
      localStorage.setItem('elderconnect_avisos', JSON.stringify(this.avisos));
    }
  }
}