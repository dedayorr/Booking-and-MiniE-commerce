// check that the document is done loading before interaction of DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}

function render() {
  // get ADD to cart
  const getAddCartbtn = document.getElementsByClassName("addtocart");
  for (let i = 0; i < getAddCartbtn.length; i++) {
    const btnElement = getAddCartbtn[i];
    // add event listener to each button
    btnElement.addEventListener("click", addToCartClicked);
    // console.log(btnElement)
  }

//   listen for input changed
  const inputChangedListener =
    document.getElementsByClassName("cart-items-qty");
  for (let i = 0; i < inputChangedListener.length; i++) {
    const inputElement = inputChangedListener[i];
    //add event listeer to each btn
    inputElement.addEventListener("change", inputChanged);
  }

  const removeCartItemBtn =
    document.getElementsByClassName("cart-items-remove");
  for (let i = 0; i < removeCartItemBtn.length; i++) {
    const cartItemElement = removeCartItemBtn[i];
    //add event listeer to each btn
    cartItemElement.addEventListener("click", removeCartItem);
  }

  const purchaseItemsBtn =
    document.getElementsByClassName("cart-item-purshase");
  for (let i = 0; i < purchaseItemsBtn.length; i++) {
    const purchaseElement = purchaseItemsBtn[i];
    //add event listeer to each btn
    purchaseElement.addEventListener("click", purchaseItems);
  }
}

function addToCartClicked(e) {
  const collectionItems = e.target.parentElement.parentElement;
  // console.log(collectionItems)
  // get title
  const titleElement =
    collectionItems.getElementsByClassName("collection-title")[0];
  const title = titleElement.textContent;

  // get price
  const priceElement = collectionItems.getElementsByClassName("price")[0];
  const price = parseFloat(priceElement.textContent.replace("₦", ""));
  // const price = priceElement.textContent
//   console.log(price);

  // get image
  const imageElement = collectionItems.getElementsByClassName("image")[0];
  const imageSrc = imageElement.src;
  // console.log(imageSrc)

  addToCart(title, price, imageSrc);
}

function addToCart(title, price, imageSrc) {
  // console.log(title,price,imageSrc);

  // check that item to be added is not in cart
  const cartTitle = document.querySelectorAll(".cart-title");
  // console.log(cartTitle)
  for (let i = 0; i < cartTitle.length; i++) {
    const titleElement = cartTitle[i];
    if (titleElement.textcontent === title) {
      alert("item already in cart");
      return;
    }
  }

  // get the tbody Element
  const cart = document.getElementsByTagName("tbody")[0];
  // console.log(cart)
  const tr = document.createElement("tr");
  tr.classList.add("cart-items");

  const cartItemContent = `<td class=" flex justify-center items-center">
<img
  class="w-[70px] h-[70px]"
  src=${imageSrc}
  alt=""
/>
<div class="cart-title ">${title}</div>
</td>
<td class="cart-items-price text-center">₦${price}</td>
<td class="flex justify-center items-center mb-[40px] gap-[6px]">
<input
  class="cart-items-qty bg-slate-500 w-[5px] pl-[10%]"
  type="number"
  value="1"
/>
<button class="cart-items-remove bg-red-500 rounded w-[90px] hover:bg-red-200">
  REMOVE
</button>
</td>`;

  tr.innerHTML = cartItemContent;
  // //append the tr to the tbody
  cart.appendChild(tr);

  updatedCartTotal()
}

// update cart total
function updatedCartTotal() {
  const cart = document.getElementsByTagName("tbody")[0];
  const cartItems = cart.getElementsByClassName("cart-items");

//   initiate a start sum
let total = 0;
  for (let item of cartItems) {
    // console.log(item);
    const priceElement =
      item.getElementsByClassName("cart-items-price")[0];
    const price = parseFloat(priceElement.textContent.replace("₦", ""));
    const qtyElement = item.getElementsByClassName("cart-items-qty")[0];
    const qty = parseInt(qtyElement.value);

    total = total + price * qty;
  }

  //round to 2 decimal place //Math.round() and toFixed()
const totalPrice = Math.round(total * 100)/100;

//add total to the DOM
document.getElementsByClassName(
    "cart-total"
)[0].textContent = `Total: ${totalPrice}`;

console.log(totalPrice, "total");
}

function inputChanged(e) {
    const input = e.target;
  
    console.log(isNaN(input.value), "isNaN(input.value)");
  
    if (input.value < 1) {
      input.value = 1;
    }
    updatedCartTotal();
  }
  
  function removeCartItem(e) {
    const removeBtn = e.target;
    const decision = confirm("Are you sure about reovng this item?");
    console.log(decision, "decision");
    if (!decision) {
      return;
    }
  
    removeBtn.parentElement.parentElement.remove();
  
    updatedCartTotal();
  }
  
  function purchaseItems() {
    //   console.log(document.getElementsByTagName("tbody")[0].hasChildNodes());
    if (!document.getElementsByTagName("tbody")[0].hasChildNodes) {
      alert("Your cart is empty");
      return;
    }
  
    document.getElementsByTagName("tbody")[0].innerHTML = "";
    updatedCartTotal();
  }
  
