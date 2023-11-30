import type { Handle } from '@sveltejs/kit'
import PocketBase from 'pocketbase'
import { VITE_POCKETBASE_API } from '$env/static/private';
import type { PocketbaseUser } from '$lib/types';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.pb = new PocketBase(VITE_POCKETBASE_API)
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')

  try {
    if (event.locals.pb.authStore.isValid) {
      await event.locals.pb.collection("users").authRefresh()
      event.locals.user = event.locals.pb.authStore.model as PocketbaseUser
    }
  } catch (_) {
    event.locals.pb.authStore.clear()
  }

  const response = await resolve(event)

  response.headers.append("set-cookie", event.locals.pb.authStore.exportToCookie({ secure: false }))

  return response
}