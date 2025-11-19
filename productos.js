/**
 * Script de Productos
 * Maneja filtros, búsqueda y renderizado de productos
 */

(function () {
  "use strict";

  // Datos de ejemplo 
  const PRODUCTS = [
    {
      id: 1,
      name: "Charizard VMAX",
      category: "cartas",
      price: 120.0,
      image: "img/productos/charizard.png",
    },
    {
      id: 2,
      name: "Gundam Astray Red Frame",
      category: "figuras",
      price: 75.5,
      image: "img/productos/gundam-astray.jpg",
    },
    {
      id: 3,
      name: "Black Lotus Alpha",
      category: "cartas",
      price: 511100.0,
      image: "img/productos/black-lotus.jpg",
    },
    {
      id: 4,
      name: "Blue-Eyes White Dragon",
      category: "cartas",
      price: 85.99,
      image: "img/productos/blue-eyes.jpg",
    },
    {
      id: 5,
      name: "Mewtwo GX Shiny",
      category: "cartas",
      price: 350.0,
      image: "img/productos/mewtwo.jpg",
    },
    {
      id: 6,
      name: "Hot Toys Iron Man Mark 85",
      category: "figuras",
      price: 425.0,
      image: "img/productos/iron-man-hot-toys.jpg",
    },
    {
      id: 7,
      name: "Funko Pop Batman Exclusivo",
      category: "funko",
      price: 25.0,
      image: "img/productos/funko-batman.jpg",
    },
    {
      id: 8,
      name: "Gear 5 Luffy Figure",
      category: "figuras",
      price: 89.0,
      image: "img/productos/one-piece-luffy.jpg",
    },
    {
      id: 9,
      name: "Spider-Man Premium Statue",
      category: "figuras",
      price: 599.0,
      image: "img/productos/spiderman-statue.jpg",
    },
    {
      id: 10,
      name: "Marvel Legends X-Men Set",
      category: "figuras",
      price: 149.0,
      image: "img/productos/marvel-legends.jpg",
    },
  ];

  // Estado de filtros
  let currentFilters = {
    categories: ["cartas"],
    priceMin: 0,
    priceMax: 500,
    sort: "relevance",
    search: "",
  };

  // Elementos del DOM
  const productsGrid = document.getElementById("products-grid");
  const noResults = document.getElementById("no-results");
  const productCount = document.getElementById("product-count");
  const priceMinInput = document.getElementById("price-min");
  const priceMaxInput = document.getElementById("price-max");
  const priceMinValue = document.getElementById("price-min-value");
  const priceMaxValue = document.getElementById("price-max-value");
  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const clearFiltersBtn = document.getElementById("clear-filters");
  const resetFiltersBtn = document.getElementById("reset-filters");

  /**
   * Renderiza un producto individual
   */
  function renderProduct(product) {
    return `
      <article class="product-card" data-product-id="${product.id}">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
          <p class="product-category">${getCategoryLabel(product.category)}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="btn-add-to-cart" data-product-id="${product.id}">
            Agregar al Carrito
          </button>
        </div>
      </article>
    `;
  }

  /**
   * Obtiene el label de categoría
   */
  function getCategoryLabel(category) {
    const labels = {
      cartas: "Cartas Coleccionables",
      figuras: "Figuras de Acción",
      comics: "Cómics",
      funko: "Funko Pop",
    };
    return labels[category] || category;
  }

  /**
   * Filtra productos según los criterios actuales
   */
  function filterProducts() {
    return PRODUCTS.filter((product) => {
      // Filtro de categoría
      if (!currentFilters.categories.includes(product.category)) {
        return false;
      }

      // Filtro de precio
      if (
        product.price < currentFilters.priceMin ||
        product.price > currentFilters.priceMax
      ) {
        return false;
      }

      // Filtro de búsqueda
      if (currentFilters.search) {
        const searchTerm = currentFilters.search.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(searchTerm);
        const categoryMatch = product.category
          .toLowerCase()
          .includes(searchTerm);
        if (!nameMatch && !categoryMatch) {
          return false;
        }
      }

      return true;
    });
  }

  /**
   * Ordena productos según el criterio seleccionado
   */
  function sortProducts(products) {
    const sorted = [...products];

    switch (currentFilters.sort) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "name":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "relevance":
      default:
        return sorted;
    }
  }

  /**
   * Renderiza todos los productos
   */
  function renderProducts() {
    let filtered = filterProducts();
    let sorted = sortProducts(filtered);

    if (!productsGrid) return;

    if (sorted.length === 0) {
      productsGrid.style.display = "none";
      if (noResults) noResults.style.display = "flex";
      if (productCount) productCount.textContent = "0";
    } else {
      productsGrid.style.display = "grid";
      if (noResults) noResults.style.display = "none";
      if (productCount) productCount.textContent = sorted.length;
      productsGrid.innerHTML = sorted.map(renderProduct).join("");
    }
  }

  /**
   * Actualiza los filtros de categoría
   */
  function updateCategoryFilters() {
    const checkboxes = document.querySelectorAll(
      'input[name="category"]:checked'
    );
    currentFilters.categories = Array.from(checkboxes).map((cb) => cb.value);
    renderProducts();
  }

  /**
   * Actualiza el filtro de precio
   */
  function updatePriceFilter() {
    const min = parseInt(priceMinInput.value);
    const max = parseInt(priceMaxInput.value);

    // Asegurar que min <= max
    if (min > max) {
      priceMinInput.value = max;
      currentFilters.priceMin = max;
    } else {
      currentFilters.priceMin = min;
    }

    if (max < min) {
      priceMaxInput.value = min;
      currentFilters.priceMax = min;
    } else {
      currentFilters.priceMax = max;
    }

    // Actualizar valores mostrados
    if (priceMinValue) priceMinValue.textContent = currentFilters.priceMin;
    if (priceMaxValue) priceMaxValue.textContent = currentFilters.priceMax;

    renderProducts();
  }

  /**
   * Actualiza el filtro de orden
   */
  function updateSortFilter() {
    const selected = document.querySelector('input[name="sort"]:checked');
    if (selected) {
      currentFilters.sort = selected.value;
      renderProducts();
    }
  }

  /**
   * Maneja la búsqueda
   */
  function handleSearch(e) {
    e.preventDefault();
    currentFilters.search = searchInput.value.trim();
    renderProducts();
  }

  /**
   * Limpia todos los filtros (desmarca todo)
   */
  function clearFilters() {
    // Desmarcar TODAS las categorías
    document.querySelectorAll('input[name="category"]').forEach((cb) => {
      cb.checked = false;
    });

    // Resetear precio al rango máximo
    priceMinInput.value = 0;
    priceMaxInput.value = 500;

    // Resetear orden
    document.querySelector(
      'input[name="sort"][value="relevance"]'
    ).checked = true;

    // Resetear búsqueda
    if (searchInput) searchInput.value = "";

    // Resetear estado SIN categorías (todo limpio)
    currentFilters = {
      categories: [],
      priceMin: 0,
      priceMax: 500,
      sort: "relevance",
      search: "",
    };

    updatePriceFilter();
    renderProducts();
  }

  /**
   * Maneja clic en "Agregar al Carrito"
   */
  function handleAddToCart(e) {
    if (e.target.classList.contains("btn-add-to-cart")) {
      const productId = parseInt(e.target.dataset.productId);
      const product = PRODUCTS.find((p) => p.id === productId);

      if (product) {
        alert(`"${product.name}" agregado al carrito!`);
        // TODO: Implementar guardado en localStorage para el carrito
      }
    }
  }

  /**
   * Inicializa event listeners
   */
  function initEventListeners() {
    // Categorías
    document.querySelectorAll('input[name="category"]').forEach((cb) => {
      cb.addEventListener("change", updateCategoryFilters);
    });

    // Precio
    if (priceMinInput)
      priceMinInput.addEventListener("input", updatePriceFilter);
    if (priceMaxInput)
      priceMaxInput.addEventListener("input", updatePriceFilter);

    // Orden
    document.querySelectorAll('input[name="sort"]').forEach((radio) => {
      radio.addEventListener("change", updateSortFilter);
    });

    // Búsqueda
    if (searchForm) searchForm.addEventListener("submit", handleSearch);

    // Botones de limpiar
    if (clearFiltersBtn)
      clearFiltersBtn.addEventListener("click", clearFilters);
    if (resetFiltersBtn)
      resetFiltersBtn.addEventListener("click", clearFilters);

    // Agregar al carrito
    if (productsGrid) productsGrid.addEventListener("click", handleAddToCart);
  }

  /**
   * Inicializa la página
   */
  function init() {
    initEventListeners();
    updatePriceFilter();
    renderProducts();
  }

  // Iniciar cuando el DOM esté listo
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
