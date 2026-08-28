import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

export interface Caregiver {
  id: number;
  nome: string;
  especialidade: string;
  cidade: string;
  avaliacao: number;
  totalAvaliacoes: number;
  sobre: string;
  experiencia: string;
  precoHora: string;
  telefone: string;
}

@Component({
  selector: 'app-profile-caregiver',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-caregiver.html'
})
export class ProfileCaregiver implements OnInit {
  cuidador: Caregiver = {
    id: 1,
    nome: 'Maria Silva',
    especialidade: 'Cuidados Gerais & Acompanhamento',
    cidade: 'Santa Rita do Sapucaí - MG',
    avaliacao: 4.9,
    totalAvaliacoes: 48,
    sobre: 'Profissional com mais de 5 anos de experiência no acompanhamento e cuidado de idosos.',
    experiencia: '5 anos de experiência',
    precoHora: 'R$ 45/h',
    telefone: '(35) 99988-7766'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.carregarPerfilAtualizado();
  }

  carregarPerfilAtualizado(): void {
    const dadosSalvos = localStorage.getItem(`elderconnect_cuidador_${this.cuidador.id}`);
    if (dadosSalvos) {
      try {
        const cuidadorAtualizado = JSON.parse(dadosSalvos);
        this.cuidador.avaliacao = cuidadorAtualizado.avaliacao;
        this.cuidador.totalAvaliacoes = cuidadorAtualizado.totalAvaliacoes;
      } catch (e) {
        console.error('Erro ao carregar dados do cuidador', e);
      }
    }
  }

  solicitarVinculo(): void {
    const dadosVinculo = {
      cuidadorId: this.cuidador.id,
      cuidadorNome: this.cuidador.nome,
      nome: 'José da Silva',
      idade: '78 anos',
      cidade: 'Santa Rita do Sapucaí - MG',
      responsavel: 'Ana Silva (Filha) - (35) 99887-1122',
      observacoes: 'Hipertenso. Necessita de auxílio para caminhadas matinais e acompanhamento nos horários de medicação.'
    };

    localStorage.setItem('elderconnect_vinculo', JSON.stringify(dadosVinculo));
    alert('Solicitação de vínculo realizada com sucesso!');
    this.router.navigate(['/dashboard/elder']);
  }
}