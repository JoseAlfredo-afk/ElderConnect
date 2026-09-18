import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserCredentialDto } from '../../models/dto/user-credential-dto';
import { AuthenticatedUserDto } from '../../models/dto/authenticated-user-dto';
import { CreateUserDto } from '../../models/dto/create-user-dto';

@Injectable({
  providedIn: 'root',
})
export class Authentication {

  private http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8081/api/user';

  public usuarioLogado = signal<boolean>(false);
  public usuarioAtual = signal<AuthenticatedUserDto | null>(null);
  public mostrarAlertaCadastroGlobal: boolean = false;

  login(credentials: UserCredentialDto): Observable<AuthenticatedUserDto> {
    return this.http.post<AuthenticatedUserDto>(
      `${this.apiUrl}/sign-in`,
      credentials
    );
  }

  signUp(user:CreateUserDto): Observable<void>{
      return this.http.post<void>
      (this.apiUrl,user);
  }

  logar(user: AuthenticatedUserDto) {
    this.usuarioAtual.set(user);
    this.usuarioLogado.set(true);
  }

  logout() {
     this.usuarioAtual.set(null);
  this.usuarioLogado.set(false);
  }
}