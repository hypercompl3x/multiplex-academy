import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = (({ locals }) => {
  if (!locals.user) redirect(303, '/login');
  const { id, avatar, username, collectionId } = locals.user
  return {
    user: { id, avatar, username, collectionId }
  };
});