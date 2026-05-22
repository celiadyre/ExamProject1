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

    <button class="buy-button">
      <h2>Log in to buy</h2>
    </button>

    <section class="reviews-section">
      <h2>Reviews</h2>
      ${createReviews(product.reviews)}
    </section>
  </section>
`;
}