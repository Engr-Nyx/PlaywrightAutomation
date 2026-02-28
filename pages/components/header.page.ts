import { Page, Locator } from '@playwright/test';
import { DashboardPage } from '../dashboard/dashboard.page';
const {allure} = require('allure-playwright');

export class HeaderNavigationBar extends DashboardPage {
  readonly headerLogo: Locator;
  readonly headerHomeButton: Locator;
  readonly headerContactButton: Locator;
  readonly headerAboutUsButton: Locator;
  readonly headerCartButton: Locator;
  readonly headerLoginButton: Locator;
  readonly headerSignUpButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerLogo = page.getByRole('link', { name: 'PRODUCT STORE'});
    this.headerHomeButton = page.getByRole('link', { name: 'Home' });
    this.headerContactButton = page.getByRole('link', { name: 'Contact'});
    this.headerAboutUsButton = page.getByRole('link', { name: 'About us'});
    this.headerCartButton = page.getByRole('link', { name: 'Cart'});
    this.headerLoginButton = page.getByRole('link', { name: 'Log in'});
    this.headerSignUpButton = page.getByRole('link', { name: 'Sign up'});
  }

  async clickHeaderLoginButton() {
    await allure.step('Click header login button', async()=>{
      await this.headerLoginButton.click();
    });
  }

  async clickHeaderSignUpButton() {
    await allure.step('Click header Sign up button', async()=>{
      await this.headerSignUpButton.click();
    });
  }

  
}