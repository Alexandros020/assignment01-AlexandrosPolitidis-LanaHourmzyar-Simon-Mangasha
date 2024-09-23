import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameTextfield: Locator; 
  readonly passwordTextfield: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameTextfield = page.locator('#app > div > form > div:nth-child(1) > input[type=text]');
    this.passwordTextfield = page.locator('#app > div > form > div:nth-child(2) > input[type=password]');
    this.loginButton = page.locator('#app > div > form > div.field.action > button');
  }

  async goto() {
    await this.page.goto(`${process.env.BASE_URL}`);
  }

  async performLogin(username: string, password: string) {
    await this.usernameTextfield.fill(username);
    await this.passwordTextfield.fill(password);
    await this.loginButton.click();
  }
}
