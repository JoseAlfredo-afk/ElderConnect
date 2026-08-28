import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@Component({
  selector: 'app-profile-caregiver',
  standalone: true,
  imports: [CommonModule, RouterLink],
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

  constructor(private router: Router) { }

  ngOnInit(): void {
    // 1. Tenta carregar o perfil específico clicado na busca
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

        // 2. Verifica se há avaliações atualizadas salvas para este ID específico
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
  }

  solicitarVinculo(): void {
    const dadosVinculo = {
      cuidadorId: this.cuidador.id,
      cuidadorNome: this.cuidador.nome,
      especialidade: this.cuidador.especialidade,
      telefone: this.cuidador.telefone,
      nome: 'José da Silva',
      idade: '78 anos',
      cidade: this.cuidador.cidade,
      responsavel: 'Ana Silva (Filha) - (35) 99887-1122',
      observacoes: 'Acompanhamento regular solicitado via plataforma.'
    };

    localStorage.setItem('elderconnect_vinculo', JSON.stringify(dadosVinculo));
    alert(`Solicitação de vínculo enviada para ${this.cuidador.nome} com sucesso!`);
    this.router.navigate(['/dashboard/elder']);
  }
}