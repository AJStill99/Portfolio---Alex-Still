const { test, expect } = require('@playwright/test');
const Products = require('../components/products');

test('Product actions demo', async ({ page }) => {
  const products = Products(page);
  // This line is important. the products import needs the page object to work properly. 
  // This will give the functions access to the Playwright page methods and properties.
  await page.goto('/collections/frontpage');

  const allProducts = await products.captureProducts(); // Using custom component method
  
  console.log('Total products:', allProducts.length);
  expect(allProducts.length).toBeGreaterThan(0);

  const firstProduct = products.getFirstProduct();
  await products.addProductToCart(firstProduct);
  console.log(`Added first product: ${firstProduct.title}`);

  const lastProduct = products.getLastProduct();
  await products.addProductToCart(lastProduct);
  console.log(`Added last product: ${lastProduct.title}`);

  await products.addProductToCart(products.getNthProduct(1));

  allProducts.forEach((product, index) => {
    console.log(
      `Product ${index + 1}: ${product.title} - ${product.price}`
    );
  });

  await products.consoleLogProducts(); // Log all captured products - for transparency

  expect(firstProduct.title).toBeTruthy();
});