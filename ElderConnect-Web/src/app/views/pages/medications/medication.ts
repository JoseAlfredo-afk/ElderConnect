import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Medicamento {
  nome: string;
  dosagem: string;
  horario: string;
  instrucoes: string;
}

interface Aviso {
  texto: string;
}

@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './medication.html'
})
export class Medications{
  medicamentos: Medicamento[] = [
    { nome: 'Loratadina', dosagem: '1 compr.', horario: '07:30', instrucoes: 'Sem instruções' },
    { nome: 'Omeprazol', dosagem: '20mg', horario: '12:00', instrucoes: 'Jejum ou antes do almoço' }
  ];

  avisos: Aviso[] = [
    { texto: 'Acompanhar nas atividades diárias e medições.' }
  ];

  novoMedicamento: Medicamento = { nome: '', dosagem: '', horario: '', instrucoes: '' };
  novoAvisoTexto: string = '';

  exibindoModalExclusao: boolean = false;
  itemParaExcluir: { tipo: 'medicamento' | 'aviso'; index: number } | null = null;

  cadastrarMedicamento(): void {
    if (!this.novoMedicamento.nome || !this.novoMedicamento.horario) return;
    this.medicamentos.push({ ...this.novoMedicamento });
    this.novoMedicamento = { nome: '', dosagem: '', horario: '', instrucoes: '' };
  }

  cadastrarAviso(): void {
    if (!this.novoAvisoTexto.trim()) return;
    this.avisos.push({ texto: this.novoAvisoTexto });
    this.novoAvisoTexto = '';
  }

  solicitarExclusao(tipo: 'medicamento' | 'aviso', index: number): void {
    this.itemParaExcluir = { tipo, index };
    this.exibindoModalExclusao = true;
  }

  cancelarExclusao(): void {
    this.exibindoModalExclusao = false;
    this.itemParaExcluir = null;
  }

  confirmarExclusao(): void {
    if (!this.itemParaExcluir) return;

    if (this.itemParaExcluir.tipo === 'medicamento') {
      this.medicamentos.splice(this.itemParaExcluir.index, 1);
    } else if (this.itemParaExcluir.tipo === 'aviso') {
      this.avisos.splice(this.itemParaExcluir.index, 1);
    }

    this.cancelarExclusao();
  }
}