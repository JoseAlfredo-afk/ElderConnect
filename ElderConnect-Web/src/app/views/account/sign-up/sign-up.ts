import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/user/auth';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  cadastroForm: FormGroup;
  mostrarSucesso: boolean = false;
  private authService = inject(AuthService)

  constructor(private fb: FormBuilder, private router: Router) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      dataNascimento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmaSenha: ['', [Validators.required]]
    });
  }

  aplicarMascara(event: Event, tipo: string) {
    const input = event.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');

    if (tipo === 'cpf') {
      if (valor.length > 11) valor = valor.substring(0, 11);
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }

    else if (tipo === 'data') {
      if (valor.length > 8) valor = valor.substring(0, 8);
      valor = valor.replace(/(\d{2})(\d)/, '$1/$2');
      valor = valor.replace(/(\d{2})(\d{1,4})$/, '$1/$2');
    }

    else if (tipo === 'telefone') {
      if (valor.length > 11) valor = valor.substring(0, 11);
      valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
      valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
    }

    input.value = valor;

    this.cadastroForm.get(tipo === 'data' ? 'dataNascimento' : tipo)?.setValue(valor, { emitEvent: false });
  }

  submeter() {
    if (this.cadastroForm.valid) {
      this.mostrarSucesso = true;

      // Ativa o estado de logado imediatamente para sumir os botões do topo
      this.authService.logar();

      setTimeout(() => {
        this.router.navigate(['/home']); // Pode mandar direto para a Home já logado!
      }, 2500);
    } else {
      this.cadastroForm.markAllAsTouched();
    }
  }
}