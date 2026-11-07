const recipes = [
  { id: 1, title: 'Kaya toast', minutes: 10 },
  { id: 2, title: 'Nasi lemak', minutes: 45 }
];

let nextId = 3;

export function listRecipes() {
  return recipes;
}

export function findRecipe(id) {
  return recipes.find((recipe) => recipe.id === id);
}

export function addRecipe(title, minutes) {
  const recipe = { id: nextId++, title, minutes };
  recipes.push(recipe);
  return recipe;
}

export function removeRecipe(id) {
  const index = recipes.findIndex((recipe) => recipe.id === id);
  if (index === -1) return false;
  recipes.splice(index, 1);
  return true;
}
