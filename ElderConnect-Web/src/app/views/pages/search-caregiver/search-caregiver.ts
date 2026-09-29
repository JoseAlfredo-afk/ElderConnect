import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface CaregiverResponse {
  id: number;
  fullname: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  userType: string;
  birthDate: string;
  availabilitySchedule: string;
  streetAddress: string;
  specialization: string;
  city: string;
  neighborhood: string;
  experience: string;
  hourlyRate: number;
  experienceYears?: number;
  availabilityPeriod: string;
}

interface ContractResponse {
  id: number;
  caregiverId: number;
  caregiverName: string;
  status: string;
  rating: number;
  comment: string | null;
}

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
  periodoDisponibilidade: string;
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

  cuidadores: Cuidador[] = [];

  cuidadoresFiltrados: Cuidador[] = [];

  cidadeSelecionada: string = 'Todas';
  valorMaximoSelecionado: string = 'Todos';
  disponibilidadeSelecionada: string = 'Qualquer horário';
  experienciaMinimaSelecionada: string = 'Todas';

  constructor(
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.carregarCuidadores();
  }

  carregarCuidadores(): void {

    this.http.get<CaregiverResponse[]>('http://localhost:8081/api/user/caregivers').subscribe({

      next: dados => {

        this.cuidadores = dados.map(cuidador => this.converterCuidador(cuidador));

        this.cuidadoresFiltrados = [...this.cuidadores];

        this.cuidadores.forEach(cuidador => { this.carregarAvaliacaoCuidador(cuidador); });

      },

      error: erro => {
        console.error('Erro ao carregar cuidadores: ', erro);

        this.cuidadores = [];

        this.cuidadoresFiltrados = [];

      }
    }
    );
  }

  private converterCuidador(cuidador: CaregiverResponse): Cuidador {

    return {
      id: cuidador.id,
      nome: cuidador.fullname,
      cidade: cuidador.city,
      experienciaAnos: cuidador.experienceYears ?? 0,
      experienciaTexto: cuidador.experience,
      disponibilidade: cuidador.availabilitySchedule,
      periodoDisponibilidade: cuidador.availabilityPeriod,
      especialidade: cuidador.specialization,
      sobre: cuidador.experience,
      telefone: cuidador.phoneNumber,
      precoHora: cuidador.hourlyRate,
      avaliacao: 0,
      totalAvaliacoes: 0,
    };
  }

  private carregarAvaliacaoCuidador(cuidador: Cuidador): void {

    this.http.get<ContractResponse[]>(`http://localhost:8081/api/contracts/caregiver-contracts/${cuidador.id}`).subscribe({

      next: contratos => {

        const contratosAvaliados = contratos.filter(contrato => contrato.status === 'COMPLETO' && contrato.rating > 0);

        cuidador.totalAvaliacoes = contratosAvaliados.length;

        if (contratosAvaliados.length === 0) {
          cuidador.avaliacao = 0;
          return;
        }

        const somaDasNotas = contratosAvaliados.reduce((total, contrato) => total + contrato.rating, 0);

        cuidador.avaliacao = somaDasNotas / contratosAvaliados.length;
      },

      error: erro => {
        console.error(
          `Erro ao carregar avaliações do cuidador ${cuidador.id}:`, erro);
        cuidador.avaliacao = 0;
        cuidador.totalAvaliacoes = 0;
      }
    });
  }

  aplicarFiltros(): void {
    this.cuidadoresFiltrados = this.cuidadores.filter(cuidador => {
      const atendeCidade = this.cidadeSelecionada === 'Todas' ||
        cuidador.cidade.trim().toLowerCase() === this.cidadeSelecionada.trim().toLowerCase();

      let atendeValor = true;
      if (this.valorMaximoSelecionado !== 'Todos') {
        const valorMax = parseFloat(this.valorMaximoSelecionado);
        atendeValor = cuidador.precoHora <= valorMax;
      }

      const atendeDisponibilidade = this.disponibilidadeSelecionada === 'Qualquer horário' ||
        cuidador.periodoDisponibilidade === this.disponibilidadeSelecionada;

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

  get cidadesDisponiveis(): string[] {
    const cidades = this.cuidadores.map(cuidador => cuidador.cidade);
    return Array.from(new Set(cidades.filter(Boolean)));
  }

  verPerfil(cuidador: Cuidador): void {
    localStorage.setItem('elderconnect_perfil_ativo', JSON.stringify(cuidador));
    this.router.navigate(['/profile-caregiver']);
  }
}
