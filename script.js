// Carrusel automático
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
const totalSlides = slides.length;
let autoplayInterval;

function showSlide(index) {
  // Asegurar que el índice esté en el rango correcto
  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  // Remover clase active de todos
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  // Agregar clase active al slide e indicador actual
  slides[currentSlide].classList.add("active");
  indicators[currentSlide].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

// Autoplay cada 7 segundos
function startAutoplay() {
  // Limpiar cualquier intervalo existente antes de crear uno nuevo
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
  autoplayInterval = setInterval(nextSlide, 7000);
}

function stopAutoplay() {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
}

function resetAutoplay() {
  stopAutoplay();
  startAutoplay();
}

// Event listeners para los botones
document.querySelector(".carousel-btn.next").addEventListener("click", () => {
  nextSlide();
  resetAutoplay();
});

document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
  prevSlide();
  resetAutoplay();
});

// Event listeners para los indicadores
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    showSlide(index);
    resetAutoplay();
  });
});

// Pausar autoplay cuando el mouse está sobre el carrusel
const carousel = document.querySelector(".hero-carousel");
carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

// Iniciar autoplay al cargar la página
startAutoplay();

// Modal de cuenta
const accountModal = document.getElementById("account-modal");
const btnAccount = document.getElementById("btn-account");
const modalClose = document.getElementById("modal-close");
const modalOverlay = document.getElementById("modal-overlay");

// Abrir modal
btnAccount.addEventListener("click", (e) => {
  e.preventDefault();
  accountModal.classList.add("active");
  document.body.style.overflow = "hidden";
});

// Cerrar modal
function closeModal() {
  accountModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

// Cerrar con tecla ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && accountModal.classList.contains("active")) {
    closeModal();
  }
});

// El header permanece estático - sin efecto de scroll
