import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { registerUserSchema } from '$lib/form/schemas';
import { ERROR_MESSAGES } from '$lib/constants/constants.js';

const { EMAIL, USERNAME } = ERROR_MESSAGES.AUTH

export const load: PageServerLoad = (async ({locals}) => {
  if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}

  const form = await superValidate(registerUserSchema);
  return { form };
});

export const actions = {
  default: async (event) => {
    const { request, locals } = event
    const form = await superValidate(request, registerUserSchema);

    if (!form.valid) return fail(400, { form });
    
    const { pb } = locals
    const { email, username } = form.data
    const lowercaseEmail = email.toLowerCase()

    const matchingUsernameUsers = await pb.collection('users').getFullList({ filter: `username="${username}"` })
    if (matchingUsernameUsers.length > 0) {
      return setError(form, "username", USERNAME.UNIQUE)
    }

    const matchingEmailUsers = await pb.collection('users').getFullList({ filter: `email="${lowercaseEmail}"` })
    if (matchingEmailUsers.length > 0) {
      return setError(form, "email", EMAIL.UNIQUE)
    }

    const data = {
      ...form.data,
      email: lowercaseEmail,
      passwordConfirm: form.data.password,
      emailVisibility: true,
    }
  
    try {
      await pb.collection('users').create(data);
      await pb.collection('users').requestVerification(data.email);
    } catch (e) {
      console.log("Error:", e)
      return setError(form, "username", ERROR_MESSAGES.GENERIC)
    }

    return { form }
  }
};