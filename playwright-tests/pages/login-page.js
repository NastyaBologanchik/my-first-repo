import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  constructor(page) {
    super();
    this.page = page;

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('[placeholder="Password"]');
    this.submitButton = page.locator('[data-test="login-button"]');
  }

  get url() {
    return `${this._baseUrl}/`;
  }

  async open() {
    await this.page.goto(this.url);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password)
    await this.submitButton.click();
  }
}