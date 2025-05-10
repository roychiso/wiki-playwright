import { expect, test } from '@playwright/test';
import dotenv from 'dotenv';
import { LoginPage } from '../pages/LoginPage';

dotenv.config();

const targetUrl = process.env.TARGET_URL;
const authFile = 'src/auth/login.json';
let loginPage: LoginPage;

test('Sign in to Wikipedia', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithValidCredentials();
    
    if (!targetUrl) {
        throw new Error(`Target URL is not defined!`);
    }
    await expect(page).toHaveURL(targetUrl);

    // Save storage state
    await page.context().storageState({ path: authFile });
    console.log(`Storage state saved to ${authFile}`);
});
