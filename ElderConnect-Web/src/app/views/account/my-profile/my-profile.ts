import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  // Dados Pessoais do Usuário
  usuario: PerfilUsuario = {
    nome: 'Maria Silva',
    email: 'maria@email.com',
    telefone: '(35) 99999-8888',
    cpf: '123.456.789-00'
  };

  // Campos para Alteração de Senha
  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';

  ngOnInit() {
    this.carregarDadosPerfil();
  }

  // Carrega os dados gravados no localStorage
  carregarDadosPerfil() {
    const salvos = localStorage.getItem('elderconnect_profile');
    if (salvos) {
      this.usuario = JSON.parse(salvos);
    }
  }

  // Salva Nome, E-mail e Telefone alterados
  salvarAlteracoes() {
    if (!this.usuario.nome || !this.usuario.email || !this.usuario.telefone) {
      alert('Por favor, preencha todos os campos dos Dados Pessoais!');
      return;
    }

    // Salva o objeto completo do perfil no localStorage
    localStorage.setItem('elderconnect_profile', JSON.stringify(this.usuario));

    // Atualiza também o nome global para refletir nos Dashboards
    localStorage.setItem('user_name', this.usuario.nome);

    alert('Dados pessoais atualizados com sucesso!');
  }

  // Processa a troca de senha
  atualizarSenha() {
    if (!this.senhaAtual || !this.novaSenha || !this.confirmarNovaSenha) {
      alert('Preencha todos os campos de senha!');
      return;
    }

    if (this.novaSenha.length < 6) {
      alert('A nova senha deve ter no mínimo 6 caracteres!');
      return;
    }

    if (this.novaSenha !== this.confirmarNovaSenha) {
      alert('A nova senha e a confirmação não coincidem!');
      return;
    }

    // Grava a nova senha mockada
    localStorage.setItem('user_password', this.novaSenha);

    alert('Senha alterada com sucesso!');
    this.senhaAtual = '';
    this.novaSenha = '';
    this.confirmarNovaSenha = '';
  }
}