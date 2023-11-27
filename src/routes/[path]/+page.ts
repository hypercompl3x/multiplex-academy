import { goto } from "$app/navigation";
import type { PageLoad } from "./$types";

export const ssr = false;

export function entries() {
  return [{ path: "path" }];
}

export const load = (() => {
  goto("/login", { replaceState: true });
}) satisfies PageLoad;
