import PocketBase from 'pocketbase'

declare global {
  namespace App {
    interface Locals {
      pb: PocketBase
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
  }
}

export {};
