import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Router,
  RouterLink,
  NavigationEnd
} from '@angular/router';

import { Subscription, filter } from 'rxjs';

import { AppointmentService } from '../../../services/security/appointment';


interface Appointment {
  id?: number;
  date: string;
  title: string;
  type: string;
  responsible: string;
  time: string;
  notes: string;
  seniorId: number;
}


@Component({
  selector: 'app-agenda',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './schedule.html'
})


export class Agenda implements OnInit, OnDestroy {


  appointments: Appointment[] = [];


  showForm = false;

  editMode = false;

  editingIndex = -1;


  exibindoModalExclusao = false;

  indexParaExcluir = -1;


  date = '';

  title = '';

  type = 'Consulta';

  responsible = '';

  time = '';

  notes = '';


  private routerSubscription?: Subscription;


  constructor(

    private appointmentService: AppointmentService,

    private router: Router,

    private changeDetectorRef: ChangeDetectorRef

  ) {}


  ngOnInit(): void {

    console.log(
      'Tela de agenda carregada'
    );


    this.setCurrentDate();


    /*
     * PRIMEIRO CARREGAMENTO
     */
    this.loadAppointments();


    /*
     * ATUALIZA A AGENDA QUANDO
     * O USUÁRIO VOLTA PARA ELA
     */
    this.routerSubscription =
      this.router.events
        .pipe(
          filter(
            event =>
              event instanceof NavigationEnd
          )
        )
        .subscribe(
          (event: NavigationEnd) => {

            if (
              event.urlAfterRedirects
                .includes('/dashboard/agenda')
            ) {

              console.log(
                'Usuário entrou na Agenda. Atualizando dados...'
              );


              this.loadAppointments();

            }

          }
        );

  }


  ngOnDestroy(): void {

    this.routerSubscription?.unsubscribe();

  }


  /*
   * DEFINE A DATA ATUAL
   */
  setCurrentDate(): void {

    const today = new Date();


    const year =
      today.getFullYear();


    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, '0');


    const day =
      String(
        today.getDate()
      ).padStart(2, '0');


