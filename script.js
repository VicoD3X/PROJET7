// -------------- ZONE 0 : DEBUT DU PROJET INIT  ----------------------


// -------------- ZONE 1 : Gestion de l'affichage des recettes  ----------------------

var recettesContainer = document.getElementById("recettesContainer")
recettesContainer.innerHTML = ''

let listeAppareilCliquer = []
let listeIngredientCliquer = []
let listeUstensilesCliquer = []
let listeRecetteFiltrer = []

function afficherListeRecettes(listeRecette) {
    console.log(listeRecette);
    listeRecetteFiltrer = listeRecette
    recettesContainer.innerHTML = ''

    for (let i = 0; i < listeRecette.length; i++) {
        let displayRecettes = getRecetteHtml(listeRecette[i])
        recettesContainer.appendChild(displayRecettes)
    }

    let nbRecette = document.getElementById("nbRecette")
    nbRecette.innerText = listeRecette.length 
}





// -------------- ZONE 2 : Géneration de la structure HTML des recettes  ----------------------


function getRecetteHtml(recette) {

    let recettesCard = document.createElement("div")
    let oneCardRecette = document.createElement("div")
    let timingTitleCard = document.createElement("p")
    let oneCardPicture = document.createElement("img")
    let cardTitre = document.createElement("p")
    let recetteText = document.createElement("div")
    let cardLightTitre = document.createElement("p")
    let recettePara = document.createElement("p")
    let cardLightTitreIngredient = document.createElement("p")
    let recetteIngredient = document.createElement("div")


    timingTitleCard.innerText = recette.time + "min"
    oneCardPicture.setAttribute("src", "Pictures/" + recette.image)
    cardTitre.innerText = recette.name
    cardLightTitre.innerText = "RECETTE"
    recettePara.innerText = recette.description
    cardLightTitreIngredient.innerText = "INGREDIENTS"


    for (let i = 0; i < recette.ingredients.length; i++) {
        const ingredient = recette.ingredients[i];
        if (ingredient.unit == undefined) {
            ingredient.unit = ''
        }

        let ingredientChaine = ` 
        <div class= 'oneIngredient'>
            <p class='titleIngredient'>
                ${ingredient.ingredient}
            </p>
            <p class='detailIngredient'>
                ${ingredient.quantity} ${ingredient.unit}
            </p>
        </div>    
        `

        recetteIngredient.innerHTML += ingredientChaine
    }


    recettesCard.classList.add("recettesCard")
    oneCardRecette.classList.add("oneCardRecette")
    timingTitleCard.classList.add("timingTitleCard")
    oneCardPicture.classList.add("oneCardPicture")
    cardTitre.classList.add("cardTitre")
    recetteText.classList.add("recetteText")
    cardLightTitre.classList.add("cardLightTitre")
    recettePara.classList.add("recettePara")
    cardLightTitreIngredient.classList.add("cardLightTitreIngredient")
    recetteIngredient.classList.add("recetteIngredient")


    recettesCard.appendChild(oneCardRecette)
    oneCardRecette.appendChild(timingTitleCard)
    oneCardRecette.appendChild(oneCardPicture)
    oneCardRecette.appendChild(cardTitre)
    oneCardRecette.appendChild(recetteText)
    recetteText.appendChild(cardLightTitre)
    recetteText.appendChild(recettePara)
    oneCardRecette.appendChild(cardLightTitreIngredient)
    oneCardRecette.appendChild(recetteIngredient)

    return recettesCard
}
afficherListeRecettes(getListeRecette())







// -------------- ZONE 3 : Gestion de la barre de recherche centrale ----------------------

let searchBar = document.getElementById("search-bar");
let listeRecette = getListeRecette();
let listeIngredients = getIngredients();

searchBar.addEventListener('input', function (event) {
    let texteSaisie = event.target.value.toLowerCase();

    let recettesFiltrees = listeRecette.filter(recette =>
        recette.name.toLowerCase().includes(texteSaisie) ||
        recette.description.toLowerCase().includes(texteSaisie) ||
        recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(texteSaisie))
    );

    afficherListeRecettes(recettesFiltrees)
}); 





// -------------- ZONE 4 : Initialisation des Menus Déroulants ----------------------

