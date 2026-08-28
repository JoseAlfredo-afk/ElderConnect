import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

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

@Component({
  selector: 'app-elder-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './elder.html'
})
export class ElderDashboard implements OnInit {
  nomeIdoso: string = 'José da Silva';
  cuidadorContratado: CuidadorContratado | null = null;
  medicamentos: Medicamento[] = [];

  // Pop-up / Modal de Avaliação
  exibirModalAvaliacao: boolean = false;
  estrelasSelecionadas: number = 5;
  comentarioAvaliacao: string = '';

  ngOnInit(): void {
    this.carregarCuidadorVinculado();
    this.carregarMedicamentos();
  }

  carregarMedicamentos(): void {
    const medsSalvos = localStorage.getItem('elderconnect_medicamentos');
    if (medsSalvos) {
      try {
        this.medicamentos = JSON.parse(medsSalvos);
      } catch (e) {
        this.carregarMedicamentosPadrao();
      }
    } else {
      this.carregarMedicamentosPadrao();
    }
  }

  private carregarMedicamentosPadrao(): void {
    this.medicamentos = [
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
    localStorage.setItem('elderconnect_medicamentos', JSON.stringify(this.medicamentos));
  }

  carregarCuidadorVinculado(): void {
    const vinculoSalvo = localStorage.getItem('elderconnect_vinculo');

    if (vinculoSalvo) {
      try {
        const dados = JSON.parse(vinculoSalvo);
        this.cuidadorContratado = {
          cuidadorId: dados.cuidadorId || 1,
          cuidadorNome: dados.cuidadorNome || 'Maria Silva',
          telefone: dados.telefone || '(35) 99988-7766',
          especialidade: dados.especialidade || 'Cuidados Gerais & Acompanhamento'
        };
      } catch (e) {
        this.cuidadorContratado = null;
      }
    } else {
      this.cuidadorContratado = null;
    }
  }

  desfazerVinculo(): void {
    const confirmacao = window.confirm('Tem certeza que deseja encerrar o vínculo com este cuidador?');

    if (confirmacao) {
      localStorage.removeItem('elderconnect_vinculo');
      this.cuidadorContratado = null;
      alert('Vínculo encerrado com sucesso.');
    }
  }

  // Métodos do Pop-up de Avaliação
  abrirModalAvaliacao(): void {
    this.estrelasSelecionadas = 5;
    this.comentarioAvaliacao = '';
    this.exibirModalAvaliacao = true;
  }

  fecharModalAvaliacao(): void {
    this.exibirModalAvaliacao = false;
  }

  selecionarEstrelas(qtd: number): void {
    this.estrelasSelecionadas = qtd;
  }

  salvarAvaliacao(): void {
    if (!this.cuidadorContratado) return;

    const novaNota = this.estrelasSelecionadas;
    const cuidadorId = this.cuidadorContratado.cuidadorId;

    // 1. Salva o histórico de avaliações individuais
    const avaliacao = {
      cuidadorId: cuidadorId,
      cuidadorNome: this.cuidadorContratado.cuidadorNome,
      estrelas: novaNota,
      comentario: this.comentarioAvaliacao.trim(),
      data: new Date().toLocaleDateString('pt-BR')
    };

    const avaliacoesSalvas = JSON.parse(localStorage.getItem('elderconnect_avaliacoes') || '[]');
    avaliacoesSalvas.push(avaliacao);
    localStorage.setItem('elderconnect_avaliacoes', JSON.stringify(avaliacoesSalvas));

    // 2. Atualiza o perfil acumulado do cuidador no localStorage
    const chaveCuidador = `elderconnect_cuidador_${cuidadorId}`;
    const dadosCuidadorSalvos = localStorage.getItem(chaveCuidador);

    let dadosCuidador = dadosCuidadorSalvos ? JSON.parse(dadosCuidadorSalvos) : {
      id: cuidadorId,
      nome: this.cuidadorContratado.cuidadorNome,
      avaliacao: 4.9,
      totalAvaliacoes: 48
    };

    const totalAnterior = dadosCuidador.totalAvaliacoes || 1;
    const somaAnterior = (dadosCuidador.avaliacao || 5.0) * totalAnterior;

    const novoTotal = totalAnterior + 1;
    const novaMedia = (somaAnterior + novaNota) / novoTotal;

    dadosCuidador.avaliacao = parseFloat(novaMedia.toFixed(1));
    dadosCuidador.totalAvaliacoes = novoTotal;

    localStorage.setItem(chaveCuidador, JSON.stringify(dadosCuidador));

    alert(`Avaliação enviada com sucesso! A nova média de ${dadosCuidador.nome} é ${dadosCuidador.avaliacao} ★ (${dadosCuidador.totalAvaliacoes} avaliações).`);
    this.fecharModalAvaliacao();
  }
}