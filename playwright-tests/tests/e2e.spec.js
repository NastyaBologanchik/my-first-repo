const { test, expect } = require('@playwright/test');
const { LoginPage, InventoryPage, CartPage, CheckoutStepOnePage, CheckoutStepTwoPage, CheckoutCompletePage } = require('../pages');

test.describe('Sauce Demo', () => {
  test('Пользователь должен успешно войти в систему и совершить покупку', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login('standard_user','secret_sauce');

    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL(inventoryPage.url);
    expect(await inventoryPage.getPageTitle()).toBe('Products');

    await inventoryPage.sortItemsByPrice('highToLow');
    const firstItemName = await inventoryPage.getFirstItemName();
    await inventoryPage.addItemToCart(firstItemName);
    await inventoryPage.openCart();

    const cartPage = new CartPage(page);
    await expect(page).toHaveURL(cartPage.url);

    const actualItemNames = await cartPage.getItemNames();
    expect((actualItemNames).includes(firstItemName)).toBe(true);

    await cartPage.checkout();

    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    await expect(page).toHaveURL(checkoutStepOnePage.url);

    await checkoutStepOnePage.fillUserInfo('Test', 'User', '12345');
    await checkoutStepOnePage.continue();

    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    await expect(page).toHaveURL(checkoutStepTwoPage.url);
    await checkoutStepTwoPage.finish();

    const checkoutCompletePage = new CheckoutCompletePage(page);
    await expect(page).toHaveURL(checkoutCompletePage.url);
    await expect(checkoutCompletePage.completeHeader).toContainText('Thank you for your order!');
  });
});