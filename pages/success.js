function generateOrderNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function renderSuccessPage(container) {
  const orderNumber = generateOrderNumber();

  container.innerHTML = `
    <section class="success-page">
      <a href="#/" class="back-link">← back to home</a>

      <div class="success-content">
        <img
          src="public/img/success-icon.png"
          alt="Success"
          class="success-icon"
        />

        <h1>Your order is received!</h1>

        <h2>Order #${orderNumber}</h2>
      </div>
    </section>
  `;
}