window.onload = function MenuDeroulantGestion() {
    let ingredientBtn = document.querySelector('.dropdown-btnIngredient');
    let appareilsBtn = document.querySelector('.dropdown-btnAppareils');
    let ustensilesBtn = document.querySelector('.dropdown-btnUstensiles');






    // GESTION DU MENU DEROULANT INGREDIENTS

    ingredientBtn.addEventListener('click', function () {
        var dropdownContent = this.nextElementSibling;
        let arrowIcon = this.querySelector('i');

        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        arrowIcon.classList.toggle('fa-chevron-down');
        arrowIcon.classList.toggle('fa-chevron-up');
        this.classList.toggle('btn-rounded');

        var dropdownContent = document.getElementById('dropdown-content-ingredient');
        dropdownContent.innerHTML = ''; 

        let inputElementIngredient = document.createElement('input');
        inputElementIngredient.type = 'text';
        inputElementIngredient.placeholder = 'Rechercher...';
        inputElementIngredient.id = 'search-bar-menu-ingredient';
        inputElementIngredient.classList.add("search-bar-menu");
        dropdownContent.appendChild(inputElementIngredient);


        let listeRecette = listeRecetteFiltrer;
        let ingredientsList = []; 
    
        for (let j = 0; j < listeRecette.length; j++) {
            const recette = listeRecette[j];
            for (let i = 0; i < recette.ingredients.length; i++) {
                const ingredient = recette.ingredients[i];
                if (!ingredientsList.includes(ingredient.ingredient)) {
                    ingredientsList.push(ingredient.ingredient);
                    let ingredientChaine = `
                    <div class='option'>
                        ${ingredient.ingredient}
                    </div>
                `;
                    dropdownContent.innerHTML += ingredientChaine;
                }
            }
        }





        var searchBarIngredients = document.getElementById("search-bar-menu-ingredient")
        searchBarIngredients.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        function updateDropdown(searchTerm) {
            const options = dropdownContent.querySelectorAll('.option');

            options.forEach(option => {
                const ingredient = option.textContent;
                if (ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
                    option.style.display = 'block';
                } else {
                    option.style.display = 'none';
                }
            });
        }

        const searchBar = document.getElementById('search-bar-menu-ingredient');
        searchBar.addEventListener('input', function () {
            updateDropdown(this.value);
        });
    });


    var dropdownContentIngredient = document.getElementById('dropdown-content-ingredient');
    dropdownContentIngredient.addEventListener('click', function (event) {
        let target = event.target;

        if (target.classList.contains('option')) {
            dropdownContentIngredient.style.display = 'none';
            var ingredientArrowIcon = ingredientBtn.querySelector('i');
            ingredientArrowIcon.classList.remove('fa-chevron-up');
            ingredientArrowIcon.classList.add('fa-chevron-down');
            ingredientBtn.classList.remove('btn-rounded');

            if (!listeIngredientCliquer.includes(target.innerText.trim())) {
                listeIngredientCliquer.push(target.innerText.trim())
                afficherOptions()

                console.log(listeIngredientCliquer);
                let listeRecetteFiltrer = filtrer()
                afficherListeRecettes(listeRecetteFiltrer)
            }
        }
    });







    // GESTION DU MENU DEROULANT APPAREILS

    appareilsBtn.addEventListener('click', function () {
        var dropdownContentAppareils = this.nextElementSibling;
        let arrowIconAppareils = this.querySelector('i');

        dropdownContentAppareils.style.display = dropdownContentAppareils.style.display === 'block' ? 'none' : 'block';
        arrowIconAppareils.classList.toggle('fa-chevron-down');
        arrowIconAppareils.classList.toggle('fa-chevron-up');
        this.classList.toggle('btn-rounded');

        var dropdownContentAppareils = document.getElementById('dropdown-content-appareils');
        dropdownContentAppareils.innerHTML = ''; // Vide le contenu existant

        let inputElementAppareils = document.createElement('input');
        inputElementAppareils.type = 'text';
        inputElementAppareils.placeholder = 'Rechercher...';
        inputElementAppareils.id = 'search-bar-menu-appareils';
        inputElementAppareils.classList.add("search-bar-menu");
        dropdownContentAppareils.appendChild(inputElementAppareils);

        let listeRecette = listeRecetteFiltrer;
        let appareilsList = [];

        for (let j = 0; j < listeRecette.length; j++) {
            const recette = listeRecette[j];

            for (let i = 0; i < recette.appliance.length; i++) {
                const appareil = recette.appliance;

                if (!appareilsList.includes(appareil)) {
                    appareilsList.push(appareil);
                    let appareilChaine = `
                        <div class='option'>
                            ${appareil}
                        </div>
                    `;
                    dropdownContentAppareils.innerHTML += appareilChaine;
                }
            }
        }






        let searchBarAppareils = document.getElementById("search-bar-menu-appareils")
        searchBarAppareils.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        function updateDropdown(searchTerm) {
            const options = dropdownContentAppareils.querySelectorAll('.option');

            options.forEach(option => {
                const appareil = option.textContent;
                if (appareil.toLowerCase().includes(searchTerm.toLowerCase())) {
                    option.style.display = 'block';
                } else {
                    option.style.display = 'none';
                }
            });
        }

        const searchBar = document.getElementById('search-bar-menu-appareils');
        searchBar.addEventListener('input', function () {
            updateDropdown(this.value);
        });
    });


    var dropdownContentAppareils = document.getElementById('dropdown-content-appareils');
    dropdownContentAppareils.addEventListener('click', function (event) {
        let target = event.target;

        if (target.classList.contains('option')) {
            dropdownContentAppareils.style.display = 'none';
            let appareilsArrowIcon = appareilsBtn.querySelector('i');
            appareilsArrowIcon.classList.remove('fa-chevron-up');
            appareilsArrowIcon.classList.add('fa-chevron-down');
            appareilsBtn.classList.remove('btn-rounded');

            if (!listeAppareilCliquer.includes(target.innerText.trim())) {
                listeAppareilCliquer.push(target.innerText.trim())
                afficherOptions()

                let listeRecetteFiltrer = filtrer()
                console.log(listeRecetteFiltrer);
                afficherListeRecettes(listeRecetteFiltrer)

            }
        }
    });






    // GESTION DU MENU DEROULANT USTENSILES

    ustensilesBtn.addEventListener('click', function () {
        var dropdownContentUstensils = this.nextElementSibling;
        let arrowIconUstensils = this.querySelector('i');

        dropdownContentUstensils.style.display = dropdownContentUstensils.style.display === 'block' ? 'none' : 'block';
        arrowIconUstensils.classList.toggle('fa-chevron-down');
        arrowIconUstensils.classList.toggle('fa-chevron-up');
        this.classList.toggle('btn-rounded');

        var dropdownContentUstensils = document.getElementById('dropdown-content-ustensils');
        dropdownContentUstensils.innerHTML = ''; 

        let inputElementUstensils = document.createElement('input');
        inputElementUstensils.type = 'text';
        inputElementUstensils.placeholder = 'Rechercher...';
        inputElementUstensils.id = 'search-bar-menu-ustensils';
        inputElementUstensils.classList.add("search-bar-menu");
        dropdownContentUstensils.appendChild(inputElementUstensils);

        let listeRecette = listeRecetteFiltrer;
        let ustensilsList = []; 

        for (let j = 0; j < listeRecette.length; j++) {
            const recette = listeRecette[j];

            for (let i = 0; i < recette.ustensils.length; i++) {
                const ustensil = recette.ustensils[i];

                if (!ustensilsList.includes(ustensil)) {
                    ustensilsList.push(ustensil);
                    let ustensilChaine = `
                        <div class='option'>
                            ${ustensil}
                        </div>
                    `;
                    dropdownContentUstensils.innerHTML += ustensilChaine;
                }
            }
        }



        let searchBarUstensils = document.getElementById("search-bar-menu-ustensils")
        searchBarUstensils.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        function updateDropdown(searchTerm) {
            const options = dropdownContentUstensils.querySelectorAll('.option');

            options.forEach(option => {
                const ustensil = option.textContent;
                if (ustensil.toLowerCase().includes(searchTerm.toLowerCase())) {
                    option.style.display = 'block';
                } else {
                    option.style.display = 'none';
                }
            });
        }

        const searchBar = document.getElementById('search-bar-menu-ustensils');
        searchBar.addEventListener('input', function () {
            updateDropdown(this.value);
        });
    });


    let dropdownContentUstensils = document.getElementById('dropdown-content-ustensils');
    dropdownContentUstensils.addEventListener('click', function (event) {
        var target = event.target;

        if (target.classList.contains('option')) {
            dropdownContentUstensils.style.display = 'none';
            var ustensilsArrowIcon = ustensilesBtn.querySelector('i');
            ustensilsArrowIcon.classList.remove('fa-chevron-up');
            ustensilsArrowIcon.classList.add('fa-chevron-down');
            ustensilesBtn.classList.remove('btn-rounded');

            if (!listeUstensilesCliquer.includes(target.innerText.trim())) {
                listeUstensilesCliquer.push(target.innerText.trim())
                afficherOptions()

                let listeRecetteFiltrer = filtrer()
                console.log(listeRecetteFiltrer);
                afficherListeRecettes(listeRecetteFiltrer)
            }
        }
    });







    

    // -------------- ZONE 5 : Gestion & Géneration des Options de Filtrage Dynamique ----------------------

    function afficherOptions() {
        containOptionAppareils.innerHTML = '';
        containOptionIngredient.innerHTML = '';
        containOptionUstensiles.innerHTML = '';




        // GESTION DES OPTIONS APPAREILS

        for (let i = 0; i < listeAppareilCliquer.length; i++) {
            let displayOptionAppareil = document.createElement("div");
            displayOptionAppareil.classList.add("displayOptionAppareil");
            containOptionAppareils.appendChild(displayOptionAppareil);

            let iconeCroixOption = document.createElement('i');
            iconeCroixOption.id = 'iconeCroixOption'; 
            iconeCroixOption.classList.add('iconeCroixOption', 'fas', 'fa-times');
            displayOptionAppareil.appendChild(iconeCroixOption);

            let labelAppareil = document.createElement('span');
            labelAppareil.innerText = listeAppareilCliquer[i];
            displayOptionAppareil.appendChild(labelAppareil);

            let isClosed = false; 


            iconeCroixOption.addEventListener('click', function (event) {
                if (isClosed) {
                    displayOptionAppareil.style.display = 'block';
                    isClosed = false;
                } else {
                    listeAppareilCliquer.splice(event.target.innerText, 1);
                    displayOptionAppareil.style.display = 'none';
                    isClosed = true;
                }

                let listeRecetteFiltrer = filtrer()
                console.log(listeRecetteFiltrer);
                afficherListeRecettes(listeRecetteFiltrer)
            });
        }



        // GESTION DES OPTIONS INGREDIENTS

        for (let i = 0; i < listeIngredientCliquer.length; i++) {
            let displayOptionIngredient = document.createElement("div");
            displayOptionIngredient.classList.add("displayOptionIngredient");
            containOptionIngredient.appendChild(displayOptionIngredient);

            let iconeCroixOption = document.createElement('i');
            iconeCroixOption.classList.add('iconeCroixOption', 'fas', 'fa-times');
            displayOptionIngredient.appendChild(iconeCroixOption);

            let labelIngredient = document.createElement('span');
            labelIngredient.innerText = listeIngredientCliquer[i];
            displayOptionIngredient.appendChild(labelIngredient);

            let isClosed = false; 


            iconeCroixOption.addEventListener('click', function (event) {
                if (isClosed) {
                    displayOptionIngredient.style.display = 'block';
                    isClosed = false;
                } else {
                    listeIngredientCliquer.splice(event.target.innerText, 1);
                    displayOptionIngredient.style.display = 'none';
                    isClosed = true;
                }

                let listeRecetteFiltrer = filtrer()
                afficherListeRecettes(listeRecetteFiltrer)
            });
        }



        // GESTION DES OPTIONS USTENSILES

        for (let i = 0; i < listeUstensilesCliquer.length; i++) {
            let displayOptionUstensiles = document.createElement("div");
            displayOptionUstensiles.classList.add("displayOptionUstensiles");
            containOptionUstensiles.appendChild(displayOptionUstensiles);

            let iconeCroixOption = document.createElement('i');
            iconeCroixOption.classList.add('iconeCroixOption', 'fas', 'fa-times');
            displayOptionUstensiles.appendChild(iconeCroixOption);

            let labelUstensiles = document.createElement('span');
            labelUstensiles.innerText = listeUstensilesCliquer[i];
            displayOptionUstensiles.appendChild(labelUstensiles);

            let isClosed = false; 


            iconeCroixOption.addEventListener('click', function (event) {
                if (isClosed) {
                    displayOptionUstensiles.style.display = 'block';
                    isClosed = false;
                } else {
                    listeUstensilesCliquer.splice(event.target.innerText, 1);
                    displayOptionUstensiles.style.display = 'none';
                    isClosed = true;
                }

                let listeRecetteFiltrer = filtrer()
                afficherListeRecettes(listeRecetteFiltrer)
            });
        }
    }
};









