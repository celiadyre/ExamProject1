export function renderRegisterPage(container) {
  container.innerHTML = `
    <main class="login-page">
      <a href="#/" class="back-link">← back to home</a>

      <section class="login-box">
        <h2>Register</h2>

        <form id="login-form">
          <input type="text" name="name" placeholder="First name:" required />

          <input type="email" name="email" placeholder="E-mail:" required />

          <input
            type="password"
            name="password"
            placeholder="Password:"
            required
            minlength="8"
          />

          <button type="submit">Create Account</button>

          <p id="login-message"></p>
        </form>
      </section>

      <p class="register-text">
        Already have an account?
        <a href="#/login">Log in here</a>
      </p>
    </main>
  `;

  const form = container.querySelector("#login-form");
  const message = container.querySelector("#login-message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const user = {
  name: formData.get("name"),
  email: formData.get("email"),
  password: formData.get("password"),
};

    try {
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.errors?.[0]?.message || "Registration failed");
      }

      message.textContent = "Registration successful! Redirecting to login...";

      setTimeout(() => {
        window.location.hash = "#/login";
      }, 1000);
    } catch (error) {
      message.textContent = error.message;
    }
  });
}