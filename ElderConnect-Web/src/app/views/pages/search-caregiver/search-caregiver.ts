import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Cuidador {
  id: number;
  nome: string;
  cidade: string;
  experiencia: string;
  avaliacao: number;
  valorHora: number;
}

@Component({
  selector: 'app-search-caregivers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-caregiver.html',
  styleUrl: './search-caregiver.css'
})
export class SearchCaregivers {
  // Filtros
  cidadeSelecionada = 'Todas';
  valorMaximo = 'Até 30,00';
  disponibilidade = 'Qualquer horário';
  experienciaMinima = 'Todas';

  // Lista Mock de Cuidadores (baseada no protótipo)
  cuidadores: Cuidador[] = [
    {
      id: 1,
      nome: 'Cuidador1',
      cidade: 'Goiania - GO',
      experiencia: '5 anos de experiência',
      avaliacao: 3.5,
      valorHora: 25.00
    },
    {
      id: 2,
      nome: 'Cuidador2',
      cidade: 'Pouso Alegre - MG',
      experiencia: '3 anos de experiência',
      avaliacao: 3.8,
      valorHora: 25.00
    },
    {
      id: 3,
      nome: 'Cuidador3',
      cidade: 'Itajuba - MG',
      experiencia: '4 anos de experiência',
      avaliacao: 4.8,
      valorHora: 25.00
    }
  ];

  limparFiltros() {
    this.cidadeSelecionada = 'Todas';
    this.valorMaximo = 'Até 30,00';
    this.disponibilidade = 'Qualquer horário';
    this.experienciaMinima = 'Todas';
  }

  buscar() {
    // Lógica para aplicar os filtros futuramente
  }
}