// -------------- ZONE 6 : Filtrage des Recettes selon les Critères Sélectionnés ----------------------

function filtrer() {
    console.log(listeIngredientCliquer);
    let listeRecette = getListeRecette();
    console.log(listeRecette);
    listeRecette = filtrerParAppareil(listeRecette)
    console.log(listeRecette);
    listeRecette = filtrerParIngredient(listeRecette)
    console.log(listeRecette);
    listeRecette = filtrerParUstensiles(listeRecette)
    console.log(listeRecette);
    listeRecetteFiltrer = listeRecette
    return listeRecette
}






// FILTRAGE PAR APPAREILS

function filtrerParAppareil(listeRecette) {


    const recettesFiltrees = [];

    for (let i = 0; i < listeRecette.length; i++) {
        const recette = listeRecette[i];
        let appareilTrouve = true;

        for (let j = 0; j < listeAppareilCliquer.length; j++) {

            let appareilCourant = listeAppareilCliquer[j];
            if (recette.appliance !== appareilCourant) {
                appareilTrouve = false;
                break;
            }
        }
        if (appareilTrouve) {
            recettesFiltrees.push(recette);
        }
    }
    return recettesFiltrees;
}




// FILTRAGE PAR INGREDIENTS

function filtrerParIngredient(listeRecette) {


    const recettesFiltrees = [];

    for (let i = 0; i < listeRecette.length; i++) {
        const recette = listeRecette[i];
        let recetteValide = true;

        for (let j = 0; j < listeIngredientCliquer.length; j++) {
            let ingredientCourant = listeIngredientCliquer[j];
            let ingredientTrouve = false;

            for (let k = 0; k < recette.ingredients.length; k++) {
                const ingredients = recette.ingredients[k];

                if (ingredients.ingredient == ingredientCourant) {
                    ingredientTrouve = true;
                    break;
                }
            }
            if (ingredientTrouve == false) {
                recetteValide = false;
                break;
            }
        }
        if (recetteValide) {
            recettesFiltrees.push(recette);
        }
    }
    return recettesFiltrees;
}



