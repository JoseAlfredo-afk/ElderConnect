import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.html'
})
export class Profile {
  usuario = {
    nome: 'Maria Silva',
    email: 'maria@email.com',
    telefone: '(35) 99999-8888',
    cpf: '123.456.789-00'
  };

  senhaAtual: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';

  alertaSucesso: boolean = false;

  salvarPerfil() {
    this.alertaSucesso = true;
    setTimeout(() => this.alertaSucesso = false, 3000);
  }

  alterarSenha() {
    if (this.novaSenha && this.novaSenha === this.confirmarSenha) {
      alert('Senha alterada com sucesso!');
      this.senhaAtual = '';
      this.novaSenha = '';
      this.confirmarSenha = '';
    } else {
      alert('As senhas não coincidem!');
    }
  }
}