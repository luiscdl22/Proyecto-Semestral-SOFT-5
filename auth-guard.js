// Protección de rutas - Verificar si el usuario está logueado
(function () {
  "use strict";

  function checkAuth() {
    const token = localStorage.getItem("token");
    const currentPage = window.location.pathname;

    // Si no hay token y está en páginas protegidas, redirigir a login
    if (
      !token &&
      (currentPage.includes("productos.html") ||
        currentPage.includes("carrito.html"))
    ) {
      alert("⚠️ Debes iniciar sesión para acceder a esta página");
      window.location.href = "auth.html";
    }
  }

  // Ejecutar al cargar la página
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", checkAuth)
    : checkAuth();
})();
