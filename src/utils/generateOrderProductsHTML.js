import formatNumberWithCommas from '/src/utils/formatNumberWithCommas';

const generateOrderProductsHTML = (order, styleType) => {
  let productsText = '';
  switch (styleType) {
    case 'a':
      order.products.forEach(productItem => {
        productsText += 
        `
          Product: \n
            id: ${productItem.product.id}\n
            Title: ${productItem.product.title.en}\n
            Quantity: ${productItem.quantity}\n
            Price: ${formatNumberWithCommas(productItem.quantityPrice)}\n
        `;
      });
    
      return productsText; 
    case 'b':
      productsText = "Product | Quantity | Price | Total\n";
      productsText += "-------|----------|-------|------\n";
    
      order.products.forEach(item => {
        const product = item.product;
        productsText += `${product.title.en} (${product.color.en}) | ${item.quantity} | $${formatNumberWithCommas(item.price)} | $${formatNumberWithCommas(item.quantityPrice)}\n`;
      });
    
      return productsText;
    default:
      console.error('Error: Unknown styleType', styleType)
  }
}

export default generateOrderProductsHTML;