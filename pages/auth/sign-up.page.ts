import { Page, Locator, expect, Browser } from '@playwright/test';
import { HeaderNavigationBar } from '../components/header.page';
const { allure } = require('allure-playwright');

export class SignUpPage extends HeaderNavigationBar {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly signUpButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page, browser: Browser) {
    super(page, browser);
    this.usernameInput = page.getByRole('textbox', { name: 'Username:' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password:' });
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.closeButton = page.getByLabel('Sign up').getByText('Close');
  }

  async clickUsernameInput(){
		await allure.step('Click username input', async () => {
      await this.usernameInput.click();
    });
	}

	async clickPasswordInput(){
		await allure.step('Click password input', async () => {
      await this.passwordInput.click();
    });
	}

	async clickCloseButton(){
		await allure.step('Click close input', async () => {
      await this.closeButton.click();
      const screenshot = await this.page.screenshot({ fullPage: false });
			await allure.attachment('Login page screenshot', screenshot, 'image/png');
    });
	}

	async clickSignUpButton(){
		await allure.step('Click sign up input', async () => {
      await this.signUpButton.click();
    });
	}

  async signUp(username: string, password: string) {
    await allure.step('Perform sign', async () => {
      await this.fillSignUpForm(username, password);
      await this.signUpButton.click();
      const screenshot = await this.page.screenshot({ fullPage: false });
			await allure.attachment('Login page screenshot', screenshot, 'image/png');
    });
  }

  async fillSignUpForm(username: string, password: string) {
    await allure.step('Input sign up credentials', async () => {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      const screenshot = await this.page.screenshot({ fullPage: false });
			await allure.attachment('Login page screenshot', screenshot, 'image/png');
    });
  }

  async verifySignUpFormVisible() {
    await allure.step('Verify sign up form elements are visible', async () => {
      await expect(this.usernameInput).toBeVisible();
      await expect(this.passwordInput).toBeVisible();
      await expect(this.signUpButton).toBeVisible();
      await expect(this.closeButton).toBeVisible();
    });
  }
}