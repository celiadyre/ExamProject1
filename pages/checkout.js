function formatPrice(price) {
  return `$${Number(price).toFixed(2)}`;
}

function getCartTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return cart.reduce((sum, item) => {
    const price = Number(item.discountedPrice ?? item.price ?? 0);
    const quantity = Number(item.quantity || 1);

    return sum + price * quantity;
  }, 0);
}

export function renderCheckoutPage(container) {
  const total = getCartTotal();

  container.innerHTML = `
    <section class="checkout-page">
      <a href="#/cart" class="back-link">← back to cart</a>

      <form id="checkout-form">
        <h2>Shipping details</h2>

        <input type="text" name="fullName" placeholder="Full name" required />
        <input type="text" name="address" placeholder="Address" required />

        <div class="checkout-row">
          <input type="text" name="postcode" placeholder="Postcode" required />
          <input type="text" name="city" placeholder="City" required />
          <input type="text" name="country" placeholder="Country" required />
        </div>

        <h2>Payment details</h2>

        <div class="payment-options">
  <div class="radio-option">
    <input type="radio" name="payment" value="card" checked />
    <p>Visa/Mastercard</p>
  </div>

  <div class="radio-option">
    <input type="radio" name="payment" value="invoice" />
    <p>Invoice</p>
  </div>
</div>

<div id="payment-fields"></div>

        <button type="submit" class="checkout-submit-button">
          <span><h2>Complete purchase</h2></span>
          <strong>${formatPrice(total)}</strong>
        </button>
      </form>
    </section>
  `;

  const form = container.querySelector("#checkout-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    localStorage.removeItem("cart");
    window.location.hash = "#/success";
  });

  const paymentFields = container.querySelector("#payment-fields");
const paymentRadios = container.querySelectorAll('input[name="payment"]');

function renderPaymentFields(paymentType) {
  if (paymentType === "invoice") {
    paymentFields.innerHTML = `
      <input type="email" name="invoiceEmail" placeholder="Invoice e-mail" required />
      <p class="invoice-info">
        Invoice with payment details will be sent to your e-mail
      </p>
    `;
  } else {
    paymentFields.innerHTML = `
      <input type="text" name="cardholder" placeholder="Cardholder’s name" required />
      <input type="text" name="cardNumber" placeholder="Card number" required />

      <div class="checkout-row two-columns">
        <input type="text" name="expiry" placeholder="Expiry date" required />
        <input type="text" name="securityCode" placeholder="Security code" required />
      </div>
    `;
  }
}

renderPaymentFields("card");

paymentRadios.forEach(radio => {
  radio.addEventListener("change", () => {
    renderPaymentFields(radio.value);
  });
});
}