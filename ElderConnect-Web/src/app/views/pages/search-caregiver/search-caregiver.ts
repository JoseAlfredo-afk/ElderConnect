import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface Cuidador {
  id: number;
  nome: string;
  cidade: string;
  experienciaAnos: number;
  experienciaTexto: string;
  precoHora: number;
  avaliacao: number;
  disponibilidade: string; // 'Manhã', 'Tarde', 'Noite', 'Integral'
}

@Component({
  selector: 'app-search-caregiver',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-caregiver.html'
})
export class SearchCaregiver implements OnInit {
  // Lista original de cuidadores
  cuidadores: Cuidador[] = [
    {
      id: 1,
      nome: 'Cuidador1',
      cidade: 'Goiânia - GO',
      experienciaAnos: 5,
      experienciaTexto: '5 anos de experiência',
      precoHora: 25.00,
      avaliacao: 3.5,
      disponibilidade: 'Manhã'
    },
    {
      id: 2,
      nome: 'Cuidador2',
      cidade: 'Pouso Alegre - MG',
      experienciaAnos: 3,
      experienciaTexto: '3 anos de experiência',
      precoHora: 25.00,
      avaliacao: 3.8,
      disponibilidade: 'Tarde'
    },
    {
      id: 3,
      nome: 'Cuidador3',
      cidade: 'Itajubá - MG',
      experienciaAnos: 4,
      experienciaTexto: '4 anos de experiência',
      precoHora: 25.00,
      avaliacao: 4.8,
      disponibilidade: 'Integral'
    },
    {
      id: 4,
      nome: 'Maria Silva',
      cidade: 'Santa Rita do Sapucaí - MG',
      experienciaAnos: 5,
      experienciaTexto: '5 anos de experiência',
      precoHora: 45.00,
      avaliacao: 4.9,
      disponibilidade: 'Integral'
    }
  ];

  // Lista filtrada que será exibida na tela
  cuidadoresFiltrados: Cuidador[] = [];

  // Variáveis do Filtro
  cidadeSelecionada: string = 'Todas';
  valorMaximoSelecionado: string = 'Todos';
  disponibilidadeSelecionada: string = 'Qualquer horário';
  experienciaMinimaSelecionada: string = 'Todas';

  ngOnInit(): void {
    this.cuidadoresFiltrados = [...this.cuidadores];
  }

  aplicarFiltros(): void {
    this.cuidadoresFiltrados = this.cuidadores.filter(cuidador => {
      // Filtro Cidade
      const atendeCidade = this.cidadeSelecionada === 'Todas' || cuidador.cidade === this.cidadeSelecionada;

      // Filtro Valor Máximo
      let atendeValor = true;
      if (this.valorMaximoSelecionado !== 'Todos') {
        const valorMax = parseFloat(this.valorMaximoSelecionado);
        atendeValor = cuidador.precoHora <= valorMax;
      }

      // Filtro Disponibilidade
      const atendeDisponibilidade = this.disponibilidadeSelecionada === 'Qualquer horário' ||
        cuidador.disponibilidade === this.disponibilidadeSelecionada;

      // Filtro Experiência Mínima
      let atendeExperiencia = true;
      if (this.experienciaMinimaSelecionada !== 'Todas') {
        const expMin = parseInt(this.experienciaMinimaSelecionada, 10);
        atendeExperiencia = cuidador.experienciaAnos >= expMin;
      }

      return atendeCidade && atendeValor && atendeDisponibilidade && atendeExperiencia;
    });
  }

  limparFiltros(): void {
    this.cidadeSelecionada = 'Todas';
    this.valorMaximoSelecionado = 'Todos';
    this.disponibilidadeSelecionada = 'Qualquer horário';
    this.experienciaMinimaSelecionada = 'Todas';
    this.cuidadoresFiltrados = [...this.cuidadores];
  }
}