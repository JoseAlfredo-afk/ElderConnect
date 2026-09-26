import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.html'
})
export class Profile implements OnInit {

  constructor(
    private http: HttpClient,
    private authentication: Authentication
  ) {}

  usuario: PerfilUsuario = {
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  };

  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';

  ngOnInit(): void {
    this.carregarDadosPerfil();
  }

  // ==========================================
  // BUSCAR USUÁRIO NO BANCO
  // ==========================================
carregarDadosPerfil(): void {

  const usuarioLogado = this.authentication.getAuthenticatedUser();

  console.log('Usuário logado:', usuarioLogado);

  if (!usuarioLogado || !usuarioLogado.id) {
    console.error('Usuário não identificado.');
    return;
  }

  this.http.get<any>(
    `http://localhost:8081/api/user/${usuarioLogado.id}`
  ).subscribe({

    next: (usuarioBanco) => {

      console.log('Usuário vindo do banco:', usuarioBanco);

      this.usuario = {
        nome: usuarioBanco.fullname,
        email: usuarioBanco.email,
        telefone: usuarioBanco.phoneNumber,
        cpf: usuarioBanco.cpf
      };
    },

    error: (erro) => {

      console.error('Erro ao buscar usuário no banco:', erro);

      alert('Não foi possível carregar os dados do usuário.');
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

    console.log('Enviando atualização:', dadosAtualizacao);

    this.http.put(
      `http://localhost:8081/api/user/profile/${usuarioLogado.id}`,
      dadosAtualizacao
    ).subscribe({

      next: (resposta) => {

        console.log('Perfil atualizado no banco:', resposta);

        // Atualiza também o usuário autenticado
        const usuarioAtualizado = {
          ...usuarioLogado,
          fullname: this.usuario.nome,
          email: this.usuario.email,
          phoneNumber: this.usuario.telefone,
          cpf: this.usuario.cpf
        };

        localStorage.setItem(
          'authenticated_user',
          JSON.stringify(usuarioAtualizado)
        );

        // Mantém o perfil atualizado no navegador
        localStorage.setItem(
          'elderconnect_profile',
          JSON.stringify(this.usuario)
        );

        localStorage.setItem(
          'fullname',
          this.usuario.nome
        );

        localStorage.setItem(
          'user_name',
          this.usuario.nome
        );

        alert('Dados pessoais atualizados com sucesso!');

        // Busca novamente do banco para confirmar
        this.carregarDadosPerfil();
      },

      error: (erro) => {

        console.error('Erro ao atualizar perfil:', erro);

        alert('Erro ao atualizar os dados no banco de dados.');
      }
    });
  }

  // ==========================================
  // ALTERAR SENHA
  // ==========================================
 // ==========================================
// ALTERAR SENHA
// ==========================================
atualizarSenha(): void {

  if (
    !this.senhaAtual ||
    !this.novaSenha ||
    !this.confirmarNovaSenha
  ) {
    alert('Preencha todos os campos de senha!');
    return;
  }

  if (this.novaSenha.length < 8) {
    alert('A nova senha deve ter no mínimo 8 caracteres!');
    return;
  }

  if (this.novaSenha !== this.confirmarNovaSenha) {
    alert('A nova senha e a confirmação não coincidem!');
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

  console.log('Atualizando senha:', {
    id: dadosSenha.id
  });

  this.http.patch(
    'http://localhost:8081/api/user/update-password',
    dadosSenha
  ).subscribe({

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
}