// FILTRAGE PAR USTENSILES

function filtrerParUstensiles(listeRecette) {


    const recettesFiltrees = [];

    for (let i = 0; i < listeRecette.length; i++) {
        const recette = listeRecette[i];
        let recetteValide = true;

        for (let j = 0; j < listeUstensilesCliquer.length; j++) {
            let ustensilesCourant = listeUstensilesCliquer[j];
            let ustensilesTrouve = false;

            for (let k = 0; k < recette.ustensils.length; k++) {
                const ustensiles = recette.ustensils[k];

                if (ustensiles == ustensilesCourant) {
                    ustensilesTrouve = true;
                    break;
                }
            }
            if (ustensilesTrouve == false) {
                recetteValide = false;
                break;
            }
        }
        if (recetteValide) {
            recettesFiltrees.push(recette);
        }
    }
    return recettesFiltrees;
}























// GESTION DE LA BARRE DE RECHERCHE ALTERNATIF 

// let searchBar = document.getElementById("search-bar");
// let listeRecette = getListeRecette();
// let listeIngredients = getIngredients();

// // TITRE, INGRÉDIENTS ET DESCRIPTION UNIQUES SEULEMENT
// // SYNCHRONISER AVEC RECHERCHE

// searchBar.addEventListener('input', function (event) {
//     let texteSaisie = event.target.value.toLowerCase();

//     // Filtrer les recettes correspondant au texte saisi
//     let recettesFiltrees = [];

//     for (let i = 0; i < listeRecette.length; i++) {
//         let recette = listeRecette[i];
//         if (
//             recette.name.toLowerCase().includes(texteSaisie) ||
//             recette.description.toLowerCase().includes(texteSaisie)
//         ) {
//             recettesFiltrees.push(recette);
//         } else {
//             let ingredientsFiltres = recette.ingredients.filter(ingredient =>
//                 ingredient.ingredient.toLowerCase().includes(texteSaisie)
//             );
//             if (ingredientsFiltres.length > 0) {
//                 recettesFiltrees.push({
//                     name: recette.name,
//                     ingredients: ingredientsFiltres,
//                     description: recette.description,
//                 });
//             }
//         }
//     }

//     console.log(recettesFiltrees);
//     afficherListeRecettes(recettesFiltrees);
// });



