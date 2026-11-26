import { Injectable, signal } from '@angular/core';
import { AuthenticatedUserDto } from '../../models/dto/authenticated-user-dto';
import { HttpClient } from '@angular/common/http';
import { JwtTokenDto } from '../../models/dto/jwt-token-dto';

@Injectable({
  providedIn: 'root',
})
export class Authentication {

  public usuarioLogado = signal<boolean>(false);
  public mostrarAlertaCadastroGlobal: boolean = false;

  constructor(private http: HttpClient) {

    const id = localStorage.getItem('id');
    const fullname = localStorage.getItem('fullname');
    const email = localStorage.getItem('email');
    const userType = localStorage.getItem('userType');

    if (id && fullname && email && userType) {
      this.usuarioLogado.set(true);
    }
  }

  authenticate(email: string, password: string) {
    return this.http.post<JwtTokenDto>(
      'http://localhost:8081/authenticate',
      {
        email: email,
        password: password
      }
    );
  }

  logar(response: JwtTokenDto): AuthenticatedUserDto {

    const token = response.token;

    const payload = JSON.parse(
      atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
    );

    const user: AuthenticatedUserDto = {
      id: payload.id,
      fullname: payload.fullname,
      email: payload.email,
      userType: payload.userType
    };

    localStorage.setItem('token', token);
    localStorage.setItem('id', String(user.id));
    localStorage.setItem('fullname', user.fullname);
    localStorage.setItem('email', user.email);
    localStorage.setItem('userType', user.userType);

    this.usuarioLogado.set(true);

    return user;
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
    localStorage.removeItem('token');
  }

  cadastrarUsuario(usuario: any) {
    return this.http.post(
      'http://localhost:8081/api/user',
      usuario
    );
  }

  buscarUsuarioPorEmail(email: string) {
    return this.http.get<any>(
      `http://localhost:8081/api/user/email/${encodeURIComponent(email)}`
    );
  }

  atualizarPerfilCuidador(id: number, perfil: any) {
    return this.http.put(
      `http://localhost:8081/api/user/${id}/caregiver-profile`,
      perfil
    );
  }


}