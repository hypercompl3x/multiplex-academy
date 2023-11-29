export type PocketbaseError = {
  url: string,
  status: number,
  response: { code: number, message: string, data: unknown },
  isAbort: boolean,
  originalError: {
    url: string,
    status: number,
    data: { code: number, message: string, data: unknown }
  }
}
