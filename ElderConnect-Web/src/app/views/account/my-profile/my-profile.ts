import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  private authentication = inject(Authentication);
  private router = inject(Router);

  usuario: PerfilUsuario = {
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  };

  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';

  ngOnInit() {
    this.carregarDadosPerfil();
  }

  carregarDadosPerfil() {

    const user = this.authentication.usuarioAtual();
      console.log('USUÁRIO ATUAL:', user);
      console.log('ID DO USUÁRIO:', user?.id);

    if (user) {
      this.usuario.nome = user.fullname;
      this.usuario.cpf = user.cpf;
      this.usuario.email = user.email;
      this.usuario.telefone = user.phoneNumber;
    }
  }


  atualizarSenha() {

    if (!this.senhaAtual || !this.novaSenha || !this.confirmarNovaSenha) {
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

    const user = this.authentication.usuarioAtual();

if (!user) {
  alert('Usuário não encontrado.');
  return;
}

this.authentication.updatePassword(
  user.id,
  this.senhaAtual,
  this.novaSenha
).subscribe({
  next: () => {
    alert('Senha alterada com sucesso!');

    this.senhaAtual = '';
    this.novaSenha = '';
    this.confirmarNovaSenha = '';
  },
  error: (erro) => {
    console.error('Erro ao atualizar senha:', erro);
    alert('Não foi possível alterar a senha. Verifique sua senha atual.');
  }
});
  }

  salvarAlteracoes() {
  if (!this.usuario.nome || !this.usuario.telefone || !this.usuario.email) {
    alert('Por favor, preencha todos os campos dos Dados Pessoais!');
    return;
  }

  const user = this.authentication.usuarioAtual();

  if (!user) {
    alert('Usuário não encontrado.');
    return;
  }

  this.authentication.updateProfile(
    user.id,
    this.usuario.nome,
    this.usuario.telefone
  ).subscribe({
    next: () => {

      user.fullname = this.usuario.nome;
      user.phoneNumber = this.usuario.telefone;

      console.log('E-mail no formulário:', this.usuario.email);
      console.log('E-mail do usuário logado:', user.email);
      console.log('Senha atual preenchida:', this.senhaAtual ? 'SIM' : 'NÃO');

      if (this.usuario.email !== user.email) {

        if (!this.senhaAtual) {
          alert('Informe sua senha atual para alterar o e-mail.');
          return;
        }

        this.authentication.updateEmail(
          user.id,
          this.senhaAtual,
          this.usuario.email
        ).subscribe({
          next: () => {
            user.email = this.usuario.email;
            this.authentication.usuarioAtual.set(user);

            alert('Dados pessoais atualizados com sucesso!');
          },
          error: (erro) => {
            console.error('Erro ao atualizar e-mail:', erro);
            alert('Não foi possível atualizar o e-mail. Verifique sua senha atual.');
          }
        });

      } else {

        this.authentication.usuarioAtual.set(user);

        alert('Dados pessoais atualizados com sucesso!');
      }
    },

    error: (erro) => {
      console.error('Erro ao atualizar dados:', erro);
      alert('Não foi possível atualizar os dados pessoais.');
    }
  });
  }

  apagarUsuario() {
  const user = this.authentication.usuarioAtual();

  if (!user) {
    alert('Usuário não encontrado.');
    return;
  }

  const confirmar = confirm(
    'Tem certeza que deseja apagar sua conta? Essa ação não pode ser desfeita.'
  );

  if (!confirmar) {
    return;
  }

  this.authentication.deleteUser(user.id).subscribe({
    next: () => {
      alert('Conta apagada com sucesso!');

      this.authentication.logout();
      this.router.navigate(['/']);
    },
    error: (erro) => {
      console.error('Erro ao apagar conta:', erro);
      alert('Não foi possível apagar sua conta.');
    }
  });
  }



}