import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base/base.page';
const { allure } = require('allure-playwright');
export class LoginPage extends BasePage {
	readonly usernameInput: Locator;
	readonly passwordInput: Locator;
	readonly showPassword: Locator;
	readonly loginButton: Locator;

	constructor(page: Page) {
		super(page);
		this.usernameInput = page.getByRole('textbox', { name: 'Email' })
		this.passwordInput = page.getByRole('textbox', { name: 'Password' });
		this.showPassword = page.locator('button.o_show_password');
		this.loginButton = page.getByRole('button', { name: 'Log in' });
	}

	async fillPasswordInput(password: string) {
		await allure.step('Fill password input', async () => {
			this.passwordInput.fill(password);
		})
	}

	async clickShowPasswordButton() {
		await allure.step('Click show password button', async () => {
			await this.showPassword.click();
		})
	}

	async login(username: string, password: string) {
		await allure.step('Input login credentials', async () => {
			await this.usernameInput.fill(username);
			await this.fillPasswordInput(password);
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

	async isShowButtonVisible() {
		await allure.step('Verify show password button is visible', async () => {
			await expect(this.showPassword).toBeVisible();
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