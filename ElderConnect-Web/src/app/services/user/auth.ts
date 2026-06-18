import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Signal que começa como 'false' (não logado)
  public usuarioLogado = signal<boolean>(false);

  logar() {
    this.usuarioLogado.set(true);
  }

  logout() {
    this.usuarioLogado.set(false);
  }
}