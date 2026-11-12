import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('tomsmith', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveText(
            expect.stringContaining('You logged into a secure area!'))
        await expect(SecurePage.flashAlert).toMatchElementSnapshot('flashAlert')
    })

    it('should UserName invalid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('longinInvalido', 'SuperSecretPassword!')
        await expect(SecurePage.flashAlertErrorUserInvalid).toBeExisting()
        await expect(SecurePage.flashAlertErrorUserInvalid).toHaveText(
            expect.stringContaining('Your username is invalid!'))
        await expect(SecurePage.flashAlertErrorUserInvalid).toMatchElementSnapshot('flashAlertErrorUserInvalid')
    })


    it('should Password invalid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('tomsmith', 'SenhaInvalida')
        await expect(SecurePage.flashAlertErrorPasswordInvalid).toBeExisting()
        await expect(SecurePage.flashAlertErrorPasswordInvalid).toHaveText(
            expect.stringContaining('Your password is invalid!'))
        await expect(SecurePage.flashAlertErrorPasswordInvalid).toMatchElementSnapshot('flashAlertErrorPasswordInvalid')
    })




})


