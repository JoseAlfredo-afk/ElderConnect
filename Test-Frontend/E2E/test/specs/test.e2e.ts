import { browser, expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {
        await LoginPage.open()

        await LoginPage.login('maria@email.com', '12345678')
        await expect(browser).toHaveUrl(expect.stringMatching(/\/dashboard\/(?:elder|caregiver)$/))
        await expect(SecurePage.flashAlert).toBeExisting()
        await expect(SecurePage.flashAlert).toHaveText(
            expect.stringContaining('Logado com sucesso!'))
        await expect(SecurePage.flashAlert).toMatchElementSnapshot('flashAlert')
    })
})

