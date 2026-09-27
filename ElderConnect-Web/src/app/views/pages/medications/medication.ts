import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Medicamento {
  id: number;
  nome: string;
  dosagem: string;
  horario: string;
  instrucoes: string;
}

interface Aviso {
  texto: string;
}

@Component({
  selector: 'app-medications',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './medication.html'
})
export class Medications implements OnInit {

  private apiUrl = 'http://localhost:8081/api/medications';

  private scheduleApiUrl = 'http://localhost:8081/api/schedule-medications';

  medicamentos: Medicamento[] = [];

  avisos: Aviso[] = [
    {
      texto: 'Acompanhar nas atividades diárias e medições.'
    }
  ];

  novoMedicamento = {
    nome: '',
    dosagem: '',
    horario: '',
    instrucoes: ''
  };

  novoAvisoTexto: string = '';

  exibindoModalExclusao: boolean = false;

  itemParaExcluir: {
    tipo: 'medicamento' | 'aviso';
    index: number;
  } | null = null;


  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    console.log('Tela de medicamentos carregada');
    this.buscarMedicamentos();
    
  }

  atualizarMedicamentos(): void {
  this.buscarMedicamentos();
}


 buscarMedicamentos(): void {

  const idUsuario = localStorage.getItem('id');

  if (!idUsuario) {

    console.error('Usuário não está logado.');

    alert('Usuário não identificado.');

    return;
  }

  const seniorId = Number(idUsuario);

  console.log(
    'Buscando medicamentos do usuário:',
    seniorId
  );

  this.http
    .get<any[]>(
      `http://localhost:8081/api/schedule-medications/senior/${seniorId}`
    )
    .subscribe({

      next: (medicamentos) => {

  console.log(
    'Medicamentos do usuário recebidos:',
    medicamentos
  );

  const listaMedicamentos: Medicamento[] = medicamentos.map(
    (item) => ({

      id: item.id,

      nome: item.medicationName,

      dosagem: item.dose,

      horario: item.intakeTime,

      instrucoes: item.dosageInstructions

    })
  );

  this.medicamentos = listaMedicamentos;

  console.log(
    'Medicamentos exibidos na tela:',
    this.medicamentos
  );

  this.changeDetectorRef.detectChanges();

},

      error: (erro) => {

        console.error(
          'Erro ao buscar medicamentos:',
          erro
        );

        alert(
          'Não foi possível carregar os medicamentos.'
        );

      }

    });

}


  cadastrarMedicamento(): void {

    if (
      !this.novoMedicamento.nome ||
      !this.novoMedicamento.dosagem
    ) {

      alert(
        'Preencha o nome e a dosagem do medicamento.'
      );

      return;
    }


    const idUsuario = localStorage.getItem('id');

    if (!idUsuario) {
      alert('Usuário não identificado.');
      return;
    }

    const medicamento = {

      medicationName:
        this.novoMedicamento.nome,

      dose:
        this.novoMedicamento.dosagem,

      seniorId:
        Number(idUsuario)

    };

    console.log(
      'Cadastrando medicamento:',
      medicamento
    );


    this.http
      .post(
        this.apiUrl,
        medicamento
      )
      .subscribe({

        next: () => {

          console.log(
            'Medicamento cadastrado com sucesso.'
          );

          alert(
            'Medicamento cadastrado com sucesso!'
          );


          this.novoMedicamento = {

            nome: '',
            dosagem: '',
            horario: '',
            instrucoes: ''

          };


          this.buscarMedicamentos();

        },

        error: (erro) => {

          console.error(
            'Erro ao cadastrar medicamento:',
            erro
          );

          alert(
            'Não foi possível cadastrar o medicamento.'
          );

        }

      });

  }


  cadastrarAviso(): void {

    if (!this.novoAvisoTexto.trim()) {
      return;
    }

    this.avisos.push({
      texto: this.novoAvisoTexto
    });

    this.novoAvisoTexto = '';

  }


  solicitarExclusao(
    tipo: 'medicamento' | 'aviso',
    index: number
  ): void {

    this.itemParaExcluir = {
      tipo,
      index
    };

    this.exibindoModalExclusao = true;

  }


  cancelarExclusao(): void {

    this.exibindoModalExclusao = false;

    this.itemParaExcluir = null;

  }


  confirmarExclusao(): void {

  if (!this.itemParaExcluir) {
    return;
  }

  if (this.itemParaExcluir.tipo === 'medicamento') {

    const medicamento =
      this.medicamentos[this.itemParaExcluir.index];

    if (!medicamento) {
      console.error('Medicamento não encontrado.');
      return;
    }

    console.log(
      'Excluindo agendamento do medicamento:',
      medicamento
    );

    this.http
      .delete(
        `${this.scheduleApiUrl}/${medicamento.id}`
      )
      .subscribe({

        next: () => {

          console.log(
            'Medicamento excluído com sucesso.'
          );

          this.cancelarExclusao();

          this.buscarMedicamentos();

        },

        error: (erro) => {

          console.error(
            'Erro ao excluir medicamento:',
            erro
          );

          alert(
            'Não foi possível excluir o medicamento.'
          );

        }

      });

  } else {

    this.avisos.splice(
      this.itemParaExcluir.index,
      1
    );

    this.cancelarExclusao();

  }

}

}