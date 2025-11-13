export class HeaderComponent {
  constructor(page) {
    this.page = page;

    this.title = page.locator('[data-test="title"]');
    this.shoppingCartContainer = page.locator('#shopping_cart_container');
  }
}