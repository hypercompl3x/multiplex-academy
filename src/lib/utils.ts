import type { PocketbaseError } from '$lib/types'

export function isPocketbaseError(e: unknown): e is PocketbaseError {
  return !!(e as PocketbaseError).url
}

export function clickOutside(element: HTMLDivElement, callbackFunction: () => void) {
  function onClick(e: MouseEvent) {
    if (!element.contains(e?.target as Node)) {
      callbackFunction()
    }
  }
  
  document.body.addEventListener('click', onClick)
  
  return {
    update(newCallbackFunction: () => void) {
      callbackFunction = newCallbackFunction
    },
    destroy() {
      document.body.removeEventListener('click', onClick)
    }
  }
}

export function getImageURL(collectionId: string, recordId: string, fileName: string, size = '0x0') {
	return `${import.meta.env.VITE_POCKETBASE_API}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}