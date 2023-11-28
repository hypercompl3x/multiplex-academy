import type { AuthModel } from "pocketbase";

export function serializeNonPOJOs<T>(obj: T) {
  return structuredClone(obj)
}