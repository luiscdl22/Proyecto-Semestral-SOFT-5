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

  // Funciones de login y registro deshabilitadas (sin conexión a API)
  function handleLogin(e) {
    e.preventDefault();
    alert("Funcionalidad de login deshabilitada. Implementar en C#");
  }

  function handleRegister(e) {
    e.preventDefault();
    alert("Funcionalidad de registro deshabilitada. Implementar en C#");
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
