import { BasePage } from './base-page';

export class CartPage extends BasePage {
  constructor(page) {
    super();
    this.page = page;

    this.checkoutButton = page.locator("#checkout");
    this.inventoryItemNames = page.locator("[data-test='inventory-item-name']");
  }

  get url() {
    return `${this._baseUrl}/cart.html`;
  }

  async getItemNames() {
    const names = [];

    for (const nameLocator of await this.inventoryItemNames.all()) {
      const name = await nameLocator.textContent();
      names.push(name);
    }
    return names;
  }

  async checkout() {
    return this.checkoutButton.click();
  }
}