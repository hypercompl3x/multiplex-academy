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

export type PocketbaseUser = {
  avatar: string,
  collectionId: string,      
  collectionName: string,
  created: string,  
  email: string,      
  emailVisibility: boolean,
  id: string,
  updated: string,  
  username: string,
  verified: boolean
}