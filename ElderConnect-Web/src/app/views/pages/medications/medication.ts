import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Medicamento {
  id: number;
  nome: string;
  dose: string;
  frequencia: string;
  horario: string;
}

@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './medication.html',
  styleUrl: './medication.css'
})
export class Medications {
  medicamentos: Medicamento[] = [
    {
      id: 1,
      nome: 'Losartana',
      dose: '1 Comprimido',
      frequencia: 'Diária',
      horario: '08:00'
    },
    {
      id: 2,
      nome: 'Omeprazol',
      dose: 'Meio Comprimido',
      frequencia: 'Diária',
      horario: '12:00'
    }
  ];

  proximoHorario: string = '12:00';

  novoMedicamento() {
    // Ação do botão
  }

  editar(medicamento: Medicamento) {
    // Ação de editar
  }

  excluir(id: number) {
    this.medicamentos = this.medicamentos.filter(m => m.id !== id);
  }
}