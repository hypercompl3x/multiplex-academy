import PocketBase from 'pocketbase'
import type { PocketbaseUser } from '$lib/types';

declare global {
  namespace App {
    interface Locals {
      pb: PocketBase
      user: PocketbaseUser
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
  }
}

export {};
