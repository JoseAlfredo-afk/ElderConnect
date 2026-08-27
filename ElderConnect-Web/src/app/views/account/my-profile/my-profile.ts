import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.html'
})
export class Profile implements OnInit {
  usuario = {
    nome: 'Maria Silva',
    email: 'maria@email.com',
    telefone: '(35) 99999-8888',
    cpf: '123.456.789-00'
  };

  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarNovaSenha: string = '';

  ngOnInit() {
    this.carregarDadosPerfil();
  }

  carregarDadosPerfil() {
    const salvos = localStorage.getItem('elderconnect_profile');
    if (salvos) {
      this.usuario = JSON.parse(salvos);
    }
  }

  salvarAlteracoes() {
    localStorage.setItem('elderconnect_profile', JSON.stringify(this.usuario));
    alert('Dados pessoais atualizados com sucesso!');
  }

  atualizarSenha() {
    if (!this.senhaAtual || !this.novaSenha || !this.confirmarNovaSenha) {
      alert('Preencha todos os campos de senha!');
      return;
    }

    if (this.novaSenha !== this.confirmarNovaSenha) {
      alert('A nova senha e a confirmação não coincidem!');
      return;
    }

    alert('Senha alterada com sucesso!');
    this.senhaAtual = '';
    this.novaSenha = '';
    this.confirmarNovaSenha = '';
  }
}