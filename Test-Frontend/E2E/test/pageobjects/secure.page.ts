import { $ } from '@wdio/globals'
import Page from './page.js';

class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    public get flashAlert() {
        return $('.alert=Logado com sucesso!');
    }
}

export default new SecurePage();