import { redirect } from '@sveltejs/kit'

export const POST = ({ locals }) => {
  locals.pb.authStore.clear()

  redirect(303, '/login')
}