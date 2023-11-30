import type { PocketbaseError } from '$lib/types'

export function isPocketbaseError(e: unknown): e is PocketbaseError {
  return !!(e as PocketbaseError).url
}

export function clickOutside(element: HTMLDivElement, callbackFunction: () => void) {
  function onClick(e: MouseEvent) {
    if (!element.contains(e?.target as Node)) {
      callbackFunction();
    }
  }
  
  document.body.addEventListener('click', onClick);
  
  return {
    update(newCallbackFunction: () => void) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      document.body.removeEventListener('click', onClick);
    }
  }
}