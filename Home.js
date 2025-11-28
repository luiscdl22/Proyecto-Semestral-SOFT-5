// Home.js - La Esquina Geek

(function() {
    'use strict';

    // Elementos del DOM
    const searchInput = document.getElementById('search-input');
    const btnSearch = document.getElementById('btn-search');
    const btnLogin = document.getElementById('btn-login');

    // Función de búsqueda (preparada para conectar con API)
    function buscarProducto() {
        const termino = searchInput.value.trim();
        
        if (termino === '') {
            alert('Por favor, escribe algo para buscar');
            return;
        }
        
        // Por ahora solo muestra alerta
        // Cuando tengas la API, aquí harás el fetch
        alert(`Buscando: "${termino}"\n\n(Conectar con API en C#)`);

    }

    // Event Listeners
    function init() {
        // Buscar al hacer click en el botón
        if (btnSearch) {
            btnSearch.addEventListener('click', buscarProducto);
        }

        // Buscar al presionar Enter
        if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    buscarProducto();
                }
            });
        }

        // Ir a login
        if (btnLogin) {
            btnLogin.addEventListener('click', function() {
                window.location.href = 'auth.html';
            });
        }

        console.log('La Esquina Geek - Página cargada');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();