//manages the items that are already inside the cart

const cartItemUpdateFormElements = document.querySelectorAll(
  ".cart-item-management"
);
const cartTotalPriceElement = document.getElementById("cart-total-price");
const cartBadge = document.querySelector(".nav-items .badge");

//function that runs when the submit action ocurrs
async function updateCartItem(e) {
  e.preventDefault();

  //get access to the form
  const form = e.target;

  const productId = form.dataset.productId;
  const csrfToken = form.dataset.csrf;
  //access the quantity in the input field
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("something has gone wrong");
    return;
  }

  if (!response.ok) {
    alert("something has gone wrong");
    return;
  }

  const responseData = await response.json();

  //updating number of cart items
  const cartItemTotalPriceElement =
    form.parentElement.querySelector(".cart-item-price");

  //updating total price of individual product
  cartItemTotalPriceElement.textContent =
    responseData.updatedCartData.updatedItemPrice.toFixed(2);

  //updating total price
  cartTotalPriceElement.textContent =
    responseData.updatedCartData.newTotalPrice.toFixed(2);

  //updating the nav(cartbadge)
  cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
