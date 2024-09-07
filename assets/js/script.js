const response = await fetch('assets/js/menus.json'); // Utilisation de 'await' car fetch() est asynchrone
const menus = await response.json(); // Utilisation de .json() pour extraire les données

