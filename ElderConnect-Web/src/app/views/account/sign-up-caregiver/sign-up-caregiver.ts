import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Authentication } from '../../../services/security/authentication';

@Component({
  selector: 'app-sign-up-caregiver',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './sign-up-caregiver.html'
})
export class SignUpCaregiver {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  protected authService = inject(Authentication);

  caregiverForm: FormGroup = this.fb.group({
    experiencia: ['', [Validators.required]],
    valorHora: ['', [Validators.required]],
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
    horarios: this.fb.array([
      this.criarGrupoHorario('08:00', '18:00')
    ]),
    formacao: ['', [Validators.required]]
  });

  private dadosCadastro: any;

  constructor() {
    this.dadosCadastro = history.state?.dadosCadastro;
  }

  get horarios(): FormArray {
    return this.caregiverForm.get('horarios') as FormArray;
  }

  criarGrupoHorario(inicio = '08:00', fim = '18:00'): FormGroup {
    return this.fb.group({
      horarioInicio: [inicio, [Validators.required]],
      horarioFim: [fim, [Validators.required]]
    });
  }

  adicionarHorario(): void {
    this.horarios.push(this.criarGrupoHorario());
  }

  removerHorario(index: number): void {
    if (this.horarios.length > 1) {
      this.horarios.removeAt(index);
    }
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

    if (!this.caregiverForm.valid) {
      this.caregiverForm.markAllAsTouched();
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const dadosPerfil = this.caregiverForm.value;

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

            const perfil = {
              availabilitySchedule: disponibilidade,
              streetAddress: dadosPerfil.rua,
              specialization: dadosPerfil.formacao,
              city: dadosPerfil.cidade,
              neighborhood: dadosPerfil.bairro,
              experience: dadosPerfil.experiencia,
              hourlyRate: Number(dadosPerfil.valorHora)
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