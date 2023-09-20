// -------------------------------------------------------------------------------------------------
// -------------- Récupération des données utilisable dans le code script.js  ----------------------
// -------------------------------------------------------------------------------------------------


// RECUPERATION DES RECETTES NON FILTREES (pour affichage de toutes les recettes)
function getListeRecette() {
  return recipes;
}



// RECUPERATION DE LA LISTE DES USTENSILES 
function getListeUstensiles() {

  const recettesListe = getListeRecette();
  const ustensilesListe = [];

  for (let i = 0; i < recettesListe.length; i++) {
    const lesRecetteDetail = recettesListe[i];
    const ustensiles = lesRecetteDetail.ustensils;

    for (let j = 0; j < ustensiles.length; j++) {
      const ustensile = ustensiles[j];

      if (!ustensilesListe.includes(ustensile)) {
        ustensilesListe.push(ustensile);
      }
    }
  }
  return ustensilesListe;
}
getListeUstensiles();




// RECUPERATION DE LA LISTE DES APPAREILS
function getListeAppareils() {

  const recettesListe = getListeRecette();
  const appareilsListe = [];

  for (let i = 0; i < recettesListe.length; i++) {
    const lesRecetteDetail = recettesListe[i];
    const appareil = lesRecetteDetail.appliance;

    if (!appareilsListe.includes(appareil)) {
      appareilsListe.push(appareil);
    }
  }
  return appareilsListe;
}
getListeAppareils();




// RECUPERATION DE LA LISTE DES INGREDIENTS
function getIngredients(listeRecette) {
    const ingredientsList = [];

    for (let j = 0; j < listeRecette.length; j++) {
        const recette = listeRecette[j];
        for (let i = 0; i < recette.ingredients.length; i++) {
            const ingredient = recette.ingredients[i];
            if (!ingredientsList.includes(ingredient.ingredient)) {
                ingredientsList.push(ingredient.ingredient);
            }
        }
    }
  return ingredientsList
}
//getIngredients();

// function getUstentil(listeRecette) {
// ....


// RECUPERATION DE LA LISTE DES QUANTITES D'INGREDIENTS
function getQuantities() {

  const recettesListe = getListeRecette();
  const ingredientsQuantities = {};

  for (let i = 0; i < recettesListe.length; i++) {
    const LesIngredientsDetail = recettesListe[i];

    for (let j = 0; j < LesIngredientsDetail.ingredients.length; j++) {
      const ingredient = LesIngredientsDetail.ingredients[j];
      const ingredientName = ingredient.ingredient;
      const ingredientQuantity = ingredient.quantity;

      if (!ingredientsQuantities.hasOwnProperty(ingredientName)) {
        ingredientsQuantities[ingredientName] = 0;
      }
      ingredientsQuantities[ingredientName] += ingredientQuantity;

    }
  }
}
getQuantities();




// RECUPERATION DE LA LISTE DES UNITES D'INGREDIENTS
function getUnits() {
  const recettesListe = getListeRecette();
  const unitsList = [];

  for (let i = 0; i < recettesListe.length; i++) {
    const LesIngredientsDetail = recettesListe[i];

    for (let j = 0; j < LesIngredientsDetail.ingredients.length; j++) {
      const ingredient = LesIngredientsDetail.ingredients[j];
      const ingredientUnit = ingredient.unit;
      unitsList.push(ingredientUnit);
    }
  }

  return unitsList;
}

const units = getUnits();

























