// -------------- ZONE 0 : DEBUT DU PROJET INIT  ----------------------


// -------------- ZONE 1 : Gestion de l'affichage des recettes  ----------------------

let recettesContainer = document.getElementById("recettesContainer")
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
//let listeIngredients = getIngredients();

searchBar.addEventListener('input', function (event) {

    // Stocke la valeur saisie dans la barre de recherche dans la variable `texteSaisie`.
    // La valeur est convertie en minuscules pour faciliter la comparaison avec les ingrédients.
    let texteSaisie = event.target.value.toLowerCase();

    // La fonction `filter()` est utilisée pour filtrer la liste des recettes en fonction de la valeur saisie dans la barre de recherche.
    let recettesFiltrees = listeRecette.filter(recette =>
        recette.name.toLowerCase().includes(texteSaisie) ||
        recette.description.toLowerCase().includes(texteSaisie) ||
        // La fonction `some()` est utilisée pour tester si au moins un élément d'un tableau répond à une condition donnée.
        recette.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(texteSaisie))
    );

    afficherListeRecettes(recettesFiltrees)
});



// ZONE 3.5 : Fonctions utiles pour gérer le dropdown. 
function updateDropdown(dropdownContent, searchTerm) {
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

function toogleDropdownCss(element, dropdownContent, type) {
    let arrowIcon = element.querySelector('i');

    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    arrowIcon.classList.toggle('fa-chevron-down');
    arrowIcon.classList.toggle('fa-chevron-up');
    element.classList.toggle('btn-rounded');

    dropdownContent.innerHTML = '';

    console.log(dropdownContent);

    let inputElementIngredient = document.createElement('input');
    inputElementIngredient.type = 'text';
    inputElementIngredient.placeholder = 'Rechercher...';
    inputElementIngredient.id = `search-bar-menu-${type}`;
    inputElementIngredient.classList.add("search-bar-menu");
    dropdownContent.appendChild(inputElementIngredient);
}

// -------------- ZONE 4 : Initialisation des Menus Déroulants ----------------------

window.onload = function MenuDeroulantGestion() {
    let ingredientBtn = document.querySelector('.dropdown-btnIngredient');
    let appareilsBtn = document.querySelector('.dropdown-btnAppareils');
    let ustensilesBtn = document.querySelector('.dropdown-btnUstensiles');

    // GESTION DU MENU DEROULANT INGREDIENTS
    ingredientBtn.addEventListener('click', function () {
        var dropdownContent = this.nextElementSibling;

        toogleDropdownCss(this, dropdownContent, "ingredient")

        //let listeRecette = listeRecetteFiltrer;
        let ingredientsList = getIngredients(listeRecetteFiltrer);
        for (ingredient of ingredientsList) {
            let ingredientChaine = `
                <div class='option'>
                    ${ingredient}
                </div>
            `;
            dropdownContent.innerHTML += ingredientChaine;
        }

        var searchBarIngredients = document.getElementById("search-bar-menu-ingredient")
        searchBarIngredients.addEventListener('click', function (event) {
            event.stopPropagation();
        });


        const searchBar = document.getElementById('search-bar-menu-ingredient');
        searchBar.addEventListener('input', function () {
            updateDropdown(dropdownContent, this.value);
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
                // La méthode `trim()` renvoie une nouvelle chaîne de caractères sans les espaces en début et en fin.
                listeIngredientCliquer.push(target.innerText.trim())
                afficherOptions("ingredient", listeIngredientCliquer, containOptionIngredient)

                console.log(listeIngredientCliquer);
                let listeRecetteFiltrer = filtrerParType(listeRecette, listeIngredientCliquer, "ingredient")
                afficherListeRecettes(listeRecetteFiltrer)
            }
        }
    });

    // GESTION DU MENU DEROULANT APPAREILS
    appareilsBtn.addEventListener('click', function () {
        var dropdownContentAppareils = this.nextElementSibling;

        toogleDropdownCss(this, dropdownContentAppareils, "appareils")

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

        const searchBar = document.getElementById('search-bar-menu-appareils');
        searchBar.addEventListener('input', function () {
            updateDropdown(dropdownContentAppareils, this.value);
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
                // La méthode `trim()` renvoie une nouvelle chaîne de caractères sans les espaces en début et en fin.
                listeAppareilCliquer.push(target.innerText.trim())
                afficherOptions("appareil", listeAppareilCliquer, containOptionAppareils)

                let listeRecetteFiltrer = filtrerParType(listeRecette, listeAppareilCliquer, "appareil")
                console.log(listeRecetteFiltrer);
                afficherListeRecettes(listeRecetteFiltrer)

            }
        }
    });

    // GESTION DU MENU DEROULANT USTENSILES
    ustensilesBtn.addEventListener('click', function () {
        var dropdownContentUstensils = this.nextElementSibling;

        toogleDropdownCss(this, dropdownContentUstensils, "ustensils")

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

        const searchBar = document.getElementById('search-bar-menu-ustensils');
        searchBar.addEventListener('input', function () {
            updateDropdown(dropdownContentUstensils, this.value);
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
                // La méthode `trim()` renvoie une nouvelle chaîne de caractères sans les espaces en début et en fin.
                listeUstensilesCliquer.push(target.innerText.trim())
                afficherOptions("ustensile", listeUstensilesCliquer, containOptionUstensiles)

                let listeRecetteFiltrer = filtrerParType(listeRecette, listeUstensilesCliquer, "ustensile")
                console.log(listeRecetteFiltrer);
                afficherListeRecettes(listeRecetteFiltrer)
            }
        }
    });









    // -------------- ZONE 5 : Gestion & Géneration des Options de Filtrage Dynamique ----------------------

    function afficherOptions(type, listeCliquer, containOption) {
        containOption.innerHTML = '';

        for (let i = 0; i < listeCliquer.length; i++) {
            let displayOption = document.createElement("div");
            displayOption.classList.add(`displayOption${type}`);
            containOption.appendChild(displayOption);

            let iconeCroixOption = document.createElement('i');
            iconeCroixOption.classList.add('iconeCroixOption', 'fas', 'fa-times');
            displayOption.appendChild(iconeCroixOption);

            let label = document.createElement('span');
            label.innerText = listeCliquer[i];
            displayOption.appendChild(label);

            let isClosed = false;

            iconeCroixOption.addEventListener('click', function (event) {
                if (isClosed) {
                    displayOption.style.display = 'block';
                    isClosed = false;
                } else {
                    listeCliquer.splice(event.target.innerText, 1);
                    displayOption.style.display = 'none';
                    isClosed = true;
                }

                let listeRecetteFiltrer = filtrerParType(listeRecette, listeCliquer, type); 
                
                afficherListeRecettes(listeRecetteFiltrer);
            });
        }
    }

    // Utilisation pour chaque type
    afficherOptions("appareil", listeAppareilCliquer, containOptionAppareils);
    afficherOptions("ingredient", listeIngredientCliquer, containOptionIngredient);
    afficherOptions("ustensile", listeUstensilesCliquer, containOptionUstensiles);










    //     function afficherOptions() {
    //         containOptionAppareils.innerHTML = '';
    //         containOptionIngredient.innerHTML = '';
    //         containOptionUstensiles.innerHTML = '';




    //         // GESTION DES OPTIONS APPAREILS

    //         for (let i = 0; i < listeAppareilCliquer.length; i++) {
    //             let displayOptionAppareil = document.createElement("div");
    //             displayOptionAppareil.classList.add("displayOptionAppareil");
    //             containOptionAppareils.appendChild(displayOptionAppareil);

    //             let iconeCroixOption = document.createElement('i');
    //             iconeCroixOption.id = 'iconeCroixOption';
    //             iconeCroixOption.classList.add('iconeCroixOption', 'fas', 'fa-times');
    //             displayOptionAppareil.appendChild(iconeCroixOption);

    //             let labelAppareil = document.createElement('span');
    //             labelAppareil.innerText = listeAppareilCliquer[i];
    //             displayOptionAppareil.appendChild(labelAppareil);

    //             let isClosed = false;


    //             iconeCroixOption.addEventListener('click', function (event) {
    //                 if (isClosed) {
    //                     displayOptionAppareil.style.display = 'block';
    //                     isClosed = false;
    //                 } else {
    //                     listeAppareilCliquer.splice(event.target.innerText, 1);
    //                     displayOptionAppareil.style.display = 'none';
    //                     isClosed = true;
    //                 }

    //                 let listeRecetteFiltrer = filtrerParType(listeRecette, listeAppareilCliquer, "appareil")
    //                 console.log(listeRecetteFiltrer);
    //                 afficherListeRecettes(listeRecetteFiltrer)
    //             });
    //         }



    //         // GESTION DES OPTIONS INGREDIENTS

    //         for (let i = 0; i < listeIngredientCliquer.length; i++) {
    //             let displayOptionIngredient = document.createElement("div");
    //             displayOptionIngredient.classList.add("displayOptionIngredient");
    //             containOptionIngredient.appendChild(displayOptionIngredient);

    //             let iconeCroixOption = document.createElement('i');
    //             iconeCroixOption.classList.add('iconeCroixOption', 'fas', 'fa-times');
    //             displayOptionIngredient.appendChild(iconeCroixOption);

    //             let labelIngredient = document.createElement('span');
    //             labelIngredient.innerText = listeIngredientCliquer[i];
    //             displayOptionIngredient.appendChild(labelIngredient);

    //             let isClosed = false;


    //             iconeCroixOption.addEventListener('click', function (event) {
    //                 if (isClosed) {
    //                     displayOptionIngredient.style.display = 'block';
    //                     isClosed = false;
    //                 } else {
    //                     listeIngredientCliquer.splice(event.target.innerText, 1);
    //                     displayOptionIngredient.style.display = 'none';
    //                     isClosed = true;
    //                 }

    //                 let listeRecetteFiltrer = filtrerParType(listeRecette, listeIngredientCliquer, "ingredient")
    //                 afficherListeRecettes(listeRecetteFiltrer)
    //             });
    //         }



    //         // GESTION DES OPTIONS USTENSILES

    //         for (let i = 0; i < listeUstensilesCliquer.length; i++) {
    //             let displayOptionUstensiles = document.createElement("div");
    //             displayOptionUstensiles.classList.add("displayOptionUstensiles");
    //             containOptionUstensiles.appendChild(displayOptionUstensiles);

    //             let iconeCroixOption = document.createElement('i');
    //             iconeCroixOption.classList.add('iconeCroixOption', 'fas', 'fa-times');
    //             displayOptionUstensiles.appendChild(iconeCroixOption);

    //             let labelUstensiles = document.createElement('span');
    //             labelUstensiles.innerText = listeUstensilesCliquer[i];
    //             displayOptionUstensiles.appendChild(labelUstensiles);

    //             let isClosed = false;


    //             iconeCroixOption.addEventListener('click', function (event) {
    //                 if (isClosed) {
    //                     displayOptionUstensiles.style.display = 'block';
    //                     isClosed = false;
    //                 } else {
    //                     listeUstensilesCliquer.splice(event.target.innerText, 1);
    //                     displayOptionUstensiles.style.display = 'none';
    //                     isClosed = true;
    //                 }

    //                 let listeRecetteFiltrer = filtrerParType(listeRecette, listeUstensilesCliquer, "ustensile")
    //                 afficherListeRecettes(listeRecetteFiltrer)
    //             });
    //         }
    //     }
    // };









    // -------------- ZONE 6 : Filtrage des Recettes selon les Critères Sélectionnés ----------------------

    function filtrerParType(listeRecette, listeItemCliquer, type) {
        const recettesFiltrees = [];

        for (let i = 0; i < listeRecette.length; i++) {
            const recette = listeRecette[i];
            let recetteValide = true;

            for (let j = 0; j < listeItemCliquer.length; j++) {
                const itemCourant = listeItemCliquer[j];
                let itemTrouve = false;

                switch (type) {
                    case "ingredient":
                        for (let k = 0; k < recette.ingredients.length; k++) {
                            if (recette.ingredients[k].ingredient === itemCourant) {
                                itemTrouve = true;
                                break;
                            }
                        }
                        break;
                    case "ustensile":
                        if (recette.ustensils.includes(itemCourant)) {
                            itemTrouve = true;
                        }
                        break;
                    case "appareil":
                        if (recette.appliance === itemCourant) {
                            itemTrouve = true;
                        }
                        break;
                }
                if (!itemTrouve) {
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


    function isIngredientDansRecette(recette, ingredient) {
        return recette.ingredients.includes(ingredient);
    }

    function isUstensileDansRecette(recette, ustensile) {
        return recette.ustensiles === ustensile;
    }

    function isAppareilDansRecette(recette, appareil) {
        return recette.appliance === appareil;
    } 
}
