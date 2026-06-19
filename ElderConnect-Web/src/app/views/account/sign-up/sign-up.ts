import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/user/auth'; 

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  tipoConta: 'idoso' | 'cuidador' = 'idoso';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  protected authService = inject(AuthService);

  cadastroForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    dataNascimento: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmaSenha: ['', [Validators.required]]
  });

  alterarTipoConta(tipo: 'idoso' | 'cuidador') {
    this.tipoConta = tipo;
  }

  aplicarMascara(event: Event, tipo: 'data' | 'cpf' | 'telefone') {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    if (tipo === 'data') {
      if (valor.length > 2) valor = valor.substring(0, 2) + '/' + valor.substring(2);
      if (valor.length > 5) valor = valor.substring(0, 5) + '/' + valor.substring(5, 9);
    } else if (tipo === 'cpf') {
      if (valor.length > 3) valor = valor.substring(0, 3) + '.' + valor.substring(3);
      if (valor.length > 7) valor = valor.substring(0, 7) + '.' + valor.substring(7);
      if (valor.length > 11) valor = valor.substring(0, 11) + '-' + valor.substring(11, 13);
    } else if (tipo === 'telefone') {
      if (valor.length > 0) valor = '(' + valor;
      if (valor.length > 3) valor = valor.substring(0, 3) + ') ' + valor.substring(3);
      if (valor.length > 10) valor = valor.substring(0, 10) + '-' + valor.substring(10, 14);
    }
    input.value = valor;
    this.cadastroForm.get(tipo === 'data' ? 'dataNascimento' : tipo)?.setValue(valor, { emitEvent: false });
  }

  submeter() {
    if (this.cadastroForm.valid) {
      console.log('Dados do cadastro base:', this.cadastroForm.value);
      
      if (this.tipoConta === 'cuidador') {
      
        this.router.navigate(['/account/complete-profile']);
      } else {
        this.authService.mostrarAlertaCadastroGlobal = true; 
        this.router.navigate(['/account/sign-in']);
      }
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}