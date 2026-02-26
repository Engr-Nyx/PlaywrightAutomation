import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/base.page';

export class DashboardPage extends BasePage {
  readonly welcomeText: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeText = page.locator('.welcome');
  }

  async getWelcomeMessage() {
    return this.welcomeText.textContent();
  }
}