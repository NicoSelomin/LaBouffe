const response = await fetch('assets/js/menus.json'); // Utilisation de 'await' car fetch() est asynchrone
let menus = await response.json(); // Utilisation de .json() pour extraire les données

let menuContainer = document.querySelector('.menu-container');

function genererMenu(menus){
    // Affichage du menu pour la journée courante
    for (let i = 0; i < menus.length; i++) {
        const menuItem = document.createElement('div');
        menuItem.classList.add('col-12','col-md-6',);
        menuItem.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-12 d-flex mt-2 gap-2">
                        <img src="${menus[i].image}" class="menu-img img rounded img-thumbnail" alt="">
                        <div>
                            <h3 class="fw-semibold">${menus[i].nom}</h3>
                            <hr class="w-100">
                            <div class="d-flex flex-column flex-md-row gap-2 align-content-center">
                                <p class="fs-4"><span>Prix : </span>${menus[i].prix} FCFA</p>
                                <p id="avis-${i}"></p>
                                <!-- Bouton Commander qui ouvre le modal -->
                                <button class="btn btn-warning mb-5 btn-sm fw-semibold" data-bs-toggle="modal" data-bs-target="#modal-${i}">Commander</button>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>

            <!-- Modal pour le menu spécifique -->
            <div class="modal fade" id="modal-${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title fw-bold" id="exampleModalLabel">Commander : ${menus[i].nom}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <img src="${menus[i].image}" class="img-fluid mb-3" alt="${menus[i].nom}">
                            <p><span class="fw-bold">Prix :</span> ${menus[i].prix} FCFA</p>
                            <p><span class="fw-bold">Description :</span> ${menus[i].description || 'Aucune description disponible'}</p>

                            <!-- Formulaire pour quantité, boisson et paiement -->
                            <form>
                                <div class="mb-3">
                                    <label for="quantity-${i}" class="form-label fw-bold">Quantité</label>
                                    <input type="number" class="form-control" id="quantity-${i}" value="1" min="1">
                                </div>
                                <div class="mb-3">
                                    <label for="boisson-${i}" class="form-label fw-bold">Boisson d'accompagnement</label>
                                    <select class="form-select" id="boisson-${i}">
                                        <option value="Coca-Cola">Coca-Cola</option>
                                        <option value="Eau">Eau</option>
                                        <option value="Sprite">Sprite</option>
                                        <option value="Fanta">Fanta</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Mode de paiement</label>
                                    <div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="payment-${i}" id="payment-delivery-${i}" value="Livraison" checked>
                                            <label class="form-check-label" for="payment-delivery-${i}">
                                                Paiement à la livraison
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="payment-${i}" id="payment-now-${i}" value="Maintenant">
                                            <label class="form-check-label" for="payment-now-${i}">
                                                Payer en même temps
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Annuler</button>
                            <button type="button" class="btn btn-warning" onclick="submitOrder(${i})">Commander</button>
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

function genererCategorie(menus){
    // Sélectionner l'élément où les boutons seront insérés
    const categoriesContainer = document.getElementById('categories');

    // Extraire les catégories uniques à partir de la liste des menus
    const categories = [...new Set(menus.map(menu => menu.categorie))];

    // Générer dynamiquement les boutons pour chaque catégorie
    categories.forEach(categorie => {
    const button = document.createElement('button');
    button.className = "btn btn-outline-secondary btn-filter fw-semibold";
    button.innerText = categorie;

    // Ajouter le bouton à l'élément conteneur
    categoriesContainer.appendChild(button);
    });
}

genererCategorie(menus);

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

//Afficher le menu en fonction du filtre basé sur les jours
function filterByDays(day){
    let menuFiltre = menus.filter(menu => menu.jours.includes(day));
    genererMenu(menuFiltre);
}

//Ecouter le formulaire de filtre en fonction du jour choisi
document.getElementById("select_jours").addEventListener("change", function() {
    menuContainer.innerHTML = "";
    filterByDays(this.value);
});

function filterByCategorie() {
    menuContainer.innerHTML = "";
    const categorie = this.innerText;
    const menuCategorie = menus.filter(menu => menu.categorie === categorie);
    genererMenu(menuCategorie);
};

//filtrer par catégorie
document.querySelectorAll('.btn-filter').forEach(button => button.addEventListener('click', filterByCategorie));