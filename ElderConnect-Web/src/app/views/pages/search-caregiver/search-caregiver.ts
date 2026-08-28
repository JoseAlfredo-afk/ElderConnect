import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface Cuidador {
  id: number;
  nome: string;
  cidade: string;
  experienciaAnos: number;
  experienciaTexto: string;
  precoHora: number;
  avaliacao: number;
  totalAvaliacoes: number;
  disponibilidade: string;
  especialidade: string;
  sobre: string;
  telefone: string;
}

@Component({
  selector: 'app-search-caregiver',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-caregiver.html'
})
export class SearchCaregiver implements OnInit {
  cuidadores: Cuidador[] = [
    {
      id: 1,
      nome: 'Ana Paula Souza',
      cidade: 'Goiânia - GO',
      experienciaAnos: 5,
      experienciaTexto: '5 anos de experiência',
      precoHora: 25.00,
      avaliacao: 3.5,
      totalAvaliacoes: 24,
      disponibilidade: 'Manhã',
      especialidade: 'Cuidados com Mobilidade & Enfermagem Básica',
      sobre: 'Enfermeira de formação com foco em reabilitação de idosos, administração correta de medicamentos e suporte diário.',
      telefone: '(62) 98877-1122'
    },
    {
      id: 2,
      nome: 'Carlos Eduardo Lima',
      cidade: 'Pouso Alegre - MG',
      experienciaAnos: 3,
      experienciaTexto: '3 anos de experiência',
      precoHora: 25.00,
      avaliacao: 3.8,
      totalAvaliacoes: 18,
      disponibilidade: 'Tarde',
      especialidade: 'Acompanhamento Geriátrico & Companhia',
      sobre: 'Profissional dedicado ao bem-estar e entretenimento de idosos, com ampla facilidade para caminhadas e conversas.',
      telefone: '(35) 99112-3344'
    },
    {
      id: 3,
      nome: 'Mariana Ribeiro',
      cidade: 'Itajubá - MG',
      experienciaAnos: 4,
      experienciaTexto: '4 anos de experiência',
      precoHora: 25.00,
      avaliacao: 4.8,
      totalAvaliacoes: 42,
      disponibilidade: 'Integral',
      especialidade: 'Cuidadora Especializada em Alzheimer & Parkinson',
      sobre: 'Especialista em cuidados a pacientes com doenças neurodegenerativas, oferecendo um ambiente seguro, empático e estruturado.',
      telefone: '(35) 98833-5566'
    },
    {
      id: 4,
      nome: 'Maria Silva',
      cidade: 'Santa Rita do Sapucaí - MG',
      experienciaAnos: 6,
      experienciaTexto: '6 anos de experiência',
      precoHora: 45.00,
      avaliacao: 4.9,
      totalAvaliacoes: 48,
      disponibilidade: 'Integral',
      especialidade: 'Cuidados Gerais & Acompanhamento',
      sobre: 'Profissional com mais de 5 anos de experiência no acompanhamento e cuidado integral de idosos, com referências locais.',
      telefone: '(35) 99988-7766'
    }
  ];

  cuidadoresFiltrados: Cuidador[] = [];

  cidadeSelecionada: string = 'Todas';
  valorMaximoSelecionado: string = 'Todos';
  disponibilidadeSelecionada: string = 'Qualquer horário';
  experienciaMinimaSelecionada: string = 'Todas';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.cuidadoresFiltrados = [...this.cuidadores];
  }

  aplicarFiltros(): void {
    this.cuidadoresFiltrados = this.cuidadores.filter(cuidador => {
      const atendeCidade = this.cidadeSelecionada === 'Todas' || cuidador.cidade === this.cidadeSelecionada;

      let atendeValor = true;
      if (this.valorMaximoSelecionado !== 'Todos') {
        const valorMax = parseFloat(this.valorMaximoSelecionado);
        atendeValor = cuidador.precoHora <= valorMax;
      }

      const atendeDisponibilidade = this.disponibilidadeSelecionada === 'Qualquer horário' ||
        cuidador.disponibilidade === this.disponibilidadeSelecionada;

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

  verPerfil(cuidador: Cuidador): void {
    localStorage.setItem('elderconnect_perfil_ativo', JSON.stringify(cuidador));
    this.router.navigate(['/profile-caregiver']);
  }
}