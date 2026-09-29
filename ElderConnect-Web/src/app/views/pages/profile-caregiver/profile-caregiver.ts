import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Authentication } from '../../../services/security/authentication';

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
  contractNumber: string
  seniorId: number;
  seniorName: string;
  caregiverId: number;
  caregiverName: string;
  startDate: string;
  contractValue: number;
  status: string;
  workingHours: string;
  description: string;
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
    id: 0,
    nome: '',
    especialidade: '',
    cidade: '',
    avaliacao: 0,
    totalAvaliacoes: 0,
    sobre: '',
    experienciaTexto: '',
    disponibilidade: '',
    periodoDisponibilidade: '',
    precoHora: 0,
    telefone: ''
  };

  exibindoModalVinculo = false;
  idosoSelecionado = '';
  dataInicio = '';
  valorContrato = 0;
  horarioContrato = '';
  descricaoContrato = '';

  exibindoModalAvaliacoes = false;
  listaAvaliacoes: AvaliacaoItem[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private authentication: Authentication
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    this.dataInicio = `${year}-${month}-${day}`;

    const usuario = this.authentication.usuarioAtual();

    if (usuario) { this.idosoSelecionado = usuario.fullname; }

    this.carregarPerfilCuidador();
    this.carregarAvaliacoes();
  }

  private carregarPerfilCuidador(): void {
    const perfilAtivo = localStorage.getItem('elderconnect_perfil_ativo');

    if (!perfilAtivo) {
      console.warn('Nenhum cuidador foi selecionado.');

      this.router.navigate(['/dashboard/search-caregiver']);

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

      this.router.navigate(['/dashboard/search-caregiver']);
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
    this.horarioContrato = this.cuidador.disponibilidade;

    this.descricaoContrato = 'Escreva aqui'

    this.valorContrato = 0;

    this.exibindoModalVinculo = true;
  }

  cancelarVinculo(): void {
    this.exibindoModalVinculo = false;
  }

  confirmarVinculo(): void {

    const usuario = this.authentication.getAuthenticatedUser();

    if (!usuario) {
      return;
    }

    if (usuario.userType.toUpperCase() !== 'IDOSO') {
      alert('Apenas idosos podem solicitar um vinculo.');

      return;
    }

    if (!this.cuidador.id || this.cuidador.id <= 0) {

      alert('Cuidador inválido');


      return;
    }

    if (this.valorContrato === null || this.valorContrato <= 0) {
      alert('Informe um valor válido para o contrato');
      return;
    }

    if (!this.horarioContrato || !this.horarioContrato.trim()) {
      alert('Informe os horários do contrato.');

      return;
    }

    if (!this.descricaoContrato || !this.descricaoContrato.trim()) {
      alert('Informe uma descrição para o contrato.');

      return;
    }

    const contrato = {

      startDate: this.dataInicio,
      contractValue: this.valorContrato,
      workingHours: this.horarioContrato.trim(),
      description: this.descricaoContrato.trim(),
      seniorId: usuario.id,
      caregiverId: this.cuidador.id
    };

    this.http.post('http://localhost:8081/api/contracts', contrato).subscribe({
      next: () => {

        alert('Solicitação enviada ao cuidador!');

        this.exibindoModalVinculo = false;

        this.router.navigate(['/dashboard/elder']);
      },


      error: erro => {

        console.error('Erro ao criar contrato:', erro);

        alert('Não foi possível enviar a solicitação de vínculo.');
      }
    })
  }

  private obterDataAtual(): string {

    const hoje = new Date();

    const ano = hoje.getFullYear();

    const mes = String(hoje.getMonth() + 1).padStart(2, '0');

    const dia = String(hoje.getDate()).padStart(2, '0');

    return (`${ano}-${mes}-${dia}`);
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
