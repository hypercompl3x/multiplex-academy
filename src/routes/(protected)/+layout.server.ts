import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = (({ locals }) => {
  const { avatar, email, username } = locals.user
  return {
    user: { avatar, email, username }
  };
});