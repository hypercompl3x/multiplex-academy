import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types.js';
import { loginUserSchema } from '$lib/form/schemas';

import { ERROR_MESSAGES } from '$lib/constants/constants.js';
import { isPocketbaseError } from '$lib/utils.js';

const { AUTH, GENERIC } = ERROR_MESSAGES

export const load: PageServerLoad = (async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}

  const form = await superValidate(loginUserSchema);
  return { form };
});

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, loginUserSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { email, password } = form.data
    const { pb } = locals

    try {
      await pb.collection('users').authWithPassword(email.toLowerCase(), password)

      if (!pb?.authStore?.model?.verified) {
        pb.authStore.clear()
        return setError(form, "email", AUTH.EMAIL.VERIFY)
      }
    } catch (e) {
      if (isPocketbaseError(e) && e?.response?.code === 400) {
        return setError(form, "email", AUTH.INVALID_CREDENTIALS)
      }
      console.log("Error:", e)
      return setError(form, "email", GENERIC)
    }

    return { form };
  }
};