import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/auth/login.page';
import { SignUpPage } from '../pages/auth/sign-up.page';
import { DashboardPage } from '../pages/dashboard/dashboard.page';

type fixtures = {
  loginPage: LoginPage;
  signUpPage: SignUpPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<fixtures>({
  loginPage: async ({ page, browser }, use) => {
    await use(new LoginPage(page, browser));
  },
  signUpPage: async ({ page, browser }, use) => {
    await use(new SignUpPage(page, browser));
  },
  dashboardPage: async ({ page, browser }, use) => {
    await use(new DashboardPage(page, browser));
  },
});

export { expect } from '@playwright/test';