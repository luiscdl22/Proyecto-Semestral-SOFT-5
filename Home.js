/**
 * Home.js - La Esquina Geek
 * Controla el carrusel, menú hamburguesa y búsqueda
 */

// ========================================
// CARRUSEL (NO TOCAR)
// ========================================
const Carousel = (() => {
  const elements = {
    slides: document.querySelectorAll(".carousel-slide"),
    indicators: document.querySelectorAll(".indicator"),
    nextBtn: document.querySelector(".carousel-btn.next"),
    prevBtn: document.querySelector(".carousel-btn.prev"),
  };

  let currentSlide = 0;
  let autoplayInterval = null;
  const AUTOPLAY_DELAY = 5000;

  const normalizeIndex = (index) => {
    const totalSlides = elements.slides.length;
    if (index >= totalSlides) return 0;
    if (index < 0) return totalSlides - 1;
    return index;
  };

  const updateActiveClasses = () => {
    elements.slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlide);
    });
    elements.indicators.forEach((indicator, i) => {
      indicator.classList.toggle("active", i === currentSlide);
    });
  };

  const showSlide = (index) => {
    currentSlide = normalizeIndex(index);
    updateActiveClasses();
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  const startAutoplay = () => {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY);
  };

  const init = () => {
    if (elements.slides.length === 0) return;

    if (elements.nextBtn) {
      elements.nextBtn.addEventListener("click", nextSlide);
    }
    if (elements.prevBtn) {
      elements.prevBtn.addEventListener("click", prevSlide);
    }

    elements.indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => showSlide(index));
    });

    startAutoplay();
  };

  return { init };
})();

// ========================================
// MENÚ HAMBURGUESA
// ========================================
const SidebarMenu = (() => {
  const elements = {
    hamburger: document.getElementById("hamburger-menu"),
    sidebar: document.getElementById("sidebar-menu"),
    overlay: document.getElementById("sidebar-overlay"),
    closeBtn: document.getElementById("sidebar-close"),
  };

  // Abre el menú
  const open = () => {
    if (!elements.sidebar || !elements.overlay) return;
    elements.sidebar.classList.add("active");
    elements.overlay.classList.add("active");
    document.body.classList.add("sidebar-open");
  };

  // Cierra el menú
  const close = () => {
    if (!elements.sidebar || !elements.overlay) return;
    elements.sidebar.classList.remove("active");
    elements.overlay.classList.remove("active");
    document.body.classList.remove("sidebar-open");
  };

  // Alterna entre abrir y cerrar
  const toggle = () => {
    if (elements.sidebar?.classList.contains("active")) {
      close();
    } else {
      open();
    }
  };

  // Cierra con la tecla ESC
  const handleKeydown = (e) => {
    if (e.key === "Escape" && elements.sidebar?.classList.contains("active")) {
      close();
    }
  };

  // Inicia todo
  const init = () => {
    if (!elements.hamburger || !elements.sidebar) {
      console.warn("SidebarMenu: Elementos no encontrados");
      return;
    }

    elements.hamburger.addEventListener("click", toggle);

    if (elements.closeBtn) {
      elements.closeBtn.addEventListener("click", close);
    }

    if (elements.overlay) {
      elements.overlay.addEventListener("click", close);
    }

    document.addEventListener("keydown", handleKeydown);

    elements.sidebar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", close);
    });
  };

  return { init, open, close };
})();

// ========================================
// BÚSQUEDA
// ========================================
const SearchHandler = (() => {
  const init = () => {
    const searchForms = document.querySelectorAll(".search-bar");

    searchForms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="search"]');
        const searchTerm = input?.value.trim();

        if (searchTerm) {
          window.location.href = `productos.html?search=${encodeURIComponent(searchTerm)}`;
        }
      });
    });
  };

  return { init };
})();

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  Carousel.init();
  SidebarMenu.init();
  SearchHandler.init();
});