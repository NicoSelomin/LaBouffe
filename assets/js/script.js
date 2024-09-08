const response = await fetch('assets/js/menus.json'); // Utilisation de 'await' car fetch() est asynchrone
let menus = await response.json(); // Utilisation de .json() pour extraire les données
console.log(menus);

let menuContainer = document.querySelector('.menu-container');

function genererMenu(menus){
    for (let i = 0; i < menus.length; i++) {
        const menuItem = document.createElement('div');
        menuItem.classList.add('col-12','col-md-6');
        menuItem.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-12 d-flex mt-2 gap-2">
                        <img src="${menus[i].image}" width="150" class="img-fluid" alt="">
                        <div>
                            <h3 class="fw-semibold">${menus[i].nom}</h3>
                            <hr class="w-100">
                            <p class="fs-4"><span>Prix : </span>${menus[i].prix}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    }
}

genererMenu(menus);