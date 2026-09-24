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

  updateProfile(id: number, fullname: string, phoneNumber: string): Observable<void> {
  return this.http.put<void>(
    `${this.apiUrl}/profile/${id}`,
    {
      id: id,
      fullname: fullname,
      phoneNumber: phoneNumber
    }
  );
  }

  updateEmail(id: number, password: string, newEmail: string): Observable<void> {
  return this.http.patch<void>(
    `${this.apiUrl}/update-email`,
    {
      id: id,
      password: password,
      newEmail: newEmail
    }
  );
  }

  updatePassword(
  id: number,
  oldPassword: string,
  newPassword: string
): Observable<void> {
  return this.http.patch<void>(
    `${this.apiUrl}/update-password`,
    {
      id: id,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
  );
}

deleteUser(id: number): Observable<void> {
  return this.http.delete<void>(
    `${this.apiUrl}/${id}`
  );
}

  
}

