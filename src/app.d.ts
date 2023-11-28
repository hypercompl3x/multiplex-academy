import PocketBase from 'pocketbase'

declare global {
  namespace App {
    interface Locals {
      pb: PocketBase
      user: any
    }
    // interface Error {}
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
