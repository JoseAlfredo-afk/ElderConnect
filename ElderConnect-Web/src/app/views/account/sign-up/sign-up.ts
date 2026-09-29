import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Authentication } from '../../../services/security/authentication';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp implements OnInit {

  tipoConta: 'idoso' | 'cuidador' = 'idoso';
  exibirModalTermos: boolean = false;

  exibirToast: boolean = false;
  mensagemToast: string = '';
  tipoToast: 'sucesso' | 'erro' = 'erro';
  private toastTimer: any;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  protected authService = inject(Authentication);

  cadastroForm: FormGroup = this.fb.group({
    nome: ['', [Validators.required]],
    dataNascimento: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required]],
    telefone: ['', [Validators.required]],
    senha: ['', [Validators.required, Validators.minLength(8)]],
    confirmaSenha: ['', [Validators.required]],
    aceitaTermos: [false, [Validators.requiredTrue]]
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['type'] === 'cuidador') {
        this.tipoConta = 'cuidador';
      }
    });
  }

  mostrarNotificacao(mensagem: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagemToast = mensagem;
    this.tipoToast = tipo;
    this.exibirToast = true;
    this.cdr.detectChanges();

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }

    this.toastTimer = setTimeout(() => {
      this.fecharToast();
    }, 3000);
  }

  fecharToast(): void {
    this.exibirToast = false;
    this.cdr.detectChanges();
  }

  alterarTipoConta(tipo: 'idoso' | 'cuidador') {
    this.tipoConta = tipo;
  }

  abrirModalTermos(event: Event) {
    event.preventDefault();
    this.exibirModalTermos = true;
  }

  fecharModalTermos() {
    this.exibirModalTermos = false;
  }

  aceitarTermosEFechar() {
    this.cadastroForm.get('aceitaTermos')?.setValue(true);
    this.fecharModalTermos();
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
    const campoControl = tipo === 'data' ? 'dataNascimento' : tipo;
    this.cadastroForm.get(campoControl)?.setValue(valor, { emitEvent: false });
  }

  submeter() {
    if (!this.cadastroForm.valid) {
      this.cadastroForm.markAllAsTouched();

      if (this.cadastroForm.get('aceitaTermos')?.invalid) {
        this.mostrarNotificacao('Você precisa aceitar os Termos de Uso e Privacidade para continuar.', 'erro');
      } else {
        this.mostrarNotificacao('Por favor, preencha todos os campos obrigatórios.', 'erro');
      }
      return;
    }

    const dados = this.cadastroForm.value;

    if (dados.senha !== dados.confirmaSenha) {
      this.mostrarNotificacao('A senha e a confirmação de senha não coincidem.', 'erro');
      return;
    }

    if (this.tipoConta === 'cuidador') {
      this.router.navigate(['/account/complete-profile'], {
        state: { dadosCadastro: dados }
      });
      return;
    }

    const usuario = {
      fullname: dados.nome,
      birthDate: this.converterData(dados.dataNascimento),
      email: dados.email,
      cpf: dados.cpf.replace(/\D/g, ''),
      phoneNumber: dados.telefone.replace(/\D/g, ''),
      password: dados.senha,
      userType: 'IDOSO'
    };

    this.authService.cadastrarUsuario(usuario).subscribe({
      next: () => {
        this.authService.mostrarAlertaCadastroGlobal = true;
        this.router.navigate(['/account/sign-in']);
      },
      error: (erro) => {
        console.error('Erro ao cadastrar usuário:', erro);
        this.mostrarNotificacao('Não foi possível realizar o cadastro. Verifique os dados.', 'erro');
      }
    });
  }

  private converterData(data: string): string {
    const partes = data.split('/');
    if (partes.length !== 3 || partes[2].length !== 4) {
      return data;
    }
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  }
}