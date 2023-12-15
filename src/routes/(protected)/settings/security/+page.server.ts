import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types.js';
import { securitySchema } from '$lib/form/schemas';
import { ERROR_MESSAGES } from '$lib/constants/constants.js';
import { isPocketbaseError } from '$lib/utils.js';

export const load: PageServerLoad = (async ({ locals }) => {
  if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

  const form = await superValidate(securitySchema);
  return { form };
});

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, securitySchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    if (!locals.user) return setError(form, "oldPassword", ERROR_MESSAGES.GENERIC)

    try {
			await locals.pb.collection('users').update(locals.user.id, form.data)
		} catch (e) {
      if (isPocketbaseError(e) && e?.response?.code === 400) {
        return setError(form, "oldPassword", ERROR_MESSAGES.AUTH.PASSWORD.OLD_INVALID)
      }
      console.log("Error:", e)
      return setError(form, "oldPassword", ERROR_MESSAGES.GENERIC)
    }

    return { form }
  }
};