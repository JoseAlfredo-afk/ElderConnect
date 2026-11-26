
import { randomInt, randomUUID } from 'node:crypto'
import { browser, expect } from '@wdio/globals'
import RegisterPage from '../pageobjects/register.page.js'

function gerarCpfDeTeste() {
    const digitos = Array.from(String(randomInt(100_000_000, 1_000_000_000)), Number)

    for (const peso of [10, 11]) {
        const soma = digitos.reduce((total, digito, i) => total + digito * (peso - i), 0)
        const resto = (soma * 10) % 11
        digitos.push(resto === 10 ? 0 : resto)
    }

    return digitos.join('')
}

describe('Cadastro de idoso ou responsável', () => {
    it('cria a conta e redireciona para o login', async () => {

        await RegisterPage.open()
        await RegisterPage.cadastrar({
            nome: 'IdosoTeste',
            dataNascimento: '01011950',
            email: `testeidoso${randomUUID()}@example.com`,
            cpf: gerarCpfDeTeste(),
            telefone: '35991919191',
            senha: 'senha12345678',
            confirmaSenha: 'senha12345678',
        })


        await expect(RegisterPage.confirmacao).toBeDisplayed()
    })
})