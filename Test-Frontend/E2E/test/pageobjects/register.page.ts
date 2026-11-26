import { $ } from '@wdio/globals'
import Page from './page.js';

type DadosCadastro = {
    nome: string
    dataNascimento: string
    email: string
    cpf: string
    telefone: string
    senha: string
    confirmaSenha: string
}

class RegisterPage extends Page {

    public get btnCadastrar() {
        return $('a[href="/account/sign-up"]');
    }

    async cadastrar(dados: DadosCadastro, tipo: 'idoso' | 'cuidador' = 'idoso') {
        (await this.btnCadastrar).click();
        for (const [campo, valor] of Object.entries(dados)) {
            await $(`app-sign-up input[formcontrolname="${campo}"]`).setValue(valor)
        }

        await $('#aceitaTermos').click()
        await $('button=Cadastrar').click()
    }

    get confirmacao() {
        return $('.alert=Cadastrado com sucesso!')
    }

    public open() {
        return super.open('cadastrar');
    }
}

export default new RegisterPage()