const response = await fetch('assets/js/menus.json'); // Utilisation de 'await' car fetch() est asynchrone
let menus = await response.json(); // Utilisation de .json() pour extraire les données

let menuContainer = document.querySelector('.menu-container');

function genererMenu(menus){
    // Affichage du menu pour la journée courante
    for (let i = 0; i < menus.length; i++) {
        const menuItem = document.createElement('div');
        menuItem.classList.add('col-12','col-md-6');
        menuItem.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-12 d-flex mt-2 gap-2">
                        <img src="${menus[i].image}"class="menu-img img rounded img-thumbnail" alt="">
                        <div>
                            <h3 class="fw-semibold">${menus[i].nom}</h3>
                            <hr class="w-100">
                            <div class="d-flex flex-column flex-md-row gap-2 align-content-center">
                                <p class="fs-4"><span>Prix : </span>${menus[i].prix}</p>
                                <p id="avis-${i}"></p>
                                <button class="btn btn-warning mb-5 btn-sm fw-semibold">Commander</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        `;
        // Sélection de le paragraph où les étoiles seront affichées
        const avisContainer = menuItem.querySelector(`#avis-${i}`);

        // Boucle pour afficher les étoiles selon la note (avis)
        for (let j = 0; j < Math.floor(menus[i].avis); j++) {
            avisContainer.innerHTML += `<i class="bi bi-star-fill text-warning"></i>`;
        }

        // Si l'avis contient une demi-étoile (avis décimal), ajouter une demi-étoile
        if (menus[i].avis % 1 !== 0) {
            avisContainer.innerHTML += `<i class="bi bi-star-half text-warning"></i>`;
        }

        // Compléter avec des étoiles blanches (pour un total de 5 étoiles)
        const totalStars = Math.ceil(menus[i].avis); // Total filled or half-filled stars
        for (let j = totalStars; j < 5; j++) {
            avisContainer.innerHTML += `<i class="bi bi-star text-warning"></i>`;
        }
        menuContainer.appendChild(menuItem);
    }
}

//Récupération du jour
function getCurrentDay() {
    const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const today = new Date();
    return days[today.getDay()];
}
//Afficher le menu du jour
function menuDuJour(){
    const currentDay = getCurrentDay();
    let menuDuJour = menus.filter(menu => menu.jours.includes(currentDay));
    genererMenu(menuDuJour);
}

menuDuJour();