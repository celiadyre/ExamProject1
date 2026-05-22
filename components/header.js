export default function Header() {
  return /*HTML*/ `
  <button class="hamburger" id="hamburger" aria-label="Open menu">
      <img
            src="public/img/hamburger-icon.png"
            alt="Hamburger Icon"
            id="hamburger-icon"
          />
    </button>
  <div id="logo">
        <a href="index.html" id="logo-link">
          <img
            src="public/img/logo.png"
            alt="Petrichor Logo"
            id="logo-image"
          />
        </a>
      </div>

      <nav id="right-nav">
        <ul id="nav-list">
          <li>
          <a href="#/login">
            <img
              src="public/img/person-icon.png"
              alt="User Icon"
              class="icon"
            />
          </a>
          </li>
           <li>
            <img
              src="public/img/cart-icon.png"
              alt="Cart Icon"
              class="icon"
            />
          </li>
        </ul>
      </nav>
      <div id="menu-overlay" class="menu-overlay">
  <div class="menu-content">
    <h3>All products</h3>

      <ul class="menu-categories">
  <li><p><a href="index.html?category=beauty">Beauty</a></p></li>
  <li><p><a href="index.html?category=fashion">Fashion</a></p></li>
  <li><p><a href="index.html?category=audio">Audio</a></p></li>
  <li><p><a href="index.html?category=electronics">Electronics</a></p></li>
</ul>

    <h2>Best sellers</h2>

    <div class="best-sellers" id="best-sellers"></div>
    

    <p> <a href="#/login" class="login-link">Log in</a></p>
  </div>
</div>
  `;
}