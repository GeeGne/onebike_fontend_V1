function generateOrderHTML(order) {
  let productsHTML = '';

  products.forEach(productItem => {
    productsHTML += 
      `
        <tr>
            <td>${productItem.product.title.en}</td>
            <td>${productItem.quantity}</td>
            <td>${productItem.quantityPrice}</td>
        </tr>
    `;
  });

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h1 {
              font-size: 24px;
              color: #333;
          }
          .order-details, .customer-details, .shipping-address, .products {
              margin-bottom: 20px;
          }
          .section-title {
              font-size: 18px;
              color: #555;
              border-bottom: 1px solid #ddd;
              padding-bottom: 8px;
              margin-bottom: 10px;
          }
          .details-table {
              width: 100%;
              border-collapse: collapse;
          }
          .details-table th, .details-table td {
              text-align: left;
              padding: 8px;
              border-bottom: 1px solid #ddd;
          }
          .details-table th {
              background-color: #f8f8f8;
          }
          .total {
              font-size: 18px;
              color: #333;
              text-align: right;
              padding-top: 10px;
              border-top: 1px solid #ddd;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Order Confirmation</h1>
          <div class="order-details">
              <div class="section-title">Order Details</div>
              <table class="details-table">
                  <tr>
                      <th>Order ID:</th>
                      <td>${order.orderId}</td>
                  </tr>
                  <tr>
                      <th>Order Date:</th>
                      <td>${order.orderDate}</td>
                  </tr>
                  <tr>
                      <th>Order Status:</th>
                      <td>${order.orderStatus}</td>
                  </tr>
              </table>
          </div>
          <div class="customer-details">
              <div class="section-title">Customer Details</div>
              <table class="details-table">
                  <tr>
                      <th>Customer ID:</th>
                      <td>${order.costumer.costumerId}</td>
                  </tr>
                  <tr>
                      <th>Full Name:</th>
                      <td>${order.costumer.fullName}</td>
                  </tr>
                  <tr>
                      <th>Email:</th>
                      <td>${order.costumer.email}</td>
                  </tr>
                  <tr>
                      <th>Phone:</th>
                      <td>${order.costumer.phone}</td>
                  </tr>
              </table>
          </div>
          <div class="shipping-address">
              <div class="section-title">Shipping Address</div>
              <table class="details-table">
                  <tr>
                      <th>City:</th>
                      <td>${order.shippingAddress.city}</td>
                  </tr>
                  <tr>
                      <th>Address Details:</th>
                      <td>${order.shippingAddress.addressDetails}</td>
                  </tr>
                  <tr>
                      <th>Second Address:</th>
                      <td>${order.shippingAddress.secondAddress}</td>
                  </tr>
                  <tr>
                      <th>Tracking Number:</th>
                      <td>${order.shippingAddress.trackingNumber}</td>
                  </tr>
              </table>
          </div>
          <div class="products">
              <div class="section-title">Products</div>
              <table class="details-table">
                  <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                  </tr>
                  ${productsHTML}
              </table>
          </div>
          <div class="total">
              <p>Subtotal: ${order.subtotal}</p>
              <p>Shipping Cost: ${order.shippingCost}</p>
              <p><strong>Total: ${order.total}</strong></p>
          </div>
      </div>
  </body>
  </html>
  `;
}

export default generateOrderProductsrHTML;