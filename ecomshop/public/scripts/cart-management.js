//dealing with the frontend of the cart that's showing amount of items in cart
const addToCartButtonElement = document.querySelector(
  "#product-details button"
);

const cartBadgeElement = document.querySelector(".nav-items .badge");

async function addToCart() {
  //getting productid from the frontend button
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    alert("Something went wrong!");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong");
    return;
  }

  //extracting data from the json data
  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;

  cartBadgeElement.textContent = newTotalQuantity;
}

addToCartButtonElement.addEventListener("click", addToCart);
