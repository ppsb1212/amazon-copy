import { cart } from "../../data/cart.js";
import formatCurrency from "../utils/money.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalQuantity = 0;

  cart.forEach(cartItem => {
    let productId = cartItem.productId;
    let matchingProduct;
    

    totalQuantity += cartItem.quantity;
    
    products.forEach((product) => {
      if(product.id === productId){
        matchingProduct = product;
      }
    });

    productPriceCents += matchingProduct.priceCents * cartItem.quantity;

    let deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;
    
    deliveryOptions.forEach((option) =>{
      if(option.id === deliveryOptionId){
        deliveryOption = option;
      }
    });
    shippingPriceCents += deliveryOption.priceCents;

  });
  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const tax = (totalBeforeTax) * (10/100);
  const total = totalBeforeTax + tax;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}