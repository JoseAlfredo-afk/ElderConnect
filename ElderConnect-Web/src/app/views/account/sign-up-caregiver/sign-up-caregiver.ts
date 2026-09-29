import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Authentication } from '../../../services/security/authentication';

@Component({
  selector: 'app-sign-up-caregiver',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './sign-up-caregiver.html'
})
export class SignUpCaregiver {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  protected authService = inject(Authentication);

  novoHorarioInicio: string = '08:00';
  novoHorarioFim: string = '18:00';
  novaFormacao: string = '';

  caregiverForm: FormGroup = this.fb.group({
    experiencia: ['', [Validators.required]],
    crm: [''],
    valorHora: ['', [Validators.required, Validators.min(1.00)]],
    disponibilidadePeriodo: ['Integral', [Validators.required]],
    cidade: ['', [Validators.required]],
    rua: ['', [Validators.required]],
    bairro: ['', [Validators.required]],
    segunda: [true],
    terca: [true],
    quarta: [true],
    quinta: [true],
    sexta: [true],
    sabado: [true],
    domingo: [true],
    horarios: this.fb.array([]),
    formacoes: this.fb.array([])
  });

  private dadosCadastro: any;

  constructor() {
    this.dadosCadastro = history.state?.dadosCadastro;
  }

  get horarios(): FormArray {
    return this.caregiverForm.get('horarios') as FormArray;
  }

  get formacoes(): FormArray {
    return this.caregiverForm.get('formacoes') as FormArray;
  }

  adicionarHorario(): void {
    if (this.novoHorarioInicio && this.novoHorarioFim) {
      const novoGrupo = this.fb.group({
        horarioInicio: [this.novoHorarioInicio, [Validators.required]],
        horarioFim: [this.novoHorarioFim, [Validators.required]]
      });
      this.horarios.push(novoGrupo);
    }
  }

  removerHorario(index: number): void {
    this.horarios.removeAt(index);
  }

  adicionarFormacao(): void {
    if (this.novaFormacao.trim()) {
      this.formacoes.push(this.fb.control(this.novaFormacao.trim(), [Validators.required]));
      this.novaFormacao = '';
    }
  }

  removerFormacao(index: number): void {
    this.formacoes.removeAt(index);
  }

  salvarPerfil(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    if (!this.dadosCadastro) {
      alert('Os dados do cadastro não foram encontrados. Faça o cadastro novamente.');
      this.router.navigate(['/account/sign-up']);
      return;
    }

    if (this.horarios.length === 0) {
      alert('Adicione pelo menos um horário de atendimento.');
      return;
    }

    if (this.formacoes.length === 0) {
      alert('Adicione pelo menos uma formação ou curso.');
      return;
    }

    if (!this.caregiverForm.valid) {
      this.caregiverForm.markAllAsTouched();
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const dadosPerfil = this.caregiverForm.value;
    const valorHora = this.converterValorHora(dadosPerfil.valorHora);

    if (valorHora <= 0) {
      alert('Informe um valor por hora válido.');
      return;
    }

    const usuario = {
      fullname: this.dadosCadastro.nome,
      birthDate: this.converterData(this.dadosCadastro.dataNascimento),
      email: this.dadosCadastro.email,
      cpf: this.dadosCadastro.cpf ? this.dadosCadastro.cpf.replace(/\D/g, '') : '',
      phoneNumber: this.dadosCadastro.telefone ? this.dadosCadastro.telefone.replace(/\D/g, '') : '',
      password: this.dadosCadastro.senha,
      userType: 'CUIDADOR'
    };

    this.authService.cadastrarUsuario(usuario).subscribe({
      next: () => {
        this.authService.buscarUsuarioPorEmail(usuario.email).subscribe({
          next: (usuarioCriado) => {
            const id = usuarioCriado.id;

            if (!id) {
              alert('Não foi possível identificar o cuidador criado.');
              return;
            }

            const disponibilidade = this.montarDisponibilidade(dadosPerfil);
            const anosExperiencia = this.extrairAnosExperiencia(dadosPerfil.experiencia);

            const especializacoes = dadosPerfil.formacoes
              .filter((f: string) => f.trim() !== '')
              .join(', ');

            const perfil = {
              availabilitySchedule: disponibilidade,
              streetAddress: dadosPerfil.rua,
              specialization: especializacoes,
              crm: dadosPerfil.crm,
              city: dadosPerfil.cidade,
              neighborhood: dadosPerfil.bairro,
              experience: dadosPerfil.experiencia,
              hourlyRate: valorHora,
              experienceYears: anosExperiencia,
              availabilityPeriod: dadosPerfil.disponibilidadePeriodo
            };

            this.authService.atualizarPerfilCuidador(id, perfil).subscribe({
              next: () => {
                alert('Cadastro do cuidador realizado com sucesso!');
                this.router.navigate(['/account/sign-in']);
              },
              error: (erro) => {
                console.error('Erro ao salvar perfil:', erro);
                alert('O cuidador foi criado, mas ocorreu um erro ao salvar o perfil.');
              }
            });
          },
          error: (erro) => {
            console.error('Erro ao buscar cuidador:', erro);
            alert('Usuário criado, mas não foi possível localizar o cadastro.');
          }
        });
      },
      error: (erro) => {
        console.error('Erro ao criar cuidador:', erro);
        if (erro?.status === 400) {
          alert('Não foi possível criar o cuidador. Verifique se o e-mail ou CPF já estão cadastrados.');
          return;
        }

        alert('Não foi possível criar o cuidador.');
      }
    });
  }

  private montarDisponibilidade(dados: any): string {
    const dias: string[] = [];

    if (dados.segunda) dias.push('Segunda');
    if (dados.terca) dias.push('Terça');
    if (dados.quarta) dias.push('Quarta');
    if (dados.quinta) dias.push('Quinta');
    if (dados.sexta) dias.push('Sexta');
    if (dados.sabado) dias.push('Sábado');
    if (dados.domingo) dias.push('Domingo');

    const listaHorarios = dados.horarios.map(
      (h: any) => `${h.horarioInicio} às ${h.horarioFim}`
    ).join(', ');

    return `${dias.join(', ')} - ${listaHorarios}`;
  }

  private converterValorHora(valor?: unknown): number {
    if (typeof valor === 'number') {
      return Number.isFinite(valor) ? valor : 0;
    }

    const texto = String(valor ?? '').trim().replace(/[^\d,.-]/g, '');
    const valorNormalizado = texto.includes(',')
      ? texto.replace(/\./g, '').replace(',', '.')
      : texto;
    const valorConvertido = Number(valorNormalizado);

    return Number.isFinite(valorConvertido) ? valorConvertido : 0;
  }

  private extrairAnosExperiencia(experiencia?: unknown): number {
    if (experiencia === null || experiencia === undefined) {
      return 0;
    }

    const resultado = String(experiencia).match(/\d+/);

    if (!resultado) {
      return 0;
    }

    return Number(resultado[0]);
  }

  private converterData(data: string): string {
    if (!data) return '';
    if (data.includes('-')) return data;

    const partes = data.split('/');
    if (partes.length !== 3 || partes[2].length !== 4) {
      return data;
    }

    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }

  submeter(event?: Event) {
    this.salvarPerfil(event);
  }

  onSubmit(event?: Event) {
    this.salvarPerfil(event);
  }
}
