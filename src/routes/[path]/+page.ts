import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export function entries() {
  return [{ path: "path" }];
}

export const load = (() => {
  redirect(303, '/login')
}) satisfies PageLoad;
