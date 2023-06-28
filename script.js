

function afficherListeRecettes(listeRecette) {
    for (let i = 0; i < listeRecette.length; i++) {
        let displayRecettes = getRecetteHtml(listeRecette[i])
        console.log(displayRecettes);
        
    }

}

function getRecetteHtml(listeRecette) {
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
    let recetteIngredient = document.createElement("div")
    let cardLightTitreIngredient = document.createElement("p")
    let lesIngredients = document.createElement("div")
    let oneIngredient = document.createElement("div")
    let titleIngredient = document.createElement("p")
    let detailIngredient = document.createElement("p")




    // ----------------------------------------------
    // Édition et modification des éléments de la page
    // ----------------------------------------------

    //elements header d'une recette
    timingTitleCard.innerText = listeRecette.time
    oneCardPicture.setAttribute("src", "Pictures/" + listeRecette.image)
    cardTitre.innerText = listeRecette.name

    //elements du contenant d'une recette
    recettePara.innerText = listeRecette.description

    //elements du contenant des ingredients d'une recette
    // A FAIRE 
    titleIngredient.innerText = "crée ici par la double boucle"
    detailIngredient.innerText = "crée ici par la double boucle"



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
    recetteIngredient.classList.add("recetteIngredient")
    cardLightTitreIngredient.classList.add("cardLightTitreIngredient")
    lesIngredients.classList.add("lesIngredients")
    oneIngredient.classList.add("oneIngredient")
    titleIngredient.classList.add("titleIngredient")
    detailIngredient.classList.add("detailIngredient")



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
    oneCardRecette.appendChild(recetteIngredient)
    recetteIngredient.appendChild(cardLightTitreIngredient)
    recetteIngredient.appendChild(lesIngredients)
    lesIngredients.appendChild(oneIngredient)
    oneIngredient.appendChild(titleIngredient)
    oneIngredient.appendChild(detailIngredient)




    return recettesCard
}



afficherListeRecettes(getListeRecette())