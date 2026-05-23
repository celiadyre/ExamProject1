function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

function createStars(rating) {
  const fullStars = Math.round(rating);

  return Array.from({ length: 5 }, (_, index) =>
    index < fullStars ? "★" : "☆"
  ).join("");
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function renderCartPage(container) {
  const cart = getCart();

  if (!cart.length) {
    container.innerHTML = `
      <section class="cart-page">
        <a href="#/" class="back-link">← back to home</a>
        <h2>Your cart is empty</h2>
      </section>
    `;
    return;
  }

  const total = cart.reduce((sum, item) => {
  const price = Number(item.discountedPrice ?? item.price ?? 0);
  const quantity = Number(item.quantity || 1);

  return sum + price * quantity;
}, 0);

  container.innerHTML = `
    <section class="cart-page">
      <div class="cart-top">
        <a href="#/" class="back-link">← back to home</a>
        <button class="clear-cart-button" type="button">clear all</button>
      </div>

      <div class="cart-items">
        ${cart.map((product, index) => `
          <article class="cart-item">
            <img
              class="cart-item-image"
              src="${product.image.url}"
              alt="${product.image.alt || product.title}"
            />

            <div class="cart-item-details">
              <h2>${product.title}</h2>

              <div class="cart-rating-row">
                <span class="stars">${createStars(product.rating || 0)}</span>
                <h4><span>${product.reviews?.length || 0} reviews</span></h4>
              </div>

              <p class="cart-tags">
                ${(product.tags || []).join(", ")}
              </p>

              <div class="cart-actions">
                <input
                  class="cart-quantity"
                  type="number"
                  min="1"
                  value="${product.quantity || 1}"
                  data-index="${index}"
                />

                <button
  class="remove-cart-item"
  type="button"
  data-index="${index}"
  aria-label="Remove item"
>
  <img
    src="public/img/trash-icon.png"
    alt="Remove item"
    class="trash-icon"
  />
</button>
              </div>
            </div>

            <h2 class="cart-item-price">
              ${formatPrice(product.discountedPrice ?? product.price)}
            </h2>
          </article>
        `).join("")}
      </div>

      <h2 class="cart-total">
        <a href="#/checkout" class="checkout-button">
          <span>Go to checkout</span>
          <strong>${formatPrice(total)}</strong>
        </a>
      </h2>
    </section>
  `;

  const clearButton = container.querySelector(".clear-cart-button");

  clearButton.addEventListener("click", () => {
    localStorage.removeItem("cart");
    renderCartPage(container);
  });

  container.querySelectorAll(".remove-cart-item").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);
      const updatedCart = getCart();

      updatedCart.splice(index, 1);
      saveCart(updatedCart);

      renderCartPage(container);
    });
  });

  container.querySelectorAll(".cart-quantity").forEach(input => {
  input.addEventListener("change", () => {
    const index = Number(input.dataset.index);

    const updatedCart = getCart();

    updatedCart[index].quantity = Number(input.value);

    saveCart(updatedCart);

    renderCartPage(container);
  });
});
}

