// check that the document is done loading before interaction of DOM
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}

function render() {
  const removeButton = document.getElementsByClassName("remove-button");
  for (let i = 0; i < removeButton.length; i++) {
    const button = removeButton[i];
    button.addEventListener("click", removeCartItem);
  }

  const qtyInputs = document.getElementsByClassName("item-qty");
  for (let i = 0; i < qtyInputs.length; i++) {
    const input = qtyInputs[i];
    input.addEventListener("change", qauntityChanged);
  }

  const addtocart = document.getElementsByClassName("addtocart");
  for (let i = 0; i < addtocart.length; i++) {
    const addTo = addtocart[i];
    addTo.addEventListener("click", addItemToCart);
  }

  document
    .getElementsByClassName("purchase-button")[0]
    .addEventListener("click", purchaseItems);
}

function qauntityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

// To remove the items from cart
function removeCartItem(e) {
  const clickedButton = e.target.parentElement.parentElement.remove();
  updateCartTotal();
}

// To add the items to cart
function addItemToCart(event) {
  const button = event.target;
  const shopItem = button.parentElement.parentElement;
  const title =
    shopItem.getElementsByClassName("collection-title")[0].innerText;
  const price = shopItem.getElementsByClassName("price")[0].innerText;
  const imageSrc = shopItem.getElementsByClassName("image")[0].src;
  addedItemsToCart(title, price, imageSrc);
}

function addedItemsToCart(title, price, imageSrc) {
  const cartRow = document.createElement("tr");
  cartRow.className = "cart-items";

  const cartItems = document.getElementsByClassName("cart-table")[0];
  const cartItemName = cartItems.getElementsByClassName("cart-title");
  for (let i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerText == title) {
      alert("Item is already added to the cart");
      return;
    }
  }
  const cartRowContents = ` <td class="flex justify-center items-center">
  <img class="w-[70px] h-[70px]" src="${imageSrc}" alt="" />
  <div class="cart-title">${title}</div>
</td>
<td class="cart-items-price text-center">${price}</td>
<td class="flex justify-center items-center mb-[40px] gap-[6px]">
  <input class="item-qty w-[50px] border" type="number" value="1" id="number-input">
  <button
    class="remove-button bg-red-500 rounded w-[90px] hover:bg-red-200"
  >
    REMOVE
  </button>
</td>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.appendChild(cartRow);

  cartRow
    .getElementsByClassName("remove-button")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("item-qty")[0]
    .addEventListener("change", qauntityChanged);
  updateCartTotal();
  console.log("updateCartTotal");
}

// To update the total price of items
const updateCartTotal = () => {
  const cartTable = document.getElementsByClassName("cart-table")[0];
  console.log(cartTable);
  const cartRows = cartTable.querySelectorAll(".cart-items");
  console.log(cartRows, "show");

  // const rest = cartRows && cartRows.map((element)=> ({
  //   price:parseFloat(element.getElementsByClassName("cart-items-price")[0].textContent),
  //   qty:Number(element.getElementsByClassName("item-qty")[0].value)
  // }))

  for (let i = 0; i < cartRows.length; i++) {
    let total = 0;
    console.log(total);
    const cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName("cart-items-price")[0];
    console.log(priceElement);
    const quantityElement = cartRow.getElementsByClassName("item-qty")[0];
    console.log(quantityElement);
    let price;
    if (priceElement) {
      price = parseFloat(priceElement.textContent.replace("₦", ""));
    }
    let quantity;
    if (quantityElement) {
      quantity = parseInt(quantityElement.value);
    }
    //
    console.log(typeof price);
    console.log(typeof quantity);

    // console.log(quantity, "here");
    // console.log(total + price * quantity, "price");
    console.log(total, price, quantity);
    total = Number(total) + Number(price) * Number(quantity);
    console.log(total);
    finalTotal(total);
  }

  function finalTotal(total) {
    console.log(total, "here");
    grandtotal = Math.round(total * 100) / 100;
    console.log(grandtotal);
    const Total = (document.getElementsByClassName(
      "cart-total"
    )[0].textContent = `Total: ₦${grandtotal}`);
    console.log(grandtotal, "show");
  }
};

function purchaseItems() {
  alert("Thank you for your purchase");
  const cartitems = document.getElementsByClassName("cart-table")[0];
  while (cartitems.hasChildNodes()) {
    // cartitems.removeChild(cartitems.firstchild)
    document.getElementsByClassName("cart-table")[0].innerHTML = "";
  }
}