    this.date =
      `${year}-${month}-${day}`;

  }


  /*
   * BUSCA OS COMPROMISSOS DO IDOSO
   */
  loadAppointments(): void {

    const seniorId =
      this.getSeniorId();


    if (!seniorId) {

      console.error(
        'ID do idoso não encontrado.'
      );

      this.appointments = [];


      this.changeDetectorRef.detectChanges();


      return;

    }


    console.log(
      'Buscando compromissos do usuário:',
      seniorId
    );


    this.appointmentService
      .findBySeniorId(seniorId)
      .subscribe({

        next: (
          appointments: Appointment[]
        ) => {

          console.log(
            'Compromissos recebidos:',
            appointments
          );


          /*
           * ATUALIZA A LISTA
           */
          this.appointments =
            appointments;


          /*
           * ORDENA POR DATA E HORÁRIO
           */
          this.sortAppointments();


          /*
           * FORÇA A ATUALIZAÇÃO DA TELA
           *
           * Mesmo comportamento usado
           * na tela de Medicamentos.
           */
          this.changeDetectorRef.detectChanges();


          console.log(
            'Compromissos exibidos na tela:',
            this.appointments
          );

        },


        error: (error) => {

          console.error(
            'Erro ao carregar os compromissos:',
            error
          );


          this.appointments = [];


          this.changeDetectorRef.detectChanges();

        }

      });

  }


  /*
   * PEGA O ID DO IDOSO LOGADO
   */
  getSeniorId(): number {

    const id =
      localStorage.getItem('id');


    if (!id) {

      return 0;

    }


    const seniorId =
      Number(id);


    if (
      isNaN(seniorId) ||
      seniorId <= 0
    ) {

      return 0;

    }


    return seniorId;

  }


  /*
   * ABRIR FORMULÁRIO PARA NOVO COMPROMISSO
   */
  openNew(): void {

    this.clearForm();


    this.editMode = false;


    this.editingIndex = -1;


    this.showForm = true;

  }


  /*
   * EDITAR COMPROMISSO
   */
  edit(index: number): void {

    const appointment =
      this.appointments[index];


    if (!appointment) {

      return;

    }


    this.date =
      appointment.date;


    this.title =
      appointment.title;


    this.type =
      appointment.type;


    this.responsible =
      appointment.responsible;


    this.time =
      appointment.time;


    this.notes =
      appointment.notes;


    this.editingIndex =
      index;


    this.editMode = true;


    this.showForm = true;

  }


  /*
   * SALVAR
   *
   * CREATE + UPDATE
   */
  save(): void {


    if (!this.date) {

      alert(
        'Informe a data.'
      );

      return;

    }


    if (!this.title.trim()) {

      alert(
        'Informe o compromisso.'
      );

      return;

    }


    if (!this.time) {

      alert(
        'Informe o horário.'
      );

      return;

    }


    const seniorId =
      this.getSeniorId();


    if (!seniorId) {

      alert(
        'Usuário não encontrado.'
      );

      return;

    }


    const appointment: Appointment = {

      date:
        this.date,

      title:
        this.title.trim(),

      type:
        this.type,

      responsible:
        this.responsible.trim() ||
        'Não informado',

      time:
        this.time,

      notes:
        this.notes.trim() ||
        'Sem observações',

      seniorId:
        seniorId

    };


    /*
     * UPDATE
     */
    if (
      this.editMode &&
      this.editingIndex >= 0
    ) {


      const existingAppointment =
        this.appointments[
          this.editingIndex
        ];


      if (!existingAppointment?.id) {

        alert(
          'Compromisso inválido.'
        );

        return;

      }


      console.log(
        'Atualizando compromisso:',
        existingAppointment.id
      );


      this.appointmentService
        .update(
          existingAppointment.id,
          appointment
        )
        .subscribe({

          next: () => {

            console.log(
              'Compromisso atualizado com sucesso.'
            );


            this.closeForm();


            this.loadAppointments();

          },


          error: (error) => {

            console.error(
              'Erro ao atualizar compromisso:',
              error
            );


            alert(
              'Não foi possível atualizar o compromisso.'
            );

          }

        });


      return;

    }


    /*
     * CREATE
     */
    console.log(
      'Criando compromisso:',
      appointment
    );


    this.appointmentService
      .create(appointment)
      .subscribe({

        next: () => {

          console.log(
            'Compromisso criado com sucesso.'
          );


          this.closeForm();


          /*
           * BUSCA NOVAMENTE NO BANCO
           */
          this.loadAppointments();

        },


        error: (error) => {

          console.error(
            'Erro ao criar compromisso:',
            error
          );


          alert(
            'Não foi possível criar o compromisso.'
          );

        }

      });

  }


  /*
   * SOLICITA EXCLUSÃO
   */
  delete(index: number): void {

    const appointment =
      this.appointments[index];


    if (!appointment) {

      return;

    }


    this.indexParaExcluir =
      index;


    this.exibindoModalExclusao =
      true;

  }


  /*
   * CANCELAR EXCLUSÃO
   */
  cancelarExclusao(): void {

    this.exibindoModalExclusao =
      false;


    this.indexParaExcluir =
      -1;

  }


  /*
   * CONFIRMAR EXCLUSÃO
   */
  confirmarExclusao(): void {


    if (
      this.indexParaExcluir < 0
    ) {

      return;

    }


    const appointment =
      this.appointments[
        this.indexParaExcluir
      ];


    if (!appointment?.id) {

      alert(
        'Compromisso inválido.'
      );


      this.cancelarExclusao();


      return;

    }


    console.log(
      'Excluindo compromisso:',
      appointment.id
    );


    this.appointmentService
      .delete(appointment.id)
      .subscribe({

        next: () => {

          console.log(
            'Compromisso excluído com sucesso.'
          );


          this.cancelarExclusao();


          /*
           * BUSCA NOVAMENTE NO BANCO
           */
          this.loadAppointments();

        },


        error: (error) => {

          console.error(
            'Erro ao excluir compromisso:',
            error
          );


          alert(
            'Não foi possível excluir o compromisso.'
          );

        }

      });

  }


  /*
   * FECHAR FORMULÁRIO
   */
  closeForm(): void {

    this.showForm =
      false;


    this.clearForm();

  }


  /*
   * LIMPAR FORMULÁRIO
   */
  clearForm(): void {

    this.setCurrentDate();


    this.title =
      '';


    this.type =
      'Consulta';


    this.responsible =
      '';


    this.time =
      '';


    this.notes =
      '';

  }


  /*
   * ORDENA OS COMPROMISSOS
   */
  sortAppointments(): void {

    this.appointments.sort(
      (a, b) => {

        const appointmentA =
          `${a.date} ${a.time}`;


        const appointmentB =
          `${b.date} ${b.time}`;


        return appointmentA.localeCompare(
          appointmentB
        );

      }
    );

  }


  /*
   * PRÓXIMO COMPROMISSO
   */
  get nextAppointment():
    Appointment | null {


    if (
      this.appointments.length === 0
    ) {

      return null;

    }


    const now =
      new Date();


    const year =
      now.getFullYear();


    const month =
      String(
        now.getMonth() + 1
      ).padStart(2, '0');


    const day =
      String(
        now.getDate()
      ).padStart(2, '0');


    const hour =
      String(
        now.getHours()
      ).padStart(2, '0');


    const minute =
      String(
        now.getMinutes()
      ).padStart(2, '0');


    const currentDateTime =
      `${year}-${month}-${day} ${hour}:${minute}`;


    const next =
      this.appointments.find(
        appointment =>
          `${appointment.date} ${appointment.time}` >=
          currentDateTime
      );


    return (
      next ||
      this.appointments[0]
    );

  }

}