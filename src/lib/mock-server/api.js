
import { app } from './pretend-server.js';
import { addRecipe, listRecipes } from './recipes.js';

app.get('/api/recipes', (req, res) => {
  res.json(listRecipes());
});

app.post('/api/recipes', (req, res) => {
  const { title, minutes } = req.body ?? {};
  const trimmedTitle = typeof title === 'string' ? title.trim() : '';

  if (!trimmedTitle) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const recipe = addRecipe(trimmedTitle, minutes);
  return res.status(201).json(recipe);
});
