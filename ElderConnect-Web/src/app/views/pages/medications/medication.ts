import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Medicamento {
  id: number;
  nome: string;
  dose: string;
  horario: string;
  instrucoes?: string;
}

@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medication.html'
})
export class Medications implements OnInit {
  medicamentos: Medicamento[] = [];
  exibirModalCadastro: boolean = false;
  modoEdicao: boolean = false;

  novoMedicamento: Partial<Medicamento> = {
    id: undefined,
    nome: '',
    dose: '',
    horario: '',
    instrucoes: ''
  };

  ngOnInit() {
    this.carregarMedicamentos();
  }

  carregarMedicamentos() {
    const salvos = localStorage.getItem('elderconnect_medicamentos');
    if (salvos) {
      const lista: Medicamento[] = JSON.parse(salvos);
      this.medicamentos = lista.sort((a, b) => a.horario.localeCompare(b.horario));
    } else {
      const padrao = [
        { id: 1, nome: 'Losartana', dose: '50mg', horario: '08:00', instrucoes: 'Tomar após o café' },
        { id: 2, nome: 'Omeprazol', dose: '20mg', horario: '12:00', instrucoes: 'Jejum ou antes do almoço' }
      ];
      this.medicamentos = padrao.sort((a, b) => a.horario.localeCompare(b.horario));
      this.salvarNoStorage();
    }
  }

  salvarNoStorage() {
    this.medicamentos.sort((a, b) => a.horario.localeCompare(b.horario));
    localStorage.setItem('elderconnect_medicamentos', JSON.stringify(this.medicamentos));
  }

  abrirModal() {
    this.modoEdicao = false;
    this.novoMedicamento = { id: undefined, nome: '', dose: '', horario: '', instrucoes: '' };
    this.exibirModalCadastro = true;
  }

  editarMedicamento(med: Medicamento) {
    this.modoEdicao = true;
    this.novoMedicamento = { ...med };
    this.exibirModalCadastro = true;
  }

  fecharModal() {
    this.exibirModalCadastro = false;
  }

  salvarMedicamento() {
    if (!this.novoMedicamento.nome || !this.novoMedicamento.horario) {
      alert('Por favor, preencha pelo menos o Nome e o Horário!');
      return;
    }

    if (this.modoEdicao && this.novoMedicamento.id) {
      const index = this.medicamentos.findIndex(m => m.id === this.novoMedicamento.id);
      if (index !== -1) {
        this.medicamentos[index] = {
          id: this.novoMedicamento.id,
          nome: this.novoMedicamento.nome,
          dose: this.novoMedicamento.dose || 'S/D',
          horario: this.novoMedicamento.horario,
          instrucoes: this.novoMedicamento.instrucoes || ''
        };
      }
    } else {
      const item: Medicamento = {
        id: Date.now(),
        nome: this.novoMedicamento.nome,
        dose: this.novoMedicamento.dose || 'S/D',
        horario: this.novoMedicamento.horario,
        instrucoes: this.novoMedicamento.instrucoes || ''
      };
      this.medicamentos.push(item);
    }

    this.salvarNoStorage();
    this.fecharModal();
  }

  excluirMedicamento(id: number) {
    this.medicamentos = this.medicamentos.filter(m => m.id !== id);
    this.salvarNoStorage();
  }
}