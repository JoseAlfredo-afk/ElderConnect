import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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

interface UserResponse {
  id: number;
  fullname: string;
  phoneNumber: string;
  birthDate: string;
  userType: string;
}


export interface IdosoVinculado {
  contratoId: number;
  seniorId: number;
  nome: string;
  idade: string;
  telefone: string;
  horario: string;
  valorContrato: number;
  observacoes: string;
  dataInicio: string;
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
  nomeCuidador: string = '';
  caregiverId = 0;
  solicitacoesPendentes: ContractResponse[] = [];
  contratoAtivo: ContractResponse | null = null;
  idosoVinculado: IdosoVinculado | null = null;
  exibirModalEncerrarVinculo: boolean = false;

  medicamentos: Medicamento[] = [];

  avisos: Aviso[] = [];


  constructor(
    private http: HttpClient,
    private authentication: Authentication
  ) { }

  ngOnInit(): void {

    const usuario = this.authentication.usuarioAtual();

    if (!usuario) {

      console.error('Usuário autenticado não encontrado.');

      return;
    }

    if (usuario.userType.toUpperCase() !== 'CUIDADOR') {

      console.error('O usuário logado não é cuidador.');

      return;
    }

    this.nomeCuidador = usuario.fullname;
    this.caregiverId = usuario.id

    this.carregarContratos();
  }

  carregarContratos(): void {

    if (!this.caregiverId || this.caregiverId <= 0) {
      return;
    }

    this.http.get<ContractResponse[]>(`http://localhost:8081/api/contracts/caregiver-contracts/${this.caregiverId}`).subscribe({

      next: contratos => {
        this.solicitacoesPendentes = contratos.filter(contrato => contrato.status === 'PENDENTE');

        this.contratoAtivo = contratos.find(contrato => contrato.status === 'ATIVO') || null;


        if (this.contratoAtivo) {

          this.carregarIdosoVinculado(this.contratoAtivo);

          this.carregarMedicamentos(this.contratoAtivo.seniorId);
        } else {

          this.idosoVinculado = null;

          this.medicamentos = [];
        }
      },

      error: erro => {

        console.error('Erro ao carregar contratos:', erro);

        this.solicitacoesPendentes = [];

        this.contratoAtivo = null;

        this.idosoVinculado = null;

        this.medicamentos = [];
      }
    });
  }

  private carregarIdosoVinculado(contrato: ContractResponse): void {

    this.idosoVinculado = {

      contratoId: contrato.id,
      seniorId: contrato.seniorId,
      nome: contrato.seniorName,
      observacoes: contrato.description,
      horario: contrato.workingHours,
      valorContrato: contrato.contractValue,
      dataInicio: contrato.startDate,
      idade: 'Não Informado',
      telefone: 'Não Informado'
    }

    this.http.get<UserResponse>(`http://localhost:8081/api/user/${contrato.seniorId}`).subscribe({

      next: idoso => {

        if (!this.idosoVinculado) {
          return;
        }

        this.idosoVinculado.nome = idoso.fullname;
        this.idosoVinculado.telefone = idoso.phoneNumber;
        this.idosoVinculado.idade = this.calcularIdade(idoso.birthDate);
      },

      error: erro => {

        console.error('Erro ao carregar dados do idoso', erro);


      }
    });

  }

  aceitarContrato(contratoId: number): void {

    if (this.contratoAtivo) {

      alert('Já existe um atendimento ativo.');

      return;
    }

    this.http.patch(`http://localhost:8081/api/contracts/${contratoId}/activate`, {}).subscribe({

      next: () => {

        console.log('Contrato aceito com sucesso.');

        alert('Solicitação aceita!');

        this.carregarContratos();
      },

      error: erro => {
        console.error('Erro ao aceitar contrato', erro);

        alert('Não foi possível aceitar a solicitação.');
      }
    });

  }

  recusarContrato(contratoId: number): void {

    const endDate = this.obterDataAtual();

    this.http.patch(`http://localhost:8081/api/contracts/${contratoId}/cancel`, { endDate: endDate }).subscribe({

      next: () => {

        console.log('Solicitação recusada.');

        this.carregarContratos();
      },

      error: erro => {
        console.error('Erro ao recusar contrato', erro);

        alert('Não foi possível recusar a solicitação.');
      }

    });
  }

  abrirModalEncerrarVinculo(): void {

    if (!this.contratoAtivo) {
      return;
    }
    this.exibirModalEncerrarVinculo = true;
  }

  fecharModalEncerrarVinculo(): void {
    this.exibirModalEncerrarVinculo = false;
  }

  confirmarEncerramentoVinculo(): void {

    if (!this.contratoAtivo) {
      return;
    }

    const contratoId = this.contratoAtivo.id;
    const endDate = this.obterDataAtual();

    this.http.patch(`http://localhost:8081/api/contracts/${contratoId}/finish`, { endDate: endDate }).subscribe({

      next: () => {

        console.log('Contrato encerrado com sucesso.');

        this.fecharModalEncerrarVinculo();

        this.carregarContratos();
      },

      error: erro => {

        console.error('Erro ao encerrar contrato', erro);

        alert('Não foi possível encerrar o vínculo.');
      }
    });
  }

  private carregarMedicamentos(seniorId: number): void {

    this.medicamentos = [];

    this.http.get<MedicationSchedule[]>(`http://localhost:8081/api/schedule-medications/senior/${seniorId}`).subscribe(
      {
        next: agendamentos => {

          agendamentos.forEach(agendamento => {
            this.http.get<Medication>(`http://localhost:8081/api/medications/${agendamento.medicationId}`).subscribe({
              next: medicamento => {
                this.medicamentos.push({
                  nome: medicamento.medicationName,
                  dosagem: medicamento.dose,
                  horario: agendamento.intakeTime,
                  instrucoes: agendamento.dosageInstructions
                });
              },

              error: erro => {

                console.error('Erro ao carregar medicamento:', erro);
              }
            });
          }
          );
        },

        error: erro => {
          console.error('Erro ao carregar agenda de medicamento:', erro);

          this.medicamentos = [];

        }
      });
  }

  private calcularIdade(birthDate: string): string {

    const partes = birthDate.split('-');

    if (partes.length !== 3) {
      return 'não informada';
    }

    const ano = Number(partes[0]);
    const mes = Number(partes[1]);
    const dia = Number(partes[2]);

    const hoje = new Date();

    let idade = hoje.getFullYear() - ano;

    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();

    if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) {
      idade--;
    }

    return (`${idade} anos`);

  }

  private obterDataAtual(): string {

    const hoje = new Date();

    const ano = hoje.getFullYear();

    const mes = String(hoje.getMonth() + 1).padStart(2, '0');

    const dia = String(hoje.getDate()).padStart(2, '0');

    return (`${ano}-${mes}-${dia}`);
  }

}