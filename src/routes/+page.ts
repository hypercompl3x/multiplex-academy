import { goto } from "$app/navigation"
import type { PageLoad } from "./$types"

export const ssr = false

export const load = (() => {
  goto("/login", { replaceState: true })
}) satisfies PageLoad