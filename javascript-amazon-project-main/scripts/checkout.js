import {cart,removeFromcart,updateDeliveryoption} from '../data/cart.js'
import { findProduct, products} from '../data/products.js'
import dayjs from'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions,findDeliveryoption} from '../data/deliveryOptions.js'
import { renderPaymentsummary } from './paymentSummary.js'


 

 function renderOrdersummary(){
let checkoutHtml=''
cart.forEach((cartItem)=>{
    const productId=cartItem.productId
    let matchingItem = findProduct(productId)
    
    const deliveryOptionId=cartItem.deliveryOptionId
    let deliveryOption=findDeliveryoption(deliveryOptionId)
    
    const today=dayjs();
    
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days')
  const dateString=deliveryDate.format('dddd,MMMM D')
    

    
     checkoutHtml +=`<div class="cart-item-container
        js-cart-item-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  ${(matchingItem.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"data-product-id="${matchingItem.id}" >
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem,cartItem)}
              </div>
            </div>
          </div>
`;
})


function deliveryOptionsHTML(matchingItem,cartItem){
  let deliveryHTML=''
  deliveryOptions.forEach((deliveryOption)=>{
    const today=dayjs();
    
    const deliveryDate=today.add(deliveryOption.deliveryDays,'days')
  const dateString=deliveryDate.format('dddd,MMMM D')
  
  const priceString=deliveryOption.priceCents === 0
   ?'FREE':`$${(deliveryOption.priceCents/100).toFixed(2)}`

  const isCheck= deliveryOption.id === cartItem.deliveryOptionId


  deliveryHTML+=
  `<div class="delivery-option"
  data-product-id="${matchingItem.id}"
  data-delivery-option-id="${deliveryOption.id}">
  <input type="radio"
  ${isCheck ? 'checked' : ''}
  class="delivery-option-input"
  name="delivery-option-${matchingItem.id}">
  <div>
  <div class="delivery-option-date">
  ${dateString}
  </div>
  <div class="delivery-option-price">
  ${priceString} - Shipping
  </div>
  </div>
  </div>`
  
  })
  return deliveryHTML;
}


document.querySelector('.order-summary').innerHTML=checkoutHtml
document.querySelectorAll('.js-delete-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        const productId=link.dataset.productId
        removeFromcart(productId)
        renderPaymentsummary()
        document.querySelector(`.js-cart-item-${productId}`).remove()
        })
})
document.querySelectorAll('.delivery-option').forEach((element)=>{
  element.addEventListener("click",()=>{
    const productId=element.dataset.productId;
    const deliveryOptionId=element.dataset.deliveryOptionId
     
    updateDeliveryoption(productId,deliveryOptionId)
    renderOrdersummary()
    renderPaymentsummary()
  })
})
 }
renderOrdersummary()
renderPaymentsummary()