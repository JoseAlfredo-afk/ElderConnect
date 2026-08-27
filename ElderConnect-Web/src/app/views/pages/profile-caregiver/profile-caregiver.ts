import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

export interface CuidadorDetalhe {
  id: number;
  nome: string;
  cidade: string;
  experiencia: string;
  avaliacao: number;
  valorHora: number;
  telefone: string;
  email: string;
  sobre: string;
  disponibilidade: string[];
  especialidades: string[];
}

@Component({
  selector: 'app-caregiver-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile-caregiver.html'
})
export class CaregiverProfile implements OnInit {
  private route = inject(ActivatedRoute);

  cuidadoresMock: CuidadorDetalhe[] = [
    {
      id: 1,
      nome: 'Maria Silva',
      cidade: 'Pouso Alegre - MG',
      experiencia: '5 anos de experiência',
      avaliacao: 4.9,
      valorHora: 28.00,
      telefone: '(35) 99887-6655',
      email: 'maria.silva@email.com',
      sobre: 'Profissional dedicada com vasta experiência em cuidados geriátricos, acompanhamento em consultas médicas, administração correta de medicamentos e auxílio na mobilidade e rotina diária.',
      disponibilidade: ['Manhã', 'Tarde'],
      especialidades: ['Administração de Medicamentos', 'Acompanhamento Médico', 'Primeiros Socorros', 'Mobilidade Reduzida']
    },
    {
      id: 2,
      nome: 'João Santos',
      cidade: 'Itajuba - MG',
      experiencia: '3 anos de experiência',
      avaliacao: 4.7,
      valorHora: 45.00,
      telefone: '(35) 99776-5544',
      email: 'joao.santos@email.com',
      sobre: 'Especialista no acompanhamento noturno de idosos, suporte a pacientes com Alzheimer e auxilio na higiene pessoal e alimentação.',
      disponibilidade: ['Noite'],
      especialidades: ['Cuidados Noturnos', 'Suporte a Alzheimer', 'Primeiros Socorros']
    },
    {
      id: 3,
      nome: 'Ana Oliveira',
      cidade: 'Goiania - GO',
      experiencia: '1 ano de experiência',
      avaliacao: 4.8,
      valorHora: 30.00,
      telefone: '(62) 99665-4433',
      email: 'ana.oliveira@email.com',
      sobre: 'Atenciosa e paciente, com foco em companhia diária, estimulação cognitiva através de atividades lúdicas e controle de medicação.',
      disponibilidade: ['Manhã', 'Tarde', 'Noite'],
      especialidades: ['Estimulação Cognitiva', 'Acompanhamento Diário', 'Alimentação Especial']
    },
    {
      id: 4,
      nome: 'Carlos Eduardo',
      cidade: 'Pouso Alegre - MG',
      experiencia: '6 anos de experiência',
      avaliacao: 5.0,
      valorHora: 60.00,
      telefone: '(35) 99554-3322',
      email: 'carlos.eduardo@email.com',
      sobre: 'Técnico de enfermagem com ampla experiência em pós-operatório, reabilitação física e manejo de equipamentos hospitalares em domicílio.',
      disponibilidade: ['Tarde', 'Noite'],
      especialidades: ['Cuidados Pós-Operatórios', 'Técnico de Enfermagem', 'Manejo de Equipamentos', 'Mobilidade Reduzida']
    },
    {
      id: 5,
      nome: 'Fernanda Lima',
      cidade: 'Itajuba - MG',
      experiencia: '2 anos de experiência',
      avaliacao: 4.6,
      valorHora: 25.00,
      telefone: '(35) 99443-2211',
      email: 'fernanda.lima@email.com',
      sobre: 'Foco no atendimento matutino, preparo de refeições nutritivas, auxílio em caminhadas e administração de medicamentos diários.',
      disponibilidade: ['Manhã'],
      especialidades: ['Preparo de Refeições', 'Caminhadas Guiadas', 'Organização de Rotina']
    },
    {
      id: 6,
      nome: 'Roberto Alves',
      cidade: 'Goiania - GO',
      experiencia: '4 anos de experiência',
      avaliacao: 4.9,
      valorHora: 80.00,
      telefone: '(62) 99332-1100',
      email: 'roberto.alves@email.com',
      sobre: 'Experiente no manejo de condições de alta complexidade, fisioterapia preventiva básica e auxílio total em locomoção e higiene.',
      disponibilidade: ['Manhã', 'Tarde'],
      especialidades: ['Alta Complexidade', 'Fisioterapia Preventiva', 'Higiene Pessoal', 'Mobilidade Reduzida']
    }
  ];

  cuidador: CuidadorDetalhe = this.cuidadoresMock[0];

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      const encontrado = this.cuidadoresMock.find(c => c.id === id);
      if (encontrado) {
        this.cuidador = encontrado;
      }
    }
  }

  contratar() {
    alert(`Solicitação enviada para ${this.cuidador.nome}! Em breve ela entrará em contato.`);
  }
}