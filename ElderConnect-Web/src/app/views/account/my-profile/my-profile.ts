import { Component, OnInit, inject } from '@angular/core';
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

    if (user) {
      this.usuario.nome = user.fullname;
      this.usuario.cpf = user.cpf;
      this.usuario.email = user.email;
      this.usuario.telefone = user.phoneNumber;
    }
  }

  salvarAlteracoes() {
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.telefone) {
      alert('Por favor, preencha todos os campos dos Dados Pessoais!');
      return;
    }

    localStorage.setItem(
      'elderconnect_profile',
      JSON.stringify(this.usuario)
    );

    localStorage.setItem('user_name', this.usuario.nome);

    alert('Dados pessoais atualizados com sucesso!');
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

    localStorage.setItem('user_password', this.novaSenha);

    alert('Senha alterada com sucesso!');

    this.senhaAtual = '';
    this.novaSenha = '';
    this.confirmarNovaSenha = '';
  }
}