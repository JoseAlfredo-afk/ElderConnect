import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Authentication } from '../../../services/security/authentication';
import { CreateUserDto } from '../../../models/dto/create-user-dto';
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
  protected authService = inject(Authentication);

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

      const birthDate: string = this.cadastroForm.value.dataNascimento;
      const partesData = birthDate.split('/');
      const dataNascimento = `${partesData[2]}-${partesData[1]}-${partesData[0]}`;


      const user ={
      fullname: this.cadastroForm.value.nome,
      birthDate: dataNascimento,
      
      

      cpf: this.cadastroForm.value.cpf,
      email: this.cadastroForm.value.email,
      phoneNumber: this.cadastroForm.value.telefone,
      password: this.cadastroForm.value.senha,
      userType:this.tipoConta.toUpperCase()

      }

      console.log('Enviando cadastro:', user);

      this.authService.signUp(user).subscribe({
        next: () => {
          console.log('Cadastro realizado com sucesso!');

          this.authService.mostrarAlertaCadastroGlobal = true;
          this.router.navigate(['/account/sign-in']);
        },
        error: (erro) => {
          console.error('Erro ao cadastrar usuário:', erro);
          alert('Erro ao realizar cadastro.');
        }
      });

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