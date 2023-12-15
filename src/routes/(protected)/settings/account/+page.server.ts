import { fail, redirect } from '@sveltejs/kit';
import { setError, setMessage, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types.js';
import { accountSchema } from '$lib/form/schemas';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '$lib/constants/constants.js';
import { isPocketbaseError } from '$lib/utils.js';

const { EMAIL } = ERROR_MESSAGES.AUTH

export const load: PageServerLoad = (async ({ locals }) => {
  if (!locals.pb.authStore.isValid || !locals.user) {
		throw redirect(303, '/login');
	}

  const form = await superValidate({ email: locals.user.email }, accountSchema);
  return { form };
});

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, accountSchema);

    if (!form.valid) return fail(400, { form })

    if (!locals.user) return setError(form, "email", ERROR_MESSAGES.GENERIC)

    const lowercaseEmail = form.data.email.toLowerCase()

    if (lowercaseEmail === locals.user.email) return { form }

    const matchingEmailUsers = await locals.pb.collection('users').getFullList({ filter: `email="${lowercaseEmail}"` })
    if (matchingEmailUsers.length > 0) {
      return setError(form, "email", EMAIL.UNIQUE)
    }

    try {
			await locals.pb.collection('users').requestEmailChange(lowercaseEmail)
		} catch (e) {
      if (isPocketbaseError(e) && e?.response?.code === 400) {
        return setError(form, "email", ERROR_MESSAGES.AUTH.EMAIL.NOT_FOUND)
      }
      console.log("Error:", e)
      return setError(form, "email", ERROR_MESSAGES.GENERIC)
    }

    return setMessage(form, SUCCESS_MESSAGES.ACCOUNT)
  }
};