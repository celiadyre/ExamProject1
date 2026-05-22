export function renderLoginPage(container) {
  container.innerHTML = `
    <main class="login-page">
      <a href="#/" class="back-link">← back to home</a>

      <section class="login-box">
        <h2>Log In</h2>

        <form id="login-form">
          <input
            type="email"
            name="email"
            placeholder="E-mail:"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password:"
            required
            minlength="8"
          />

          <button type="submit">Confirm</button>

          <p id="login-message"></p>
        </form>
      </section>

      <p class="register-text">
        Don’t have an account?
        <a href="#/register">Register here</a>
      </p>
    </main>
  `;

  const form = container.querySelector("#login-form");
  const message = container.querySelector("#login-message");

  form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);

  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    // LOGIN
    const loginResponse = await fetch(
      "https://v2.api.noroff.dev/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    const loginResult = await loginResponse.json();

    if (!loginResponse.ok) {
      throw new Error(
        loginResult.errors?.[0]?.message || "Login failed"
      );
    }

    const accessToken = loginResult.data.accessToken;

    // CREATE API KEY
   const apiKeyResponse = await fetch(
  "https://v2.api.noroff.dev/auth/create-api-key",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "online-shop-api-key",
    }),
  }
);

    const apiKeyResult = await apiKeyResponse.json();

    if (!apiKeyResponse.ok) {
      throw new Error(
        apiKeyResult.errors?.[0]?.message ||
        "API key creation failed"
      );
    }

    const apiKey = apiKeyResult.data.key;

    // SAVE AUTH
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem(
      "user",
      JSON.stringify(loginResult.data)
    );

    message.textContent = "Login successful!";

    window.location.hash = "#/";
  } catch (error) {
    message.textContent = error.message;
  }
});
}