import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
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

  exibindoModalExclusao: boolean = false;

  private routerSubscription?: Subscription;

  constructor(
    private http: HttpClient,
    private authentication: Authentication,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('Tela de perfil carregada.');
    this.carregarDadosPerfil();

    this.routerSubscription =
      this.router.events
        .pipe(
          filter(
            event =>
              event instanceof NavigationEnd &&
              event.urlAfterRedirects.includes('/dashboard/profile')
          )
        )
        .subscribe(() => {
          console.log('Usuário entrou novamente no Perfil. Atualizando dados...');
          this.carregarDadosPerfil();
        });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  voltar(): void {
    window.history.back();
  }

  carregarDadosPerfil(): void {
    const usuarioLogado = this.authentication.getAuthenticatedUser();

    if (!usuarioLogado || !usuarioLogado.id) {
      console.error('Usuário não identificado.');
      return;
    }

    this.http
      .get<any>(`http://localhost:8081/api/user/${usuarioLogado.id}`)
      .subscribe({
        next: (usuarioBanco) => {
          this.usuario = {
            nome: usuarioBanco.fullname,
            email: usuarioBanco.email,
            telefone: usuarioBanco.phoneNumber,
            cpf: usuarioBanco.cpf
          };

          this.changeDetectorRef.detectChanges();
        },
        error: (erro) => {
          console.error('Erro ao buscar usuário no banco:', erro);
          alert('Não foi possível carregar os dados do usuário.');
        }
      });
  }

  salvarAlteracoes(): void {
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.telefone) {
      alert('Por favor, preencha todos os campos dos Dados Pessoais!');
      return;
    }

    const usuarioLogado = this.authentication.getAuthenticatedUser();

    if (!usuarioLogado || !usuarioLogado.id) {
      alert('Usuário não identificado.');
      return;
    }

    const dadosAtualizacao = {
      id: usuarioLogado.id,
      fullname: this.usuario.nome,
      email: this.usuario.email,
      phoneNumber: this.usuario.telefone,
      cpf: this.usuario.cpf
    };

    this.http
      .put(`http://localhost:8081/api/user/profile/${usuarioLogado.id}`, dadosAtualizacao)
      .subscribe({
        next: (resposta) => {
          const usuarioAtualizado = {
            ...usuarioLogado,
            fullname: this.usuario.nome,
            email: this.usuario.email,
            phoneNumber: this.usuario.telefone,
            cpf: this.usuario.cpf
          };

          localStorage.setItem('authenticated_user', JSON.stringify(usuarioAtualizado));
          localStorage.setItem('elderconnect_profile', JSON.stringify(this.usuario));
          localStorage.setItem('fullname', this.usuario.nome);
          localStorage.setItem('user_name', this.usuario.nome);

          alert('Dados pessoais atualizados com sucesso!');
          this.carregarDadosPerfil();
        },
        error: (erro) => {
          console.error('Erro ao atualizar perfil:', erro);
          alert('Erro ao atualizar os dados no banco de dados.');
        }
      });
  }

  atualizarSenha(): void {
    if (!this.senhaAtual || !this.novaSenha || !this.confirmarNovaSenha) {
      alert('Preencha todos os campos de senha!');
      return;
    }

    if (this.novaSenha.length < 8) {
      alert('A nova senha deve ter no mínimo 8 caracteres!');
      return;
    }

    if (this.novaSenha !== this.confirmarNovaSenha) {
      alert('A nova senha e a confirmação de senha não são iguais!');
      return;
    }

    const usuarioLogado = this.authentication.getAuthenticatedUser();

    if (!usuarioLogado || !usuarioLogado.id) {
      alert('Usuário não identificado.');
      return;
    }

    const dadosSenha = {
      id: usuarioLogado.id,
      oldPassword: this.senhaAtual,
      newPassword: this.novaSenha
    };

    this.http
      .patch('http://localhost:8081/api/user/update-password', dadosSenha)
      .subscribe({
        next: () => {
          alert('Senha alterada com sucesso!');
          this.senhaAtual = '';
          this.novaSenha = '';
          this.confirmarNovaSenha = '';
        },
        error: (erro) => {
          console.error('Erro ao alterar senha:', erro);
          alert('Senha atual inválida ou não foi possível alterar a senha.');
        }
      });
  }

  abrirModalExclusao(): void {
    this.exibindoModalExclusao = true;
  }

  cancelarExclusao(): void {
    this.exibindoModalExclusao = false;
  }

  confirmarExclusaoPerfil(): void {
    const usuarioLogado = this.authentication.getAuthenticatedUser();

    if (!usuarioLogado || !usuarioLogado.id) {
      alert('Usuário não identificado.');
      return;
    }

    this.http
      .delete(`http://localhost:8081/api/user/${usuarioLogado.id}`)
      .subscribe({
        next: () => {
          alert('Sua conta foi excluída com sucesso.');
          this.authentication.logout();
          this.router.navigate(['/account/sign-in']);
        },
        error: (erro) => {
          console.error('Erro ao excluir conta:', erro);
          this.authentication.logout();
          this.router.navigate(['/account/sign-in']);
        }
      });
  }
}