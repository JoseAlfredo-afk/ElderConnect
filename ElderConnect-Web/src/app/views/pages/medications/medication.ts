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

@Component({
  selector: 'app-medication',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './medication.html'
})
export class Medications implements OnInit {
  medicamentos: Medicamento[] = [];

  // Propriedades do formulário
  novoNome: string = '';
  novaDosagem: string = '';
  novoHorario: string = '';
  novasInstrucoes: string = '';

  ngOnInit(): void {
    this.carregarMedicamentos();
  }

  carregarMedicamentos(): void {
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
  }

  private carregarMedicamentosPadrao(): void {
    this.medicamentos = [
      {
        nome: 'Loratadina',
        dosagem: '1 compr.',
        horario: '07:30',
        instrucoes: 'Sem instruções'
      },
      {
        nome: 'Omeprazol',
        dosagem: '20mg',
        horario: '12:00',
        instrucoes: 'Jejum ou antes do almoço'
      }
    ];
    this.salvarNoLocalStorage();
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
    this.salvarNoLocalStorage();

    // Limpa o formulário
    this.novoNome = '';
    this.novaDosagem = '';
    this.novoHorario = '';
    this.novasInstrucoes = '';
  }

  removerMedicamento(index: number): void {
    const confirmacao = window.confirm('Deseja realmente remover este medicamento da rotina?');
    if (confirmacao) {
      this.medicamentos.splice(index, 1);
      this.salvarNoLocalStorage();
    }
  }

  private salvarNoLocalStorage(): void {
    localStorage.setItem('elderconnect_medicamentos', JSON.stringify(this.medicamentos));
  }
}