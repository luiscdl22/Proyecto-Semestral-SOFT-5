(function () {
  "use strict";

  const container = document.getElementById("auth-container");
  const registerBtn = document.getElementById("register-btn");
  const loginBtn = document.getElementById("login-btn");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  function showRegister() {
    container?.classList.add("active");
  }

  function showLogin() {
    container?.classList.remove("active");
  }

  // LOGIN ---------------------------------------------------------
  async function handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("❌ " + data.error);
        return;
      }

      alert("✅ Login correcto");

      // Guardar token para las demás rutas
      localStorage.setItem("token", data.token);

      // Redirigir
      window.location.href = "Home.html";
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error conectando con la API");
    }
  }

  // REGISTER -------------------------------------------------------
  async function handleRegister(e) {
    e.preventDefault();
    console.log("🔵 Formulario de registro enviado");

    const formData = new FormData(registerForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("📝 Datos capturados:", { name, email, password: "***" });

    try {
      console.log("🌐 Enviando petición a la API...");
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      console.log("📦 Respuesta del servidor:", data);

      if (!res.ok) {
        alert("❌ Error: " + data.error);
        return;
      }

      alert("✅ Registro exitoso! Ahora puedes iniciar sesión.");
      registerForm.reset();
      setTimeout(() => showLogin(), 1000);
    } catch (error) {
      console.error("❌ Error en la petición:", error);
      alert(
        "❌ Error conectando con la API. Verifica que el servidor esté activo."
      );
    }
  }

  function init() {
    registerBtn?.addEventListener("click", showRegister);
    loginBtn?.addEventListener("click", showLogin);
    loginForm?.addEventListener("submit", handleLogin);
    registerForm?.addEventListener("submit", handleRegister);
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
