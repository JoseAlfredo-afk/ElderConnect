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
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {

  tipoConta: 'idoso' | 'cuidador' = 'idoso';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  protected authService = inject(Authentication);

  cadastroForm: FormGroup = this.fb.group({

    nome: [
      '',
      [Validators.required]
    ],

    dataNascimento: [
      '',
      [Validators.required]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    cpf: [
      '',
      [Validators.required]
    ],

    telefone: [
      '',
      [Validators.required]
    ],

    senha: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ],

    confirmaSenha: [
      '',
      [Validators.required]
    ]

  });


  alterarTipoConta(tipo: 'idoso' | 'cuidador') {

    this.tipoConta = tipo;

  }


  aplicarMascara(
    event: Event,
    tipo: 'data' | 'cpf' | 'telefone'
  ) {

    const input = event.target as HTMLInputElement;

    let valor = input.value.replace(/\D/g, '');


    // ==========================================
    // DATA
    // ==========================================

    if (tipo === 'data') {

      if (valor.length > 2) {
        valor =
          valor.substring(0, 2) +
          '/' +
          valor.substring(2);
      }

      if (valor.length > 5) {
        valor =
          valor.substring(0, 5) +
          '/' +
          valor.substring(5, 9);
      }

    }


    // ==========================================
    // CPF
    // ==========================================

    else if (tipo === 'cpf') {

      if (valor.length > 3) {
        valor =
          valor.substring(0, 3) +
          '.' +
          valor.substring(3);
      }

      if (valor.length > 7) {
        valor =
          valor.substring(0, 7) +
          '.' +
          valor.substring(7);
      }

      if (valor.length > 11) {
        valor =
          valor.substring(0, 11) +
          '-' +
          valor.substring(11, 13);
      }

    }


    // ==========================================
    // TELEFONE
    // ==========================================

    else if (tipo === 'telefone') {

      if (valor.length > 0) {
        valor = '(' + valor;
      }

      if (valor.length > 3) {
        valor =
          valor.substring(0, 3) +
          ') ' +
          valor.substring(3);
      }

      if (valor.length > 10) {
        valor =
          valor.substring(0, 10) +
          '-' +
          valor.substring(10, 14);
      }

    }


    input.value = valor;


    this.cadastroForm
      .get(
        tipo === 'data'
          ? 'dataNascimento'
          : tipo
      )
      ?.setValue(
        valor,
        {
          emitEvent: false
        }
      );

  }


  // ==========================================
  // ENVIAR CADASTRO
  // ==========================================

  submeter() {

    if (!this.cadastroForm.valid) {

      this.cadastroForm.markAllAsTouched();

      return;
    }


    const dados = this.cadastroForm.value;

    console.log(
      'Dados do cadastro:',
      dados
    );


    // ==========================================
    // CADASTRO DO CUIDADOR
    // ==========================================

    if (this.tipoConta === 'cuidador') {

      this.router.navigate(
        ['/account/complete-profile'],
        {
          state: {
            dadosCadastro: dados
          }
        }
      );

      return;
    }


    // ==========================================
    // CADASTRO DO IDOSO
    // ==========================================

    const usuario = {

      fullname: dados.nome,

      birthDate: this.converterData(
        dados.dataNascimento
      ),

      email: dados.email,

      cpf: dados.cpf,

      phoneNumber: dados.telefone,

      password: dados.senha,

      userType: 'IDOSO'

    };


    console.log(
      'Enviando usuário para o backend:',
      usuario
    );


    // ==========================================
    // ENVIA PARA O BACKEND
    // ==========================================

    this.authService
      .cadastrarUsuario(usuario)
      .subscribe({

        next: (resposta) => {

          console.log(
            'Usuário criado no banco:',
            resposta
          );


          this.authService
            .mostrarAlertaCadastroGlobal = true;


          alert(
            'Cadastro realizado com sucesso!'
          );


          this.router.navigate(
            ['/account/sign-in']
          );

        },


        error: (erro) => {

          console.error(
            'Erro ao cadastrar usuário:',
            erro
          );


          alert(
            'Não foi possível realizar o cadastro.'
          );

        }

      });

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

    const partes = data.split('/');


    if (partes.length !== 3) {

      return data;

    }


    const dia = partes[0];

    const mes = partes[1];

    const ano = partes[2];


    return `${ano}-${mes}-${dia}`;

  }

}