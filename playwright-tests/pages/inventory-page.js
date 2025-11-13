import { BasePage } from './base-page';
import { HeaderComponent } from '../components';

export class InventoryPage extends BasePage {
  constructor(page) {
    super();
    this.page = page;
    this.headerComponent = new HeaderComponent(page);
    this.sortSelect = page.locator("[data-test='product-sort-container']");
    this.itemsMap = {
      "Sauce Labs Backpack": page.locator('#add-to-cart-sauce-labs-backpack'),
      "Sauce Labs Bike Light": page.locator('#add-to-cart-sauce-labs-bike-light'),
      "Sauce Labs Bolt T-Shirt": page.locator('#add-to-cart-sauce-labs-bolt-t-shirt'),
      "Sauce Labs Fleece Jacket": page.locator('#add-to-cart-sauce-labs-fleece-jacket'),
      "Sauce Labs Onesie": page.locator('#add-to-cart-sauce-labs-onesie'),
      "Test.allTheThings() T-Shirt (Red)": page.locator('#add-to-cart-test.allthethings()-t-shirt-(red)'),
    };
  }

  get url() {
    return `${this._baseUrl}/inventory.html`;
  }

  async sortItemsByPrice(order) {
    if (order === 'highToLow') {
      await this.sortSelect.selectOption('hilo');
    } else {
      await this.sortSelect.selectOption('lohi');
    }
  }

  async getFirstItemName() {
    return this.page.locator("//*[@data-test='inventory-item'][1]//*[@data-test='inventory-item-name']").first().textContent();
  }

  async addItemToCart(itemName) {
    await this.itemsMap[itemName].click();
  }

  async openCart() {
    return this.headerComponent.shoppingCartContainer.click();
  }

  async getPageTitle() {
    return this.headerComponent.title.textContent();
  }
}