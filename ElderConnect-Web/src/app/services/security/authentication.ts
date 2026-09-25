import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authentication {

  public usuarioLogado = signal<boolean>(false);
  public mostrarAlertaCadastroGlobal: boolean = false;

  logar() {
    this.usuarioLogado.set(true);

  localStorage.setItem('id', user.id.toString());
  localStorage.setItem('fullname', user.fullname);
  localStorage.setItem('email', user.email);
  localStorage.setItem('userType', user.userType);

  }

  getAuthenticatedUser(): AuthenticatedUserDto {

  const id = localStorage.getItem('id');
  const fullname = localStorage.getItem('fullname');
  const email = localStorage.getItem('email');
  const userType = localStorage.getItem('userType');

  if (id == null || fullname == null || email == null || userType == null) {
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


  logout() {
    this.usuarioLogado.set(false);
  }
}