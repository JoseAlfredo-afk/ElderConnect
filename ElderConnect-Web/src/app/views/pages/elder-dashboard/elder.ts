import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Authentication } from '../../../services/security/authentication';

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

export interface CuidadorContratado {

  contratoId: number;

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


  cuidadorContratado:
    CuidadorContratado | null = null;


  medicamentos:
    Medicamento[] = [];


  exibirModalAvaliacao:
    boolean = false;


  estrelasSelecionadas:
    number = 5;


  comentarioAvaliacao:
    string = '';


  exibirModalEncerrarVinculo:
    boolean = false;

  contratoParaAvaliar: ContractResponse | null = null;
  contratoRecusado: ContractResponse | null = null;
  contratoEmAvaliacao: ContractResponse | null = null;
  contratoPendente: ContractResponse | null = null;


  constructor(

    private authentication:
      Authentication,

    private http:
      HttpClient,

    private changeDetectorRef:
      ChangeDetectorRef

  ) { }


  ngOnInit(): void {


    console.log(
      'Dashboard do idoso carregado.'
    );


    const usuario =
      this.authentication
        .getAuthenticatedUser();


    if (!usuario) {

      console.error(
        'Usuário autenticado não encontrado.'
      );

      return;

    }


    this.nomeIdoso =
      usuario.fullname;


    console.log(
      'Usuário logado:',
      usuario
    );


    /*
     * CARREGA OS DADOS
     */
    this.carregarMedicamentos(
      usuario.id
    );


    this.carregarCuidadorVinculado(
      usuario.id
    );

    this.changeDetectorRef.detectChanges();

  }


  carregarMedicamentos(
    seniorId: number
  ): void {


    console.log(
      'Buscando medicamentos do idoso:',
      seniorId
    );


    this.http

      .get<MedicationSchedule[]>(

        `http://localhost:8081/api/schedule-medications/senior/${seniorId}`

      )

      .subscribe({

        next: (agendamentos) => {


          console.log(
            'Agendamentos recebidos:',
            agendamentos
          );


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


                    this.changeDetectorRef
                      .detectChanges();


                    console.log(
                      'Medicamento exibido:',
                      medicamento.medicationName
                    );

                  },


                  error: (erro) => {


                    console.error(

                      'Erro ao buscar medicamento:',

                      erro

                    );

                  }

                });

            });

          this.changeDetectorRef
            .detectChanges();

        },


        error: (erro) => {


          console.error(

            'Erro ao buscar medicamentos:',

            erro

          );


          this.medicamentos = [];


          this.changeDetectorRef
            .detectChanges();

        }

      });

  }

  carregarCuidadorVinculado(
    seniorId: number
  ): void {

    console.log('Buscando cuidador contratado:', seniorId);

    this.http.get<any[]>(`http://localhost:8081/api/contracts/senior-contracts/${seniorId}`).subscribe(
      {
        next: (contratos) => {

          console.log('Contratos recebidos:', contratos);

          const contratoAtivo =

            contratos.find(contrato => contrato.status === 'ATIVO');


          if (contratoAtivo) {
            this.cuidadorContratado = {
              contratoId: contratoAtivo.id,
              cuidadorId: contratoAtivo.caregiverId,
              cuidadorNome: contratoAtivo.caregiverName
            };
          } else {
            this.cuidadorContratado = null;
          }

          this.contratoPendente = contratos.find(contrato => contrato.status === 'PENDENTE') || null;

          const completosSemAvaliacao = contratos.filter(contrato => contrato.status === 'COMPLETO' && contrato.rating <= 0);

          this.contratoParaAvaliar = completosSemAvaliacao[0] || null;

          const cancelados = contratos.filter(contrato => contrato.status === 'CANCELADO');

          const ultimoContratoCancelado = cancelados[0];

          if (ultimoContratoCancelado) {

            const visualizado = localStorage.getItem(`contrato_recusado_${ultimoContratoCancelado.id}`);

            if (!visualizado) {

              this.contratoRecusado = ultimoContratoCancelado;
            } else {
              this.contratoRecusado = null;
            }
          } else {
            this.contratoRecusado = null;
          }

          this.changeDetectorRef.detectChanges();

        },
        error: (erro) => {
          console.error('Erro ao buscar cuidador contratado:', erro);
          this.cuidadorContratado = null;
          this.changeDetectorRef.detectChanges();
        }
      });
  }

  abrirAvaliacaoContrato(contrato: ContractResponse): void {
    this.contratoEmAvaliacao = contrato;
    this.estrelasSelecionadas = 5;
    this.comentarioAvaliacao = '';
    this.exibirModalAvaliacao = true;
    this.changeDetectorRef.detectChanges();
  }

  abrirModalEncerrarVinculo(): void {


    this.exibirModalEncerrarVinculo =
      true;


    this.changeDetectorRef
      .detectChanges();

  }


  fecharModalEncerrarVinculo(): void {


    this.exibirModalEncerrarVinculo =
      false;


    this.changeDetectorRef
      .detectChanges();

  }


  confirmarEncerramentoVinculo(): void {

    if (!this.cuidadorContratado) {
      return;
    }

    const contratoId = this.cuidadorContratado.contratoId;

    const hoje = new Date();

    const ano =
      hoje.getFullYear();

    const mes =
      String(
        hoje.getMonth() + 1
      ).padStart(2, '0');

    const dia =
      String(
        hoje.getDate()
      ).padStart(2, '0');

    const endDate =
      `${ano}-${mes}-${dia}`;

    this.http.patch(`http://localhost:8081/api/contracts/${contratoId}/finish`, { endDate: endDate }).subscribe({

      next: () => {
        console.log('Contrato finalizado com sucesso.');

        this.fecharModalEncerrarVinculo();

        this.abrirModalAvaliacao();
      },

      error: erro => {

        console.error('Erro ao finalizae contrato', erro);

        alert('Não foi possível encerrar o vínculo.');
      }
    });
  }

  abrirModalAvaliacao(): void {


    this.estrelasSelecionadas =
      5;


    this.comentarioAvaliacao =
      '';


    this.exibirModalAvaliacao =
      true;


    this.changeDetectorRef
      .detectChanges();

  }


  fecharModalAvaliacao(): void {
    this.exibirModalAvaliacao = false;
    this.contratoEmAvaliacao = null;
    this.changeDetectorRef.detectChanges();
  }


  selecionarEstrelas(
    qtd: number
  ): void {


    this.estrelasSelecionadas =
      qtd;


    this.changeDetectorRef
      .detectChanges();

  }


  salvarAvaliacao(): void {

    if (!this.contratoEmAvaliacao) {
      return;
    }

    const contratoId = this.contratoEmAvaliacao.id;

    const avaliacao = {

      rating: this.estrelasSelecionadas,

      comment: this.comentarioAvaliacao.trim()
    };

    this.http.patch(`http://localhost:8081/api/contracts/${contratoId}/rating`, avaliacao).subscribe(
      {
        next: () => {
          console.log('Avaliação salva com sucesso.');

          this.fecharModalAvaliacao();

          this.contratoEmAvaliacao = null;

          const usuario = this.authentication.getAuthenticatedUser();

          this.carregarCuidadorVinculado(usuario.id);
        },

        error: erro => {

          console.error('Erro ao salvar avaliação:', erro);

          alert('Não foi possível salvar a avaliação.');

        }

      });

  }

  fecharAvisoContratoRecusado(): void {
    if (!this.contratoRecusado) {
      return;
    }
    localStorage.setItem(`contrato_recusado_${this.contratoRecusado.id}`, 'visualizado');
    this.contratoRecusado = null;
  }

}
