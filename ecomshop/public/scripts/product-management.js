//?Deleting product fro the admin Dashboard
//delete product

const deleteProductButtons = document.querySelectorAll(".product-item button");

//function that gets the delete button clicked and sends to the backend
async function deleteProduct(e) {
  const buttonElement = e.target;
  const productId = buttonElement.dataset.productId;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "delete",
    }
  );

  if (!response.ok) {
    alert("Something is wrong can't delete product");
    return;
  }

  //updating the dome(removing product from the dom)
  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteProductButton of deleteProductButtons) {
  deleteProductButton.addEventListener("click", deleteProduct);
}
