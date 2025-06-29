import {cart} from'../data/cart.js'
import { findDeliveryoption } from '../data/deliveryOptions.js';
import { findProduct } from '../data/products.js'

export function renderPaymentsummary(){
    let productPriceCents=0;
    let shippingPrices=0;
    cart.forEach((cartItem)=>{
        const product=findProduct(cartItem.productId)
        productPriceCents +=product.priceCents*cartItem.quantity
        const deliveryOption=findDeliveryoption(cartItem.deliveryOptionId)
        shippingPrices  +=deliveryOption.priceCents

    })
    function convert(cents){
        return (Math.round(cents)/100).toFixed(2)
    }
  const TotalwithoutTaxes=shippingPrices+productPriceCents
  const tax=TotalwithoutTaxes*0.1;
  const total=TotalwithoutTaxes +tax
  console.log(total)
  const paymentSummaryHTML=  `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">${convert(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${convert(shippingPrices)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">${convert(TotalwithoutTaxes)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${convert(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${convert(total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
          document.querySelector(".payment-summary").innerHTML=paymentSummaryHTML
          
}
