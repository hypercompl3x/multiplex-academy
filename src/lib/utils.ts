import type { PocketbaseError } from '$lib/types'

export function isPocketbaseError(e: unknown): e is PocketbaseError {
  return !!(e as PocketbaseError).url
}