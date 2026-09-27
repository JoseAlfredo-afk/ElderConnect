import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Authentication } from '../../../services/security/authentication';

export interface CuidadorContratado {
  cuidadorId: number;
  cuidadorNome: string;
  telefone?: string;
  especialidade?: string;
}

export interface Medicamento {
  nome: string;
  dosagem: string;
  horario: string;
  instrucoes: string;
}

interface MedicationSchedule {
  id: number;
  dosageInstructions: string;
  intakeTime: string;
  seniorId: number;
  medicationId: number;
}

interface Medication {
  id: number;
  medicationName: string;
  dose: string;
}

@Component({
  selector: 'app-elder-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './elder.html'
})
export class ElderDashboard implements OnInit {

  nomeIdoso: string = '';

  cuidadorContratado: CuidadorContratado | null = null;

  medicamentos: Medicamento[] = [];

  exibirModalAvaliacao: boolean = false;

  estrelasSelecionadas: number = 5;

  comentarioAvaliacao: string = '';

  exibirModalEncerrarVinculo: boolean = false;


  constructor(
    private authentication: Authentication,
    private http: HttpClient
  ) {}


  ngOnInit(): void {

    const usuario =
      this.authentication.getAuthenticatedUser();

    this.nomeIdoso =
      usuario.fullname;

    this.carregarMedicamentos(
      usuario.id
    );

    this.carregarCuidadorVinculado(
      usuario.id
    );
  }


  // ==========================================
  // CARREGAR MEDICAMENTOS DO BANCO
  // ==========================================

  carregarMedicamentos(
    seniorId: number
  ): void {

    this.http
      .get<MedicationSchedule[]>(
        `http://localhost:8081/api/schedule-medications/senior/${seniorId}`
      )
      .subscribe({

        next: (agendamentos) => {

          this.medicamentos = [];

          agendamentos.forEach(
            (agendamento) => {

              this.http
                .get<Medication>(
                  `http://localhost:8081/api/medications/${agendamento.medicationId}`
                )
                .subscribe({

                  next: (medicamento) => {

                    this.medicamentos.push({

                      nome:
                        medicamento.medicationName,

                      dosagem:
                        medicamento.dose,

                      horario:
                        agendamento.intakeTime,

                      instrucoes:
                        agendamento.dosageInstructions

                    });

                  },

                  error: (erro) => {

                    console.error(
                      'Erro ao buscar medicamento:',
                      erro
                    );

                  }

                });

            });

        },

        error: (erro) => {

          console.error(
            'Erro ao buscar medicamentos:',
            erro
          );

          this.medicamentos = [];

        }

      });
  }


  // ==========================================
  // CARREGAR CUIDADOR CONTRATADO
  // ==========================================

  carregarCuidadorVinculado(
    seniorId: number
  ): void {

    this.http
      .get<any[]>(
        `http://localhost:8081/api/contracts/senior-contracts/${seniorId}`
      )
      .subscribe({

        next: (contratos) => {

          const contratoAtivo =
            contratos.find(
              contrato =>
                contrato.status === 'ATIVO'
            );

          if (!contratoAtivo) {

            this.cuidadorContratado = null;

            return;
          }

          this.cuidadorContratado = {

            cuidadorId:
              contratoAtivo.caregiverId,

            cuidadorNome:
              contratoAtivo.caregiverName

          };

        },

        error: (erro) => {

          console.error(
            'Erro ao buscar cuidador contratado:',
            erro
          );

          this.cuidadorContratado = null;

        }

      });
  }


  // ==========================================
  // MODAL ENCERRAR VÍNCULO
  // ==========================================

  abrirModalEncerrarVinculo(): void {

    this.exibirModalEncerrarVinculo =
      true;
  }


  fecharModalEncerrarVinculo(): void {

    this.exibirModalEncerrarVinculo =
      false;
  }


  confirmarEncerramentoVinculo(): void {

    this.cuidadorContratado = null;

    this.fecharModalEncerrarVinculo();

  }


  // ==========================================
  // AVALIAÇÃO
  // ==========================================

  abrirModalAvaliacao(): void {

    this.estrelasSelecionadas = 5;

    this.comentarioAvaliacao = '';

    this.exibirModalAvaliacao = true;

  }


  fecharModalAvaliacao(): void {

    this.exibirModalAvaliacao = false;

  }


  selecionarEstrelas(
    qtd: number
  ): void {

    this.estrelasSelecionadas =
      qtd;

  }


  salvarAvaliacao(): void {

    if (!this.cuidadorContratado) {
      return;
    }

    console.log(
      'Avaliação:',
      this.estrelasSelecionadas,
      this.comentarioAvaliacao
    );

    this.fecharModalAvaliacao();

  }

}