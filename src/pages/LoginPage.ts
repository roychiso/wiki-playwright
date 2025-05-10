import { Locator, Page } from '@playwright/test'

export class LoginPage {
    readonly page: Page;
    readonly englishLink: Locator;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly error: Locator;

    constructor(page: Page) {
        this.page = page;
        this.englishLink = page.getByRole('link', { name: 'English' });
        this.usernameField = page.locator('#wpName1');
        this.passwordField = page.locator('#wpPassword1');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.error = page.getByText('Incorrect username or password entered');
    }
    
    async goto() {
        const loginURL = process.env.LOGIN_URL;
        if (!loginURL) {
            throw new Error(`Login URL is not defined!`);
        }
        await this.page.goto(`${loginURL}`);
        await this.englishLink.click();
    }

    async fillEmail(email: string) {
        await this.usernameField.fill(email);
    }
    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }
    async clickSubmit() {
        await this.loginButton.click();
    }

    async isErrorMessageVisible(): Promise<boolean> {
        return this.error.isVisible();
    }

    async getErrorMessage(): Promise<string | null> {
        await this.error.waitFor({ state: 'visible' });
        return this.error.textContent();
    }

    async loginWithValidCredentials() {
        const username = process.env.WIKIPEDIA_USERNAME;
        const password = process.env.WIKIPEDIA_PASSWORD;
        if (!username || !password) {
            throw new Error(`Username or password is not defined!`);
        }
        await this.goto();
        await this.fillEmail(username);
        await this.fillPassword(password);
        await this.clickSubmit();
    }

}
