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

      },

      error: erro => {
        console.error('Erro ao carregar cuidadores: ',erro);

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
    }
  }


  aplicarFiltros(): void {
    this.cuidadoresFiltrados = this.cuidadores.filter(cuidador => {
      const atendeCidade = this.cidadeSelecionada === 'Todas' || this.cidadeCorresponde(cuidador.cidade);

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

  private cidadeCorresponde(cidadeCuidador: string): boolean {
    const cidadeSelecionada = this.cidadeSelecionada.split(' - ')[0].trim().toLowerCase();
    const cidadeAtual = cidadeCuidador.trim().toLowerCase();

    return cidadeAtual === cidadeSelecionada || cidadeAtual.startsWith(cidadeSelecionada);
  }

  verPerfil(cuidador: Cuidador): void {
    localStorage.setItem('elderconnect_perfil_ativo', JSON.stringify(cuidador));
    this.router.navigate(['/profile-caregiver']);
  }
}
