import { BasePage } from './base-page';

export class CheckoutCompletePage extends BasePage {
  constructor(page) {
    super();
    this.page = page;

    this.completeHeader = page.locator("[data-test='complete-header']");
  }

  get url() {
    return `${this._baseUrl}/checkout-complete.html`;
  }
}