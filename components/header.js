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
            <img
              src="public/img/person-icon.png"
              alt="User Icon"
              class="icon"
            />
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
  `;
}