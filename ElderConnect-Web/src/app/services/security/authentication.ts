import { Injectable, signal } from '@angular/core';
import { AuthenticatedUserDto } from '../../models/dto/authenticated-user-dto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Authentication {

  public usuarioLogado = signal<boolean>(false);
  public mostrarAlertaCadastroGlobal: boolean = false;

  constructor(private http: HttpClient) {}

  authenticate(email: string, password: string) {
    return this.http.post<AuthenticatedUserDto>(
      'http://localhost:8081/authenticate',
      {
        email: email,
        password: password
      }
    );
  }

  logar(user: AuthenticatedUserDto): void {

    this.usuarioLogado.set(true);

    if (user) {
      localStorage.setItem('id', String(user.id ?? ''));
      localStorage.setItem('fullname', user.fullname ?? '');
      localStorage.setItem('email', user.email ?? '');
      localStorage.setItem('userType', user.userType ?? '');
    }
  }

  usuarioAtual(): AuthenticatedUserDto | null {
    try {
      return this.getAuthenticatedUser();
    } catch {
      return null;
    }
  }

  getAuthenticatedUser(): AuthenticatedUserDto {
    const id = localStorage.getItem('id');
    const fullname = localStorage.getItem('fullname');
    const email = localStorage.getItem('email');
    const userType = localStorage.getItem('userType');

    if (!id || !fullname || !email || !userType) {
      throw new Error('Dados do usuário não encontrados.');
    }

    return {
      id: Number(id),
      fullname: fullname,
      cpf: '',
      email: email,
      phoneNumber: '',
      userType: userType,
      birthDate: ''
    };
  }

  logout(): void {
    this.usuarioLogado.set(false);
    localStorage.removeItem('id');
    localStorage.removeItem('fullname');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
  }
}