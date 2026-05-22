const API_URL = "data/products.json";

async function getProducts() {
  const response = await fetch(API_URL);
  const result = await response.json();
  return result.data;
}

function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

function getDisplayPrice(product) {
  return product.discountedPrice ?? product.price;
}

function createStars(rating) {
  const fullStars = Math.round(rating);

  return Array.from({ length: 5 }, (_, index) => {
    return index < fullStars ? "★" : "☆";
  }).join("");
}

function createReviews(reviews) {
  if (!reviews.length) {
    return `<p class="no-reviews">No reviews yet.</p>`;
  }

  return reviews.map(review => `
    <article class="review-card">
      <h2>${review.username}</h2>
      <h2>${review.description}</h2>
    </article>
  `).join("");
}

export async function renderProductPage(container, id) {
  const products = await getProducts();
  const product = products.find(product => product.id === id);

  if (!product) {
    container.innerHTML = `<p class="error">Product not found.</p>`;
    return;
  }

  container.innerHTML = `
  <section class="product-page">
    <a href="#/" class="back-link">← back to home</a>

    <div class="product-layout">
      <div class="product-image-large">
        <img src="${product.image.url}" alt="${product.image.alt || product.title}" />

        <button class="share-button" aria-label="Share product">
          <img src="public/img/share-icon.png" alt="Share" />
        </button>
      </div>

      <div class="product-details">
        <div class="product-heading">
          <h3>${product.title}</h3>
          <p>${formatPrice(getDisplayPrice(product))}</p>
        </div>

        <p class="product-description">${product.description}</p>

        <div class="product-meta">
          <div class="rating-row">
            <span class="stars">${createStars(product.rating)}</span>
            <span>${product.reviews.length} reviews</span>
          </div>

          <div class="product-tags">
            ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>
      </div>
    </div>

   ${localStorage.getItem("accessToken")
  ? `<button type="button" class="buy-button" id="add-to-cart-button">
      Add to cart
    </button>`
  : `<a href="#/login" class="buy-button">
      Log in to buy
    </a>`
}

    <section class="reviews-section">
      <h2>Reviews</h2>
      ${createReviews(product.reviews)}
    </section>
  </section>
`;

const addToCartButton = container.querySelector("#add-to-cart-button");

if (addToCartButton) {
  addToCartButton.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
  });
}

const shareButton = container.querySelector(".share-button");

shareButton.addEventListener("click", async () => {
  // URL with query/hash
  const url = `${window.location.origin}${window.location.pathname}#/product/${id}`;

  // Clipboard API
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(url);
      alert("Link copied!");
      return;
    } catch (err) {
      console.error("Clipboard API failed", err);
    }
  }

  // Fallback
  const textarea = document.createElement("textarea");
  textarea.value = url;

  // Prevent scrolling
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    alert("Link copied!");
  } catch (err) {
    console.error("Fallback copy failed", err);
  }

  document.body.removeChild(textarea);
});
}