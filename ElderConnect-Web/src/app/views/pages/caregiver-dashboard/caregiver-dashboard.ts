import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface IdosoVinculado {
  cuidadorId: number;
  cuidadorNome: string;
  nome: string;
  idade: string;
  cidade: string;
  responsavel: string;
  observacoes: string;
}

export interface Medicamento {
  nome: string;
  dosagem: string;
  horario: string;
  instrucoes: string;
}

export interface Aviso {
  tipo: string;
  mensagem: string;
}

@Component({
  selector: 'app-caregiver-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caregiver-dashboard.html'
})
export class CaregiverDashboard implements OnInit {
  nomeCuidador: string = 'Maria Silva';
  idosoVinculado: IdosoVinculado | null = null;

  medicamentos: Medicamento[] = [
    {
      nome: 'Loratadina',
      dosagem: '1 compr.',
      horario: '07:30',
      instrucoes: 'Sem instruções'
    },
    {
      nome: 'Omeprazol',
      dosagem: '20mg',
      horario: '12:00',
      instrucoes: 'Jejum ou antes do almoço'
    }
  ];

  avisos: Aviso[] = [
    {
      tipo: 'Aviso',
      mensagem: 'Acompanhar nas atividades diárias e medições.'
    }
  ];

  ngOnInit(): void {
    this.carregarVinculo();
  }

  carregarVinculo(): void {
    const vinculoSalvo = localStorage.getItem('elderconnect_vinculo');

    if (vinculoSalvo) {
      try {
        const dados = JSON.parse(vinculoSalvo);

        // Trata o nome do idoso garantindo que não seja igual ao da cuidadora
        let nomeIdosoFinal = dados.nome;
        if (!nomeIdosoFinal || nomeIdosoFinal === this.nomeCuidador) {
          nomeIdosoFinal = 'José da Silva';
        }

        this.idosoVinculado = {
          cuidadorId: dados.cuidadorId || 1,
          cuidadorNome: dados.cuidadorNome || this.nomeCuidador,
          nome: nomeIdosoFinal,
          idade: dados.idade || '78 anos',
          cidade: dados.cidade || 'Santa Rita do Sapucaí - MG',
          responsavel: dados.responsavel || 'Ana Silva (Filha) - (35) 99887-1122',
          observacoes: dados.observacoes || 'Hipertenso. Necessita de auxílio para caminhadas matinais e acompanhamento nos horários de medicação.'
        };
      } catch (e) {
        this.definirVinculoPadrao();
      }
    } else {
      this.definirVinculoPadrao();
    }
  }

  private definirVinculoPadrao(): void {
    this.idosoVinculado = {
      cuidadorId: 1,
      cuidadorNome: this.nomeCuidador,
      nome: 'José da Silva',
      idade: '78 anos',
      cidade: 'Santa Rita do Sapucaí - MG',
      responsavel: 'Ana Silva (Filha) - (35) 99887-1122',
      observacoes: 'Hipertenso. Necessita de auxílio para caminhadas matinais e acompanhamento nos horários de medicação.'
    };
  }

  desfazerVinculo(): void {
    const confirmacao = window.confirm('Tem certeza que deseja encerrar o vínculo com este idoso?');

    if (confirmacao) {
      localStorage.removeItem('elderconnect_vinculo');
      this.idosoVinculado = null;
      alert('Vínculo encerrado com sucesso.');
    }
  }
}