import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

interface Appointment {
  date: string;
  title: string;
  type: string;
  responsible: string;
  time: string;
  notes: string;
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
export class Agenda implements OnInit {

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

  ngOnInit(): void {
    this.setCurrentDate();
    this.loadAppointments();
  }

  setCurrentDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    this.date = `${year}-${month}-${day}`;
  }

  loadAppointments(): void {
    const savedData = localStorage.getItem('elderconnect_agenda');

    if (savedData) {
      try {
        this.appointments = JSON.parse(savedData);

        this.appointments = this.appointments.map((appointment: any) => ({
          date: appointment.date || appointment.data || this.date,
          title: appointment.title || appointment.titulo || '',
          type: appointment.type || appointment.tipo || 'Outro',
          responsible: appointment.responsible || appointment.responsavel || 'Não informado',
          time: appointment.time || appointment.horario || '',
          notes: appointment.notes || appointment.observacao || 'Sem observações'
        }));

        this.sortAppointments();
        this.saveAppointments();
      } catch {
        this.loadInitialData();
      }
    } else {
      this.loadInitialData();
    }
  }

  loadInitialData(): void {
    this.appointments = [
      {
        date: this.date,
        title: 'Consulta médica',
        type: 'Consulta',
        responsible: 'Dr. Carlos',
        time: '09:00',
        notes: 'Consulta de rotina'
      },
      {
        date: this.date,
        title: 'Caminhada',
        type: 'Atividade',
        responsible: 'Maria',
        time: '15:00',
        notes: 'Caminhada da tarde'
      },
      {
        date: this.date,
        title: 'Medição de pressão',
        type: 'Saúde',
        responsible: 'Cuidador',
        time: '18:00',
        notes: 'Verificar pressão arterial'
      }
    ];

    this.saveAppointments();
  }

  openNew(): void {
    this.clearForm();
    this.editMode = false;
    this.editingIndex = -1;
    this.showForm = true;
  }

  edit(index: number): void {
    const appointment = this.appointments[index];
    this.date = appointment.date;
    this.title = appointment.title;
    this.type = appointment.type;
    this.responsible = appointment.responsible;
    this.time = appointment.time;
    this.notes = appointment.notes;

    this.editingIndex = index;
    this.editMode = true;
    this.showForm = true;
  }

  save(): void {
    if (!this.date) {
      alert('Informe a data.');
      return;
    }

    if (!this.title.trim()) {
      alert('Informe o compromisso.');
      return;
    }

    if (!this.time) {
      alert('Informe o horário.');
      return;
    }

    const appointment: Appointment = {
      date: this.date,
      title: this.title.trim(),
      type: this.type,
      responsible: this.responsible.trim() || 'Não informado',
      time: this.time,
      notes: this.notes.trim() || 'Sem observações'
    };

    if (this.editMode && this.editingIndex >= 0) {
      this.appointments[this.editingIndex] = appointment;
    } else {
      this.appointments.push(appointment);
    }

    this.sortAppointments();
    this.saveAppointments();
    this.closeForm();
  }

  delete(index: number): void {
    this.indexParaExcluir = index;
    this.exibindoModalExclusao = true;
  }

  cancelarExclusao(): void {
    this.exibindoModalExclusao = false;
    this.indexParaExcluir = -1;
  }

  confirmarExclusao(): void {
    if (this.indexParaExcluir >= 0) {
      this.appointments.splice(this.indexParaExcluir, 1);
      this.saveAppointments();
    }
    this.cancelarExclusao();
  }

  closeForm(): void {
    this.showForm = false;
    this.clearForm();
  }

  clearForm(): void {
    this.setCurrentDate();
    this.title = '';
    this.type = 'Consulta';
    this.responsible = '';
    this.time = '';
    this.notes = '';
  }

  sortAppointments(): void {
    this.appointments.sort((a, b) => {
      const appointmentA = `${a.date} ${a.time}`;
      const appointmentB = `${b.date} ${b.time}`;
      return appointmentA.localeCompare(appointmentB);
    });
  }

  saveAppointments(): void {
    localStorage.setItem(
      'elderconnect_agenda',
      JSON.stringify(this.appointments)
    );
  }

  get nextAppointment(): Appointment | null {
    if (this.appointments.length === 0) {
      return null;
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');

    const currentDateTime = `${year}-${month}-${day} ${hour}:${minute}`;

    const next = this.appointments.find(
      appointment => `${appointment.date} ${appointment.time}` >= currentDateTime
    );

    return next || this.appointments[0];
  }
}