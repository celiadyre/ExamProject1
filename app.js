import Header from "./components/header.js";
import Footer from "./components/footer.js";
import { renderProductPage } from "./pages/product.js";
import { renderLoginPage } from "./pages/login.js";
import { renderRegisterPage } from "./pages/register.js";

document.querySelector("header").innerHTML = Header();
const hamburger = document.querySelector("#hamburger");
const menuOverlay = document.querySelector("#menu-overlay");

if (hamburger && menuOverlay) {
  hamburger.addEventListener("click", () => {
    menuOverlay.classList.toggle("active");
  });
}
document.querySelector("footer").innerHTML = Footer();

const app = document.querySelector(".app");

function router() {
  const hash = window.location.hash;

  if (hash.startsWith("#/product/")) {
    const id = hash.replace("#/product/", "");

    document.querySelector("main").style.display = "none";

    let page = document.querySelector("#dynamic-page");

    if (!page) {
      page = document.createElement("div");
      page.id = "dynamic-page";
      app.insertBefore(page, document.querySelector("footer"));
    }

    renderProductPage(page, id);

  } else if (hash === "#/login") {
    document.querySelector("main").style.display = "none";

    let page = document.querySelector("#dynamic-page");

    if (!page) {
      page = document.createElement("div");
      page.id = "dynamic-page";
      app.insertBefore(page, document.querySelector("footer"));
    }

    renderLoginPage(page);

    } else if (hash === "#/register") {
  document.querySelector("main").style.display = "none";

  let page = document.querySelector("#dynamic-page");

  if (!page) {
    page = document.createElement("div");
    page.id = "dynamic-page";
    app.insertBefore(page, document.querySelector("footer"));
  }

  renderRegisterPage(page);

  } else {
    document.querySelector("main").style.display = "block";

    const page = document.querySelector("#dynamic-page");
    if (page) page.remove();
  }
}



window.addEventListener("hashchange", router);
router();

async function renderBestSellersMenu() {
  const bestSellersContainer = document.querySelector("#best-sellers");

  if (!bestSellersContainer) {
    console.error("#best-sellers was not found in the HTML");
    return;
  }

  const response = await fetch("data/products.json");
  const result = await response.json();

  const bestSellers = result.data
    .filter(product => product.rating >= 5)
    .slice(0, 3);

  bestSellersContainer.innerHTML = bestSellers.map(product => `
    <a href="#/product/${product.id}" class="menu-product">
      <div class="product-image">
        <img src="${product.image.url}" alt="${product.image.alt || product.title}" />
      </div>

      <div class="product-info">
        <p class="product-title">${product.title}</p>
        <p class="product-price">$${Number(product.discountedPrice ?? product.price).toFixed(2)}</p>
      </div>
    </a>
  `).join("");
}

renderBestSellersMenu();

