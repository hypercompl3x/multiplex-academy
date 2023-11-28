import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { registerUserSchema } from '$lib/form/schemas';
import { ERROR_MESSAGES } from '$lib/constants/constants.js';

const { EMAIL, USERNAME } = ERROR_MESSAGES.AUTH

export const load: PageServerLoad = (async () => {
  const form = await superValidate(registerUserSchema);
  return { form };
});

export const actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, registerUserSchema);

    if (!form.valid) return fail(400, { form });

    const { email, username } = form.data
    const { pb } = locals

    const matchingUsernameUsers = await pb.collection('users').getFullList({ filter: `username="${username}"` })
    if (matchingUsernameUsers.length > 0) {
      return setError(form, "username", USERNAME.UNIQUE)
    }

    const matchingEmailUsers = await pb.collection('users').getFullList({ filter: `email="${email}"` })
    if (matchingEmailUsers.length > 0) {
      return setError(form, "email", EMAIL.UNIQUE)
    }

    const data = {
      ...form.data,
      passwordConfirm: form.data.password,
      emailVisibility: true,
      name: ""
    }
  
    try {
      await pb.collection('users').create(data);
      await pb.collection('users').requestVerification(data.email);
    } catch (e) {
      console.log("Error:", e)
      return fail(400, { form })
    }

    return { form };
  }
};