import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

export interface Cuidador {
  id: number;
  nome: string;
  cidade: string;
  experiencia: string;
  anosExperiencia: number;
  avaliacao: number;
  valorHora: number;
  disponibilidade: string[];
}

@Component({
  selector: 'app-search-caregivers',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-caregiver.html',
  styleUrl: './search-caregiver.css'
})
export class SearchCaregivers {
  cidadeSelecionada: string = 'Todas';
  valorMaximo: string = 'Todos';
  disponibilidade: string = 'Qualquer horário';
  experienciaMinima: string = 'Todas';

  cuidadoresOriginais: Cuidador[] = [
    {
      id: 1,
      nome: 'Maria Silva',
      cidade: 'Pouso Alegre - MG',
      experiencia: '5 anos de experiência',
      anosExperiencia: 5,
      avaliacao: 4.9,
      valorHora: 28.00,
      disponibilidade: ['Manhã', 'Tarde']
    },
    {
      id: 2,
      nome: 'João Santos',
      cidade: 'Itajuba - MG',
      experiencia: '3 anos de experiência',
      anosExperiencia: 3,
      avaliacao: 4.7,
      valorHora: 45.00,
      disponibilidade: ['Noite']
    },
    {
      id: 3,
      nome: 'Ana Oliveira',
      cidade: 'Goiania - GO',
      experiencia: '1 ano de experiência',
      anosExperiencia: 1,
      avaliacao: 4.8,
      valorHora: 30.00,
      disponibilidade: ['Manhã', 'Tarde', 'Noite']
    },
    {
      id: 4,
      nome: 'Carlos Eduardo',
      cidade: 'Pouso Alegre - MG',
      experiencia: '6 anos de experiência',
      anosExperiencia: 6,
      avaliacao: 5.0,
      valorHora: 60.00,
      disponibilidade: ['Tarde', 'Noite']
    },
    {
      id: 5,
      nome: 'Fernanda Lima',
      cidade: 'Itajuba - MG',
      experiencia: '2 anos de experiência',
      anosExperiencia: 2,
      avaliacao: 4.6,
      valorHora: 25.00,
      disponibilidade: ['Manhã']
    },
    {
      id: 6,
      nome: 'Roberto Alves',
      cidade: 'Goiania - GO',
      experiencia: '4 anos de experiência',
      anosExperiencia: 4,
      avaliacao: 4.9,
      valorHora: 80.00,
      disponibilidade: ['Manhã', 'Tarde']
    }
  ];

  cuidadores: Cuidador[] = [...this.cuidadoresOriginais];

  buscar() {
    this.cuidadores = this.cuidadoresOriginais.filter(item => {
      if (this.cidadeSelecionada !== 'Todas' && item.cidade !== this.cidadeSelecionada) {
        return false;
      }

      if (this.valorMaximo !== 'Todos') {
        const limite = parseFloat(this.valorMaximo.replace('Até ', '').replace(',', '.'));
        if (item.valorHora > limite) {
          return false;
        }
      }

      if (this.disponibilidade !== 'Qualquer horário') {
        if (!item.disponibilidade.includes(this.disponibilidade)) {
          return false;
        }
      }

      if (this.experienciaMinima !== 'Todas') {
        const minAnos = parseInt(this.experienciaMinima.replace('+ anos', ''), 10);
        if (item.anosExperiencia < minAnos) {
          return false;
        }
      }

      return true;
    });
  }

  limparFiltros() {
    this.cidadeSelecionada = 'Todas';
    this.valorMaximo = 'Todos';
    this.disponibilidade = 'Qualquer horário';
    this.experienciaMinima = 'Todas';
    this.cuidadores = [...this.cuidadoresOriginais];
  }
}