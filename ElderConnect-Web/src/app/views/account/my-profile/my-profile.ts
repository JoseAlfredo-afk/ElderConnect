import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import {
  Router,
  NavigationEnd
} from '@angular/router';

import { Subscription, filter } from 'rxjs';

import { Authentication } from '../../../services/security/authentication';


export interface PerfilUsuario {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
}


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './my-profile.html'
})
export class Profile implements OnInit, OnDestroy {

  usuario: PerfilUsuario = {
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  };

  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';

  private routerSubscription?: Subscription;


  constructor(
    private http: HttpClient,
    private authentication: Authentication,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}


  // ==========================================
  // INICIALIZAÇÃO
  // ==========================================

  ngOnInit(): void {

    console.log('Tela de perfil carregada.');

    /*
     * Carrega imediatamente ao entrar na tela.
     */
    this.carregarDadosPerfil();


    /*
     * Quando o usuário navegar novamente para
     * /dashboard/profile, busca os dados novamente.
     */
    this.routerSubscription =
      this.router.events
        .pipe(
          filter(
            event =>
              event instanceof NavigationEnd &&
              event.urlAfterRedirects.includes(
                '/dashboard/profile'
              )
          )
        )
        .subscribe(() => {

          console.log(
            'Usuário entrou novamente no Perfil. Atualizando dados...'
          );

          this.carregarDadosPerfil();

        });
  }


  // ==========================================
  // DESTRUIR COMPONENTE
  // ==========================================

  ngOnDestroy(): void {

    this.routerSubscription?.unsubscribe();

  }


  // ==========================================
  // BUSCAR USUÁRIO NO BANCO
  // ==========================================

  carregarDadosPerfil(): void {

    const usuarioLogado =
      this.authentication.getAuthenticatedUser();

    console.log(
      'Usuário logado:',
      usuarioLogado
    );


    if (
      !usuarioLogado ||
      !usuarioLogado.id
    ) {

      console.error(
        'Usuário não identificado.'
      );

      return;
    }


    this.http
      .get<any>(
        `http://localhost:8081/api/user/${usuarioLogado.id}`
      )
      .subscribe({

        next: (usuarioBanco) => {

          console.log(
            'Usuário vindo do banco:',
            usuarioBanco
          );


          /*
           * Atualiza os dados exibidos na tela.
           */
          this.usuario = {

            nome:
              usuarioBanco.fullname,

            email:
              usuarioBanco.email,

            telefone:
              usuarioBanco.phoneNumber,

            cpf:
              usuarioBanco.cpf

          };


          /*
           * Força o Angular a atualizar
           * a tela imediatamente.
           */
          this.changeDetectorRef.detectChanges();


          console.log(
            'Perfil atualizado na tela:',
            this.usuario
          );

        },


        error: (erro) => {

          console.error(
            'Erro ao buscar usuário no banco:',
            erro
          );

          alert(
            'Não foi possível carregar os dados do usuário.'
          );

        }

      });

  }


  // ==========================================
  // ATUALIZAR DADOS NO BANCO
  // ==========================================

  salvarAlteracoes(): void {

    if (
      !this.usuario.nome ||
      !this.usuario.email ||
      !this.usuario.telefone
    ) {

      alert(
        'Por favor, preencha todos os campos dos Dados Pessoais!'
      );

      return;
    }


    const usuarioLogado =
      this.authentication.getAuthenticatedUser();


    if (
      !usuarioLogado ||
      !usuarioLogado.id
    ) {

      alert(
        'Usuário não identificado.'
      );

      return;
    }


    const dadosAtualizacao = {

      id:
        usuarioLogado.id,

      fullname:
        this.usuario.nome,

      email:
        this.usuario.email,

      phoneNumber:
        this.usuario.telefone,

      cpf:
        this.usuario.cpf

    };


    console.log(
      'Enviando atualização:',
      dadosAtualizacao
    );


    this.http
      .put(
        `http://localhost:8081/api/user/profile/${usuarioLogado.id}`,
        dadosAtualizacao
      )
      .subscribe({

        next: (resposta) => {

          console.log(
            'Perfil atualizado no banco:',
            resposta
          );


          /*
           * Atualiza também o usuário autenticado.
           */
          const usuarioAtualizado = {

            ...usuarioLogado,

            fullname:
              this.usuario.nome,

            email:
              this.usuario.email,

            phoneNumber:
              this.usuario.telefone,

            cpf:
              this.usuario.cpf

          };


          localStorage.setItem(
            'authenticated_user',
            JSON.stringify(
              usuarioAtualizado
            )
          );


          /*
           * Mantém o perfil atualizado
           * no navegador.
           */
          localStorage.setItem(
            'elderconnect_profile',
            JSON.stringify(
              this.usuario
            )
          );


          localStorage.setItem(
            'fullname',
            this.usuario.nome
          );


          localStorage.setItem(
            'user_name',
            this.usuario.nome
          );


          alert(
            'Dados pessoais atualizados com sucesso!'
          );


          /*
           * Busca novamente do banco
           * para confirmar a alteração.
           */
          this.carregarDadosPerfil();

        },


        error: (erro) => {

          console.error(
            'Erro ao atualizar perfil:',
            erro
          );

          alert(
            'Erro ao atualizar os dados no banco de dados.'
          );

        }

      });

  }


  // ==========================================
  // ALTERAR SENHA
  // ==========================================

  atualizarSenha(): void {

    if (
      !this.senhaAtual ||
      !this.novaSenha ||
      !this.confirmarNovaSenha
    ) {

      alert(
        'Preencha todos os campos de senha!'
      );

      return;
    }


    if (
      this.novaSenha.length < 8
    ) {

      alert(
        'A nova senha deve ter no mínimo 8 caracteres!'
      );

      return;
    }


    if (
      this.novaSenha !==
      this.confirmarNovaSenha
    ) {

      alert(
        'A nova senha e a confirmação não coincidem!'
      );

      return;
    }


    const usuarioLogado =
      this.authentication.getAuthenticatedUser();


    if (
      !usuarioLogado ||
      !usuarioLogado.id
    ) {

      alert(
        'Usuário não identificado.'
      );

      return;
    }


    const dadosSenha = {

      id:
        usuarioLogado.id,

      oldPassword:
        this.senhaAtual,

      newPassword:
        this.novaSenha

    };


    console.log(
      'Atualizando senha:',
      {
        id: dadosSenha.id
      }
    );


    this.http
      .patch(
        'http://localhost:8081/api/user/update-password',
        dadosSenha
      )
      .subscribe({

        next: () => {

          alert(
            'Senha alterada com sucesso!'
          );


          this.senhaAtual = '';

          this.novaSenha = '';

          this.confirmarNovaSenha = '';

        },


        error: (erro) => {

          console.error(
            'Erro ao alterar senha:',
            erro
          );

          alert(
            'Senha atual inválida ou não foi possível alterar a senha.'
          );

        }

      });

  }

}