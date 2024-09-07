const response = await fetch('assets/js/menus.json'); // Utilisation de 'await' car fetch() est asynchrone
const menus = await response.json(); // Utilisation de .json() pour extraire les données
console.log(menus);

const menuContainer = document.querySelector('.menu-container');

function genererMenu(menu){
    for (let i = 0; i < menu.lenght; i++) {
        const menuItem = document.createElement('div');
        menuItem.classList.add('col-12','col-md-6');
        menuItem.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-12 d-flex mt-2 gap-2">
                        <img src="${menu.image}" width="150" class="img-fluid" alt="">
                        <div>
                            <h3 class="fw-semibold">${menu.nom}</h3>
                            <hr>
                            <p class="fs-4"><span>Prix : </span>${menu.prix}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    }
}
document.addEventListener('DOMContentLoaded', genererMenu(menus));

