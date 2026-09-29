import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface CuidadorPerfil {
  id: number;
  nome: string;
  especialidade: string;
  cidade: string;
  avaliacao: number;
  totalAvaliacoes: number;
  sobre: string;
  experienciaTexto: string;
  disponibilidade: string;
  periodoDisponibilidade: string;
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

interface ContractResponse {
  id: number;
  seniorId: number;
  seniorName: string;
  caregiverId: number;
  caregiverName: string;
  status: string;
  endDate: string | null;
  rating: number;
  comment: string | null;
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
    disponibilidade: 'Segunda, Quarta e Sextas - Tempo integral',
    periodoDisponibilidade: 'Integral',
    precoHora: 45.00,
    telefone: '(35) 99988-7766'
  };

  exibindoModalVinculo = false;
  idosoSelecionado = 'José da Silva (78 anos)';
  dataInicio = '';

  exibindoModalAvaliacoes = false;
  listaAvaliacoes: AvaliacaoItem[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    this.dataInicio = `${year}-${month}-${day}`;
    this.carregarPerfilCuidador();
    this.carregarAvaliacoes();
  }

  private carregarPerfilCuidador(): void {
    const perfilAtivo = localStorage.getItem('elderconnect_perfil_ativo');

    if (!perfilAtivo) {
      console.warn('Nenhum cuidador foi selecionado.');
      return;
    }

    try {
      const dados = JSON.parse(perfilAtivo);

      this.cuidador = {
        id: dados.id,
        nome: dados.nome,
        especialidade: dados.especialidade,
        cidade: dados.cidade,
        avaliacao: dados.avaliacao,
        totalAvaliacoes: dados.totalAvaliacoes ?? 0,
        sobre: dados.sobre,
        experienciaTexto: dados.experienciaTexto,
        disponibilidade: dados.disponibilidade,
        periodoDisponibilidade: dados.periodoDisponibilidade,
        precoHora: dados.precoHora ?? 0,
        telefone: dados.telefone
      };
    } catch (erro) {
      console.error('Erro ao carregar perfil', erro);
    }
  }

  carregarAvaliacoes(): void {
    const caregiverId = this.cuidador.id;

    if (!caregiverId) {
      this.listaAvaliacoes = [];
      this.cuidador.avaliacao = 0;
      this.cuidador.totalAvaliacoes = 0;
      return;
    }

    this.http.get<ContractResponse[]>(`http://localhost:8081/api/contracts/caregiver-contracts/${caregiverId}`).subscribe(
      {
        next: contratos => {
          const contratosAvaliados = contratos.filter(
            contrato => contrato.status === 'COMPLETO' && contrato.rating > 0
          );

          this.listaAvaliacoes = contratosAvaliados.map(contrato => (
            {
              cuidadorId: contrato.caregiverId,
              cuidadorNome: contrato.caregiverName,
              estrelas: contrato.rating,
              comentario: contrato.comment || '',
              data: this.formatarData(contrato.endDate)
            })
          )
            .reverse();

          this.atualizarMediaAvaliacao(contratosAvaliados);
        },
        error: erro => {
          console.error('Erro ao carregar avaliações', erro);
          this.listaAvaliacoes = [];
          this.cuidador.avaliacao = 0;
          this.cuidador.totalAvaliacoes = 0;
        }
      });
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

  private atualizarMediaAvaliacao(contratos: ContractResponse[]): void {


    if (contratos.length === 0) {
      this.cuidador.avaliacao = 0;
      this.cuidador.totalAvaliacoes = 0;
      return;
    }

    const somaDasNotas = contratos.reduce((total, contrato) => total + contrato.rating, 0);

    this.cuidador.avaliacao = somaDasNotas / contratos.length;

    this.cuidador.totalAvaliacoes = contratos.length;

  }

  private formatarData(data?: string | null): string {
    if (!data) {
      return '';
    }

    if (data.includes('-')) {
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
    }

    return data;
  }
}
