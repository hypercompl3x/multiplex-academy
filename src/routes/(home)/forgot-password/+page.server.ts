import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { forgotPasswordSchema } from '$lib/form/schemas';
import type { PageServerLoad } from './$types.js';
import { ERROR_MESSAGES } from '$lib/constants/constants.js';

const { AUTH, GENERIC } = ERROR_MESSAGES

export const load: PageServerLoad = (async ({ locals }) => {
  if (locals.pb.authStore.isValid) {
		redirect(303, '/');
	}

  const form = await superValidate(forgotPasswordSchema);
  return { form };
});

export const actions = {
  default: async (event) => {
    const { request, locals } = event
    const form = await superValidate(request, forgotPasswordSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const lowercaseEmail = form.data.email
    const { pb } = locals

    const matchingEmailUsers = await pb.collection('users').getFullList({ filter: `email="${lowercaseEmail}"` })
    if (matchingEmailUsers.length === 0) {
      return setError(form, "email", AUTH.EMAIL.NOT_FOUND)
    }

    try {
      await pb.collection("users").requestPasswordReset(lowercaseEmail)
    } catch (e) { 
      console.log("Error:", e)
      return setError(form, "email", GENERIC)
    }

    return { form }
  }
};