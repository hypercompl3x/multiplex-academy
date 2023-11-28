import { loginUserSchema } from '$lib/form/schemas';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = (async () => {
  const form = await superValidate(loginUserSchema);
  return { form };
});

export const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, loginUserSchema);
    console.log('POST', form);

    if (!form.valid) {
      return fail(400, { form });
    }

    return { form };
  }
};