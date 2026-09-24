import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface CuidadorPerfil {
  id: number;
  nome: string;
  especialidade: string;
  cidade: string;
  avaliacao: number;
  totalAvaliacoes: number;
  sobre: string;
  experienciaTexto: string;
  precoHora: number;
  telefone: string;
}

export interface AvaliacaoItem {
  cuidadorId: number;
  cuidadorNome: string;
  estrelas: number;
  comentario: string;
  data: string;
}

@Component({
  selector: 'app-profile-caregiver',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile-caregiver.html'
})
export class ProfileCaregiver implements OnInit {
  cuidador: CuidadorPerfil = {
    id: 1,
    nome: 'Maria Silva',
    especialidade: 'Cuidados Gerais & Acompanhamento',
    cidade: 'Santa Rita do Sapucaí - MG',
    avaliacao: 4.9,
    totalAvaliacoes: 48,
    sobre: 'Profissional com mais de 5 anos de experiência no acompanhamento e cuidado integral de idosos.',
    experienciaTexto: '5 anos de experiência',
    precoHora: 45.00,
    telefone: '(35) 99988-7766'
  };

  exibindoModalVinculo = false;
  idosoSelecionado = 'José da Silva (78 anos)';
  dataInicio = '';

  exibindoModalAvaliacoes = false;
  listaAvaliacoes: AvaliacaoItem[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.dataInicio = `${year}-${month}-${day}`;

    const perfilAtivo = localStorage.getItem('elderconnect_perfil_ativo');
    if (perfilAtivo) {
      try {
        const dados = JSON.parse(perfilAtivo);
        this.cuidador = {
          id: dados.id,
          nome: dados.nome,
          especialidade: dados.especialidade || 'Cuidados Geriátricos',
          cidade: dados.cidade,
          avaliacao: dados.avaliacao,
          totalAvaliacoes: dados.totalAvaliacoes,
          sobre: dados.sobre,
          experienciaTexto: dados.experienciaTexto || 'Experiência comprovada',
          precoHora: dados.precoHora,
          telefone: dados.telefone
        };

        const chaveCuidador = `elderconnect_cuidador_${dados.id}`;
        const dadosSalvos = localStorage.getItem(chaveCuidador);
        if (dadosSalvos) {
          const atualizado = JSON.parse(dadosSalvos);
          this.cuidador.avaliacao = atualizado.avaliacao;
          this.cuidador.totalAvaliacoes = atualizado.totalAvaliacoes;
        }
      } catch (e) {
        console.error('Erro ao carregar perfil', e);
      }
    }

    this.carregarAvaliacoes();
  }

  carregarAvaliacoes(): void {
    const salvas = localStorage.getItem('elderconnect_avaliacoes');
    let todas: AvaliacaoItem[] = [];

    if (salvas) {
      try {
        todas = JSON.parse(salvas);
      } catch (e) {
        todas = [];
      }
    }

    const filtradas = todas.filter(a => a.cuidadorId === this.cuidador.id);

    if (filtradas.length > 0) {
      this.listaAvaliacoes = filtradas.reverse();
    } else {
      this.listaAvaliacoes = [
        {
          cuidadorId: this.cuidador.id,
          cuidadorNome: this.cuidador.nome,
          estrelas: 5,
          comentario: 'Excelente profissional, muito pontual e atenciosa com meu pai.',
          data: '10/09/2026'
        },
        {
          cuidadorId: this.cuidador.id,
          cuidadorNome: this.cuidador.nome,
          estrelas: 5,
          comentario: 'Muito carinhosa e dedicada. Recomendo fortemente!',
          data: '02/08/2026'
        },
        {
          cuidadorId: this.cuidador.id,
          cuidadorNome: this.cuidador.nome,
          estrelas: 4,
          comentario: 'Ótima experiência no acompanhamento diário e administração dos medicamentos.',
          data: '15/07/2026'
        }
      ];
    }
  }

  abrirModalAvaliacoes(): void {
    this.carregarAvaliacoes();
    this.exibindoModalAvaliacoes = true;
  }

  fecharModalAvaliacoes(): void {
    this.exibindoModalAvaliacoes = false;
  }

  solicitarVinculo(): void {
    this.exibindoModalVinculo = true;
  }

  cancelarVinculo(): void {
    this.exibindoModalVinculo = false;
  }

  confirmarVinculo(): void {
    const dadosVinculo = {
      cuidadorId: this.cuidador.id,
      cuidadorNome: this.cuidador.nome,
      especialidade: this.cuidador.especialidade,
      telefone: this.cuidador.telefone,
      nome: 'José da Silva',
      idade: '78 anos',
      cidade: this.cuidador.cidade,
      responsavel: 'Ana Silva (Filha) - (35) 99887-1122',
      observacoes: 'Acompanhamento regular solicitado via plataforma.',
      dataInicio: this.dataInicio
    };

    localStorage.setItem('elderconnect_vinculo', JSON.stringify(dadosVinculo));
    this.exibindoModalVinculo = false;
    this.router.navigate(['/dashboard/elder']);
  }
}