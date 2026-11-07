import { listRecipes } from './recipes.js';
export function loadRecipes() {
  return { recipes: listRecipes() };
}

import { findRecipe } from './recipes.js';
import { error } from './kit.js';


export function loadRecipe({ params }) {
  const recipe = findRecipe(Number(params.id));

  if (!recipe) {
    error(404, 'No such recipe');
  }

  return { recipe };
}