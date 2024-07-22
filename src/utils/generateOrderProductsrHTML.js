const generateOrderProductsrHTML = (order) => {
  let productsHTML;

  order.products.forEach(productItem => {
    productsHTML += 
    `
      Product: \n
        id: ${productItem.product.id}\n
        Title: ${productItem.product.title.en}\n
        Quantity: ${productItem.quantity}\n
        Price: ${productItem.quantityPrice}\n
    `;
  });

  return productsHTML; 
}

export default generateOrderProductsrHTML;