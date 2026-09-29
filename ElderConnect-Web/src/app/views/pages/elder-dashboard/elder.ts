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
import { raceWith } from 'rxjs';


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


    /*
     * GARANTE A ATUALIZAÇÃO DA TELA
     */
    this.changeDetectorRef.detectChanges();

  }


  // ==========================================
  // CARREGAR MEDICAMENTOS DO BANCO
  // ==========================================

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


                    /*
                     * ATUALIZA A TELA
                     */
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


          /*
           * ATUALIZA A TELA APÓS
           * RECEBER OS AGENDAMENTOS
           */
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


  // ==========================================
  // CARREGAR CUIDADOR CONTRATADO
  // ==========================================

  carregarCuidadorVinculado(
    seniorId: number
  ): void {


    console.log(
      'Buscando cuidador contratado:',
      seniorId
    );


    this.http

      .get<any[]>(

        `http://localhost:8081/api/contracts/senior-contracts/${seniorId}`

      )

      .subscribe({

        next: (contratos) => {


          console.log(
            'Contratos recebidos:',
            contratos
          );


          const contratoAtivo =

            contratos.find(

              contrato =>
                contrato.status ===
                'ATIVO'

            );


          if (!contratoAtivo) {


            this.cuidadorContratado =
              null;


            this.changeDetectorRef
              .detectChanges();


            return;

          }


          this.cuidadorContratado = {

            contratoId:
              contratoAtivo.id,


            cuidadorId:
              contratoAtivo.caregiverId,


            cuidadorNome:
              contratoAtivo.caregiverName

          };


          /*
           * ATUALIZA A TELA
           */
          this.changeDetectorRef
            .detectChanges();


          console.log(
            'Cuidador exibido:',
            this.cuidadorContratado
          );

        },


        error: (erro) => {


          console.error(

            'Erro ao buscar cuidador contratado:',

            erro

          );


          this.cuidadorContratado =
            null;


          this.changeDetectorRef
            .detectChanges();

        }

      });

  }


  // ==========================================
  // MODAL ENCERRAR VÍNCULO
  // ==========================================

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

    const hoje = new Date().toISOString().split('T')[0];

    this.http.patch(`http://localhost:8081/api/contracts/${contratoId}/finish`, { endDate: hoje }).subscribe({

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


  // ==========================================
  // AVALIAÇÃO
  // ==========================================

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


    this.exibirModalAvaliacao =
      false;


    this.changeDetectorRef
      .detectChanges();

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

    if (!this.cuidadorContratado) {
      return;
    }

    const contratoId = this.cuidadorContratado.contratoId;

    const avaliacao = {

      rating: this.estrelasSelecionadas,

      comment: this.comentarioAvaliacao.trim()
    };

    this.http.patch(`http://localhost:8081/api/contracts/${contratoId}/rating`, avaliacao).subscribe(
      {
        next: () => {
          console.log('Avaliação salva com sucesso.');

          this.fecharModalAvaliacao();

          const usuario = this.authentication.getAuthenticatedUser();

          this.carregarCuidadorVinculado(usuario.id);
        },

        error: erro => {

          console.error('Erro ao salvar avaliação:', erro);

          alert('Não foi possível salvar a avaliação.');

        }

      });

  }

}
