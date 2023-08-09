var recettesContainer = document.getElementById("recettesContainer")
recettesContainer.innerHTML = ''

function afficherListeRecettes(listeRecette) {
    for (let i = 0; i < listeRecette.length; i++) {
        let displayRecettes = getRecetteHtml(listeRecette[i])
        recettesContainer.appendChild(displayRecettes)
        //console.log(displayRecettes);

    }
}





function getRecetteHtml(recette) {
    //  ... generation du html

    // creation des elements header d'une recette
    let recettesCard = document.createElement("div")
    let oneCardRecette = document.createElement("div")
    let timingTitleCard = document.createElement("p")
    let oneCardPicture = document.createElement("img")
    let cardTitre = document.createElement("p")

    // creation des elements du contenant d'une recette
    let recetteText = document.createElement("div")
    let cardLightTitre = document.createElement("p")
    let recettePara = document.createElement("p")

    //Création des elements du contenant des ingredients d'une recette
    let cardLightTitreIngredient = document.createElement("p")
    let recetteIngredient = document.createElement("div")




    // ----------------------------------------------
    // Édition et modification des éléments de la page
    // ----------------------------------------------

    //elements header d'une recette
    timingTitleCard.innerText = recette.time + "min"
    oneCardPicture.setAttribute("src", "Pictures/" + recette.image)
    cardTitre.innerText = recette.name
    cardLightTitre.innerText = "RECETTE"

    //elements du contenant d'une recette
    recettePara.innerText = recette.description

    //elements du contenant des ingredients d'une recette
    // A FAIRE 
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
    //titleIngredient.innerText = "crée ici par la double boucle"
    //detailIngredient.innerText = "crée ici par la double boucle"



    // ----------------------------------------------
    // Ajout des classes CSS aux éléments de la page
    // ----------------------------------------------

    //elements header d'une recette
    recettesCard.classList.add("recettesCard")
    oneCardRecette.classList.add("oneCardRecette")
    timingTitleCard.classList.add("timingTitleCard")
    oneCardPicture.classList.add("oneCardPicture")
    cardTitre.classList.add("cardTitre")

    //elements du contenant d'une recette
    recetteText.classList.add("recetteText")
    cardLightTitre.classList.add("cardLightTitre")
    recettePara.classList.add("recettePara")

    //Création des elements du contenant des ingredients d'une recette
    cardLightTitreIngredient.classList.add("cardLightTitreIngredient")
    recetteIngredient.classList.add("recetteIngredient")



    // ----------------------------------------------
    // Intégration des éléments dans la structure de la page
    // ----------------------------------------------

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








// -------------- GESTION MENU DEROULANT ----------------------
// modifié var en let



window.onload = function MenuDeroulantGestion() {
    var ingredientBtn = document.querySelector('.dropdown-btnIngredient');
    var appareilsBtn = document.querySelector('.dropdown-btnAppareils');
    var ustensilesBtn = document.querySelector('.dropdown-btnUstensiles');

    let listeIngredientCliquer = []
    let listeAppareilCliquer = []
    let listeUstensilesCliquer = []



    ingredientBtn.addEventListener('click', function (event) {
        var dropdownContent = this.nextElementSibling; 
        var arrowIcon = this.querySelector('i'); 

        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block'; 
        arrowIcon.classList.toggle('fa-chevron-down');
        arrowIcon.classList.toggle('fa-chevron-up');

        this.classList.toggle('btn-rounded');

        var dropdownContent = document.getElementById('dropdown-content-ingredient');
        dropdownContent.innerHTML = ''; // Vide le contenu existant

        var inputElementIngredient = document.createElement('input');
        inputElementIngredient.type = 'text';
        inputElementIngredient.placeholder = 'Rechercher...';
        inputElementIngredient.id = 'search-bar-menu-ingredient';
        inputElementIngredient.classList.add("search-bar-menu");
        dropdownContent.appendChild(inputElementIngredient);



        var listeRecette = getListeRecette();
        var ingredientsList = []; // Liste des ingrédients

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

        // Fonction pour mettre à jour le menu déroulant avec les ingrédients filtrés
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

        // Événement de saisie de texte pour la barre de recherche
        const searchBar = document.getElementById('search-bar-menu-ingredient');
        searchBar.addEventListener('input', function () {
            updateDropdown(this.value);
        });
    });



    var dropdownContentIngredient = document.getElementById('dropdown-content-ingredient');

        // Fermer le menu lorsque l'utilisateur clique sur une option
        dropdownContentIngredient.addEventListener('click', function (event) {
            var target = event.target;
            if (target.classList.contains('option')) {
                dropdownContentIngredient.style.display = 'none';
                var ingredientArrowIcon = ingredientBtn.querySelector('i');
                ingredientArrowIcon.classList.remove('fa-chevron-up');
                ingredientArrowIcon.classList.add('fa-chevron-down');
                ingredientBtn.classList.remove('btn-rounded');
                listeIngredientCliquer.push(target.innerText.trim())
                console.log(listeIngredientCliquer);
            }
        });








    appareilsBtn.addEventListener('click', function () {
        var dropdownContentAppareils = this.nextElementSibling;
        var arrowIconAppareils = this.querySelector('i');

        dropdownContentAppareils.style.display = dropdownContentAppareils.style.display === 'block' ? 'none' : 'block';
        arrowIconAppareils.classList.toggle('fa-chevron-down');
        arrowIconAppareils.classList.toggle('fa-chevron-up');

        this.classList.toggle('btn-rounded');

        var dropdownContentAppareils = document.getElementById('dropdown-content-appareils');
        dropdownContentAppareils.innerHTML = ''; // Vide le contenu existant

        var inputElementAppareils = document.createElement('input');
        inputElementAppareils.type = 'text';
        inputElementAppareils.placeholder = 'Rechercher...';
        inputElementAppareils.id = 'search-bar-menu-appareils';
        inputElementAppareils.classList.add("search-bar-menu");
        dropdownContentAppareils.appendChild(inputElementAppareils);

        var listeRecette = getListeRecette();
        var appareilsList = []; // Liste des appareils

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

      

        var searchBarAppareils = document.getElementById("search-bar-menu-appareils")
        searchBarAppareils.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        // Fonction pour mettre à jour le menu déroulant avec les appareils filtrés
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

        // Événement de saisie de texte pour la barre de recherche
        const searchBar = document.getElementById('search-bar-menu-appareils');
        searchBar.addEventListener('input', function () {
            updateDropdown(this.value);
        });
    });


    var dropdownContentAppareils = document.getElementById('dropdown-content-appareils');

        // Fermer le menu lorsque l'utilisateur clique sur une option
        dropdownContentAppareils.addEventListener('click', function (event) {
            var target = event.target;
            if (target.classList.contains('option')) {
                dropdownContentAppareils.style.display = 'none';
                var appareilsArrowIcon = appareilsBtn.querySelector('i');
                appareilsArrowIcon.classList.remove('fa-chevron-up');
                appareilsArrowIcon.classList.add('fa-chevron-down');
                appareilsBtn.classList.remove('btn-rounded');
                listeAppareilCliquer.push(target.innerText.trim())
                console.log(listeAppareilCliquer);
            }
        });







    ustensilesBtn.addEventListener('click', function () {
        var dropdownContentUstensils = this.nextElementSibling;
        var arrowIconUstensils = this.querySelector('i');

        dropdownContentUstensils.style.display = dropdownContentUstensils.style.display === 'block' ? 'none' : 'block';
        arrowIconUstensils.classList.toggle('fa-chevron-down');
        arrowIconUstensils.classList.toggle('fa-chevron-up');

        this.classList.toggle('btn-rounded');

        var dropdownContentUstensils = document.getElementById('dropdown-content-ustensils');
        dropdownContentUstensils.innerHTML = ''; // Vide le contenu existant

        var inputElementUstensils = document.createElement('input');
        inputElementUstensils.type = 'text';
        inputElementUstensils.placeholder = 'Rechercher...';
        inputElementUstensils.id = 'search-bar-menu-ustensils';
        inputElementUstensils.classList.add("search-bar-menu");
        dropdownContentUstensils.appendChild(inputElementUstensils);

        var listeRecette = getListeRecette();
        var ustensilsList = []; // Liste des ustensiles

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

       

        var searchBarUstensils = document.getElementById("search-bar-menu-ustensils")
        searchBarUstensils.addEventListener('click', function (event) {
            event.stopPropagation();
        });

        // Fonction pour mettre à jour le menu déroulant avec les ustensiles filtrés
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

        // Événement de saisie de texte pour la barre de recherche
        const searchBar = document.getElementById('search-bar-menu-ustensils');
        searchBar.addEventListener('input', function () {
            updateDropdown(this.value);
        });
    });

    var dropdownContentUstensils = document.getElementById('dropdown-content-ustensils');

    // Fermer le menu lorsque l'utilisateur clique sur une option
    dropdownContentUstensils.addEventListener('click', function (event) {
        var target = event.target;
        if (target.classList.contains('option')) {
            dropdownContentUstensils.style.display = 'none';
            var ustensilsArrowIcon = ustensilesBtn.querySelector('i');
            ustensilsArrowIcon.classList.remove('fa-chevron-up');
            ustensilsArrowIcon.classList.add('fa-chevron-down');
            ustensilesBtn.classList.remove('btn-rounded');
            listeUstensilesCliquer.push(target.innerText.trim())
            console.log(listeUstensilesCliquer);
        }
    });
};



