import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authentication {

  public usuarioLogado = signal<boolean>(false);
  public mostrarAlertaCadastroGlobal: boolean = false;

  logar() {
    this.usuarioLogado.set(true);
  }

  logout() {
    this.usuarioLogado.set(false);
  }
}