import { fail } from './kit.js';
import { addRecipe, removeRecipe } from './recipes.js';
import { ADMIN_CODE } from './secrets.js';

export const actions = {
  add: async ({ fields }) => {
    const typedTitle = String(fields.title ?? '');
    const title = typedTitle.trim();
    const minutes = Number(fields.minutes);

    if (!title) {
      return fail(400, { error: 'Title is required', title: typedTitle });
    }

    if (!Number.isFinite(minutes) || minutes <= 0) {
      return fail(400, { error: 'Minutes must be a positive number!', title: typedTitle });
    }

    addRecipe(title, minutes);
    return { success: true };
  },

   remove: async ({ fields }) => {
    if (fields.code !== ADMIN_CODE) {
      return fail(403, { error: 'Incorrect admin code' });
    }

    removeRecipe(Number(fields.id));
    return { success: true };
  }
};
