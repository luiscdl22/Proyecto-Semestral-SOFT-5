// productos.js limpio: solo muestra todos los productos en el grid
// Puedes agregar lógica de filtros, carrito, etc. aquí si lo deseas
document.addEventListener("DOMContentLoaded", function () {
  const PRODUCTS = [
    {
      id: 1,
      name: "Charizard VMAX",
      price: 120.0,
      image: "img/productos/charizard.png",
    },
    {
      id: 2,
      name: "Gundam Astray Red Frame",
      price: 75.5,
      image: "img/productos/gundam-astray.jpg",
    },
    {
      id: 3,
      name: "Black Lotus Alpha",
      price: 511100.0,
      image: "img/productos/black-lotus.jpg",
    },
    {
      id: 4,
      name: "Blue-Eyes White Dragon",
      price: 85.99,
      image: "img/productos/blue-eyes.jpg",
    },
    {
      id: 5,
      name: "Mewtwo GX Shiny",
      price: 350.0,
      image: "img/productos/mewtwo.jpg",
    },
    {
      id: 6,
      name: "Hot Toys Iron Man Mark 85",
      price: 425.0,
      image: "img/productos/iron-man-hot-toys.jpg",
    },
    {
      id: 7,
      name: "Funko Pop Batman Exclusivo",
      price: 25.0,
      image: "img/productos/funko-batman.jpg",
    },
    {
      id: 8,
      name: "Gear 5 Luffy Figure",
      price: 89.0,
      image: "img/productos/one-piece-luffy.jpg",
    },
    {
      id: 9,
      name: "Spider-Man Premium Statue",
      price: 599.0,
      image: "img/productos/spiderman-statue.jpg",
    },
    {
      id: 10,
      name: "Marvel Legends X-Men Set",
      price: 149.0,
      image: "img/productos/marvel-legends.jpg",
    },
  ];
  const productsGrid = document.getElementById("products-grid");
  if (!productsGrid) return;
  productsGrid.innerHTML = PRODUCTS.map(
    (product) => `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <h3>${product.name}</h3>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <button class="btn-primary">Ver más</button>
    </div>
  `
  ).join("");
});
