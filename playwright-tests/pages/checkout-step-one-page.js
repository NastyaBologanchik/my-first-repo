import { BasePage } from './base-page';

export class CheckoutStepOnePage extends BasePage {
  constructor(page) {
    super();
    this.page = page;

    this.firstNameInput = page.locator("#first-name");
    this.lastNameInput = page.locator("#last-name");
    this.postCodeInput = page.locator("#postal-code");
    this.continueButton = page.locator("#continue");
  }

  get url() {
    return `${this._baseUrl}/checkout-step-one.html`;
  }

  async fillUserInfo(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }
}