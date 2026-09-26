import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
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

    experiencia: [
      '',
      [Validators.required]
    ],

    valorHora: [
      '',
      [Validators.required]
    ],

    cidade: [
      '',
      [Validators.required]
    ],

    rua: [
      '',
      [Validators.required]
    ],

    bairro: [
      '',
      [Validators.required]
    ],

    horarioInicio: [
      '08:00',
      [Validators.required]
    ],

    horarioFim: [
      '18:00',
      [Validators.required]
    ],

    segunda: [true],
    terca: [true],
    quarta: [true],
    quinta: [true],
    sexta: [true],
    sabado: [true],
    domingo: [true],

    formacao: [
      '',
      [Validators.required]
    ]

  });


  // Dados que vieram da primeira tela
  private dadosCadastro: any;


  constructor() {

    this.dadosCadastro = history.state?.dadosCadastro;

    console.log(
      'Dados recebidos do cadastro:',
      this.dadosCadastro
    );

  }


  salvarPerfil(event?: Event) {

    if (event) {
      event.preventDefault();
    }


    if (!this.dadosCadastro) {

      console.error(
        'Dados do cadastro básico não encontrados.'
      );

      alert(
        'Os dados do cadastro não foram encontrados. Faça o cadastro novamente.'
      );

      this.router.navigate(
        ['/account/sign-up']
      );

      return;
    }


    if (!this.caregiverForm.valid) {

      this.caregiverForm.markAllAsTouched();

      alert(
        'Preencha todos os campos obrigatórios.'
      );

      return;
    }


    const dadosPerfil =
      this.caregiverForm.value;


    console.log(
      'Dados do perfil:',
      dadosPerfil
    );


    // ==========================================
    // MONTA O USUÁRIO CUIDADOR
    // ==========================================

    const usuario = {

      fullname: this.dadosCadastro.nome,

      birthDate: this.converterData(
        this.dadosCadastro.dataNascimento
      ),

      email: this.dadosCadastro.email,

      cpf: this.dadosCadastro.cpf,

      phoneNumber: this.dadosCadastro.telefone,

      password: this.dadosCadastro.senha,

      userType: 'CUIDADOR'

    };


    console.log(
      'Criando cuidador no banco:',
      usuario
    );


    // ==========================================
    // 1 - CRIA USUÁRIO NO BANCO
    // ==========================================

    this.authService
      .cadastrarUsuario(usuario)
      .subscribe({

        next: () => {

          console.log(
            'Usuário cuidador criado.'
          );


          // ====================================
          // 2 - BUSCA O ID DO USUÁRIO
          // ====================================

          this.authService
            .buscarUsuarioPorEmail(
              usuario.email
            )
            .subscribe({

              next: (usuarioCriado) => {

                console.log(
                  'Cuidador encontrado:',
                  usuarioCriado
                );


                const id =
                  usuarioCriado.id;


                if (!id) {

                  alert(
                    'Não foi possível identificar o cuidador criado.'
                  );

                  return;
                }


                // ==================================
                // 3 - MONTA HORÁRIO
                // ==================================

                const disponibilidade =
                  this.montarDisponibilidade(
                    dadosPerfil
                  );


                // ==================================
                // 4 - MONTA PERFIL PROFISSIONAL
                // ==================================

                const perfil = {

                  availabilitySchedule:
                    disponibilidade,

                  streetAddress:
                    dadosPerfil.rua,

                  specialization:
                    dadosPerfil.formacao,

                  city:
                    dadosPerfil.cidade,

                  neighborhood:
                    dadosPerfil.bairro,

                  experience:
                    dadosPerfil.experiencia

                };


                console.log(
                  'Atualizando perfil do cuidador:',
                  perfil
                );


                // ==================================
                // 5 - SALVA PERFIL NO BANCO
                // ==================================

                this.authService
                  .atualizarPerfilCuidador(
                    id,
                    perfil
                  )
                  .subscribe({

                    next: () => {

                      console.log(
                        'Perfil do cuidador salvo no banco.'
                      );


                      alert(
                        'Cadastro do cuidador realizado com sucesso!'
                      );


                      this.router.navigate(
                        ['/account/sign-in']
                      );

                    },


                    error: (erro) => {

                      console.error(
                        'Erro ao salvar perfil:',
                        erro
                      );


                      alert(
                        'O cuidador foi criado, mas ocorreu um erro ao salvar o perfil.'
                      );

                    }

                  });

              },


              error: (erro) => {

                console.error(
                  'Erro ao buscar cuidador:',
                  erro
                );

                alert(
                  'Usuário criado, mas não foi possível localizar o cadastro.'
                );

              }

            });

        },


        error: (erro) => {

          console.error(
            'Erro ao criar cuidador:',
            erro
          );

          alert(
            'Não foi possível criar o cuidador.'
          );

        }

      });

  }


  // ==========================================
  // MONTA DISPONIBILIDADE
  // ==========================================

  private montarDisponibilidade(
    dados: any
  ): string {

    const dias: string[] = [];


    if (dados.segunda) {
      dias.push('Segunda');
    }

    if (dados.terca) {
      dias.push('Terça');
    }

    if (dados.quarta) {
      dias.push('Quarta');
    }

    if (dados.quinta) {
      dias.push('Quinta');
    }

    if (dados.sexta) {
      dias.push('Sexta');
    }

    if (dados.sabado) {
      dias.push('Sábado');
    }

    if (dados.domingo) {
      dias.push('Domingo');
    }


    return `${dias.join(', ')} - ${dados.horarioInicio} às ${dados.horarioFim}`;

  }


  // ==========================================
  // CONVERTER DATA
  // DD/MM/YYYY
  // PARA
  // YYYY-MM-DD
  // ==========================================

  private converterData(
    data: string
  ): string {

    const partes =
      data.split('/');


    if (partes.length !== 3) {
      return data;
    }


    const dia =
      partes[0];

    const mes =
      partes[1];

    const ano =
      partes[2];


    return `${ano}-${mes}-${dia}`;

  }


  submeter(event?: Event) {

    this.salvarPerfil(event);

  }


  onSubmit(event?: Event) {

    this.salvarPerfil(event);

  }

}