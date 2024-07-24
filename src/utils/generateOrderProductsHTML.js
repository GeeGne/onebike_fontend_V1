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
      productsText = "------------------------------------------------------------\n";
      productsText += "ID | Product | Quantity | Price | Total \n";
      productsText += "------------------------------------------------------------\n";
    
      order.products.forEach(item => {
        const product = item.product;
        const id = product.id;
        const title = (product.title.en + (product.color ? (' (' + product.color.en + ')') : ''));
        const quantity = item.quantity.toString();
        const price = ('S.P' + formatNumberWithCommas(item.price));
        const total = ('S.P' + formatNumberWithCommas(item.quantityPrice));
    
        productsText += `${id} | ${title} | ${quantity} | ${price} | ${total} \n`;
        productsText += "------------------------------------------------------------\n";
      });
      
      return productsText;
    default:
      console.error('Error: Unknown styleType', styleType)
  }
}

export default generateOrderProductsHTML;