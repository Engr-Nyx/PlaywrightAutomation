import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/base.page';
const { allure } = require('allure-playwright');
export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#login, input[type="text"], login');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button', { hasText: 'Log in' });
    }

    async login(username: string, password: string) {
        await allure.step('Input login credentials', async () => {
            await this.usernameInput.fill(username);
            await this.passwordInput.fill(password);
            await this.loginButton.click();
        });
    }

    async isUserInputVisible() {
        await allure.step('Verify username input is visible', async () => {
            await expect(this.usernameInput).toBeVisible();
        });
    }

    async isPasswordInputVisible() {
        await allure.step('Verify password input is visible', async () => {
            await expect(this.passwordInput).toBeVisible();
        });
    }

    async isLoginButtonVisible() {
        await allure.step('Verify login button is visible', async () => {
            await expect(this.loginButton).toBeVisible();
        });
    }


    async isLoginFormVisible() {
        await allure.step('Verify login form elements are visible', async () => {
            await this.isUserInputVisible();
            await this.isPasswordInputVisible();
            await this.isLoginButtonVisible();
        });
    }
}