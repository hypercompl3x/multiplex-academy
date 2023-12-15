import { fail, redirect } from '@sveltejs/kit';
import { setError, setMessage, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types.js';
import { profileSchema } from '$lib/form/schemas';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '$lib/constants/constants.js';

const { AVATAR } = ERROR_MESSAGES.PROFILE

export const load: PageServerLoad = (async ({ locals }) => {
  if (!locals.pb.authStore.isValid || !locals.user) {
		throw redirect(303, '/login');
	}

  const form = await superValidate({ username: locals.user.username, fileExists: locals.user.avatar ? "yes" : "no" }, profileSchema);
  return { form };
});

export const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData()
    const form = await superValidate(formData, profileSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { username, fileExists } = form.data
    const avatar = formData.get('avatar') as File

    const newData = fileExists === "yes" && avatar.size === 0 ? { username } : { username, avatar: fileExists === "yes" ? avatar : null }

    if (avatar.size > 0) {
      if (!(avatar instanceof File)) {
        return setError(form, 'username', AVATAR.FILE)
      }
  
      if (avatar.size > 5000000) {
        return setError(form, 'username', AVATAR.SIZE)
      }
  
      if (avatar.type !== 'image/jpeg' && avatar.type !== 'image/png' && avatar.type !== 'image/jpg') {
        return setError(form, 'username', AVATAR.FORMAT)
      }
    }

    if (!locals.user) return setError(form, "username", ERROR_MESSAGES.GENERIC)

    try {
      const data = await locals.pb
        .collection('users')
        .update(locals.user.id, newData);
      locals.user.avatar = data.avatar
      locals.user.username = data.username
    } catch (e) {
      console.log("Error:", e)
      return setError(form, "username", ERROR_MESSAGES.GENERIC)
    }

    return setMessage(form, SUCCESS_MESSAGES.PROFILE)
  }
};