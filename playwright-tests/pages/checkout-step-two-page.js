import { BasePage } from './base-page';

export class CheckoutStepTwoPage extends BasePage {
  constructor(page) {
    super();
    this.page = page;

    this.paymentInfo = page.locator("[data-test='payment-info-label']");
    this.totalPrice = page.locator("[data-test='total-label']");
    this.finishButton = page.locator("#finish");
  }

  get url() {
    return `${this._baseUrl}/checkout-step-two.html`;
  }

  async finish() {
    await this.finishButton.click();
  }
}