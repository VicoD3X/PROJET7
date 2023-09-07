function getListeRecette() {
  return recipes;
}



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
}

getListeUstensiles();






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




function getIngredients() {
  const recettesListe = getListeRecette();
  const ingredientsList = [];

  for (let i = 0; i < recettesListe.length; i++) {
    const LesIngredientsDetail = recettesListe[i];

    for (let j = 0; j < LesIngredientsDetail.ingredients.length; j++) {
      const ingredient = LesIngredientsDetail.ingredients[j];
      const ingredientName = ingredient.ingredient;

      ingredientsList.push(ingredientName);
    }
  }
}

getIngredients();



// DAVID (?) pour GetQuantities


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
}

getUnits();
























